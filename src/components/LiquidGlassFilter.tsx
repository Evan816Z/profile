import { useEffect, useRef, useCallback } from "react";

/**
 * LiquidGlassFilter — Runtime physics-based SVG filter generator
 * Ported from https://github.com/archisvaze/liquid-glass
 *
 * Generates an SVG filter with:
 *  - Edge refraction via Snell's law displacement map
 *  - Specular highlights at glass bezel
 *  - Gaussian blur of source
 *
 * The filter is injected into a hidden <svg> element and referenced
 * by `.liquid-glass::after` and `.glass-card::after` via
 * `backdrop-filter: url(#liquid-glass-filter)`.
 */

/* ─── Surface profile functions ─── */
const SURFACE_FNS = {
  convex_squircle: (x: number) => Math.pow(1 - Math.pow(1 - x, 4), 0.25),
};

/* ─── Snell's law refraction profile ─── */
function calculateRefractionProfile(
  glassThickness: number,
  bezelWidth: number,
  heightFn: (x: number) => number,
  ior: number,
  samples = 128
): Float64Array {
  const eta = 1 / ior;
  function refract(nx: number, ny: number): [number, number] | null {
    const dot = ny;
    const k = 1 - eta * eta * (1 - dot * dot);
    if (k < 0) return null;
    const sq = Math.sqrt(k);
    return [-(eta * dot + sq) * nx, eta - (eta * dot + sq) * ny];
  }
  const profile = new Float64Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = i / samples;
    const y = heightFn(x);
    const dx = x < 1 ? 0.0001 : -0.0001;
    const y2 = heightFn(x + dx);
    const deriv = (y2 - y) / dx;
    const mag = Math.sqrt(deriv * deriv + 1);
    const ref = refract(-deriv / mag, -1 / mag);
    if (!ref) {
      profile[i] = 0;
      continue;
    }
    profile[i] = ref[0] * ((y * bezelWidth + glassThickness) / ref[1]);
  }
  return profile;
}

/* ─── Displacement map (edge refraction) ─── */
function generateDisplacementMap(
  w: number,
  h: number,
  radius: number,
  bezelWidth: number,
  profile: Float64Array,
  maxDisp: number
): string {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  const d = img.data;

  // Fill with neutral (128,128) = no displacement
  for (let i = 0; i < d.length; i += 4) {
    d[i] = 128;
    d[i + 1] = 128;
    d[i + 2] = 0;
    d[i + 3] = 255;
  }

  const r = radius;
  const rSq = r * r;
  const r1Sq = (r + 1) ** 2;
  const rBSq = Math.max(r - bezelWidth, 0) ** 2;
  const wB = w - r * 2;
  const hB = h - r * 2;
  const S = profile.length;

  for (let y1 = 0; y1 < h; y1++) {
    for (let x1 = 0; x1 < w; x1++) {
      const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
      const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
      const dSq = x * x + y * y;
      if (dSq > r1Sq || dSq < rBSq) continue;
      const dist = Math.sqrt(dSq);
      const fromSide = r - dist;
      const op =
        dSq < rSq
          ? 1
          : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
      if (op <= 0 || dist === 0) continue;
      const cos = x / dist;
      const sin = y / dist;
      const bi = Math.min(((fromSide / bezelWidth) * S) | 0, S - 1);
      const disp = profile[bi] || 0;
      const dX = (-cos * disp) / maxDisp;
      const dY = (-sin * disp) / maxDisp;
      const idx = (y1 * w + x1) * 4;
      d[idx] = (128 + dX * 127 * op + 0.5) | 0;
      d[idx + 1] = (128 + dY * 127 * op + 0.5) | 0;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

/* ─── Specular highlight map ─── */
function generateSpecularMap(
  w: number,
  h: number,
  radius: number,
  bezelWidth: number,
  angle = Math.PI / 3
): string {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  const d = img.data;
  d.fill(0);

  const r = radius;
  const rSq = r * r;
  const r1Sq = (r + 1) ** 2;
  const rBSq = Math.max(r - bezelWidth, 0) ** 2;
  const wB = w - r * 2;
  const hB = h - r * 2;
  const sv = [Math.cos(angle), Math.sin(angle)];

  for (let y1 = 0; y1 < h; y1++) {
    for (let x1 = 0; x1 < w; x1++) {
      const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
      const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
      const dSq = x * x + y * y;
      if (dSq > r1Sq || dSq < rBSq) continue;
      const dist = Math.sqrt(dSq);
      const fromSide = r - dist;
      const op =
        dSq < rSq
          ? 1
          : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
      if (op <= 0 || dist === 0) continue;
      const cos = x / dist;
      const sin = -y / dist;
      const dot = Math.abs(cos * sv[0] + sin * sv[1]);
      const edge = Math.sqrt(Math.max(0, 1 - (1 - fromSide) ** 2));
      const coeff = dot * edge;
      const col = (255 * coeff) | 0;
      const alpha = (col * coeff * op) | 0;
      const idx = (y1 * w + x1) * 4;
      d[idx] = col;
      d[idx + 1] = col;
      d[idx + 2] = col;
      d[idx + 3] = alpha;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

/* ─── Default parameters (matching archisvaze/liquid-glass defaults) ─── */
export interface LiquidGlassParams {
  width: number;
  height: number;
  borderRadius: number;
  glassThickness: number;
  bezelWidth: number;
  refractiveIndex: number;
  scaleRatio: number;
  blurAmount: number;
  specularOpacity: number;
  specularSaturation: number;
}

export const DEFAULT_PARAMS: LiquidGlassParams = {
  width: 400,
  height: 280,
  borderRadius: 60,
  glassThickness: 80,
  bezelWidth: 60,
  refractiveIndex: 3.0,
  scaleRatio: 1.0,
  blurAmount: 0.3,
  specularOpacity: 0.5,
  specularSaturation: 4,
};

/* ─── Build SVG filter string ─── */
function buildFilter(
  params: LiquidGlassParams,
  profile: Float64Array,
  maxDisp: number,
  dispUrl: string,
  specUrl: string
): string {
  const { blurAmount, scaleRatio, specularSaturation, specularOpacity, width: w, height: h } = params;
  const scale = maxDisp * scaleRatio;

  return `<filter id="liquid-glass-filter" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceGraphic" stdDeviation="${blurAmount}" result="blurred_source" />
  <feImage href="${dispUrl}" x="0" y="0" width="${w}" height="${h}" result="disp_map" />
  <feDisplacementMap in="blurred_source" in2="disp_map" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="displaced" />
  <feColorMatrix in="displaced" type="saturate" values="${specularSaturation}" result="displaced_sat" />
  <feImage href="${specUrl}" x="0" y="0" width="${w}" height="${h}" result="spec_layer" />
  <feComposite in="displaced_sat" in2="spec_layer" operator="in" result="spec_masked" />
  <feComponentTransfer in="spec_layer" result="spec_faded">
    <feFuncA type="linear" slope="${specularOpacity}" />
  </feComponentTransfer>
  <feBlend in="spec_masked" in2="displaced" mode="normal" result="with_sat" />
  <feBlend in="spec_faded" in2="with_sat" mode="normal" />
</filter>`;
}

/* ─── Full rebuild pipeline ─── */
export function rebuildFilter(params: LiquidGlassParams): string {
  const heightFn = SURFACE_FNS.convex_squircle;
  const clampedBezel = Math.min(
    params.bezelWidth,
    params.borderRadius - 1,
    Math.min(params.width, params.height) / 2 - 1
  );

  const profile = calculateRefractionProfile(
    params.glassThickness,
    clampedBezel,
    heightFn,
    params.refractiveIndex,
    128
  );
  const maxDisp = Math.max(...Array.from(profile).map(Math.abs)) || 1;
  const dispUrl = generateDisplacementMap(
    params.width,
    params.height,
    params.borderRadius,
    clampedBezel,
    profile,
    maxDisp
  );
  const specUrl = generateSpecularMap(
    params.width,
    params.height,
    params.borderRadius,
    clampedBezel * 2.5
  );
  return buildFilter(params, profile, maxDisp, dispUrl, specUrl);
}

/* ─── React Component ─── */
interface LiquidGlassFilterProps {
  params?: Partial<LiquidGlassParams>;
}

export default function LiquidGlassFilter({ params: userParams }: LiquidGlassFilterProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const params = { ...DEFAULT_PARAMS, ...userParams };

  const doRebuild = useCallback(() => {
    if (!svgRef.current) return;
    const defs = svgRef.current.querySelector("#svg-defs");
    if (!defs) return;
    const filterStr = rebuildFilter(params);
    defs.innerHTML = filterStr;
  }, [params]);

  useEffect(() => {
    // Build on mount
    const raf = requestAnimationFrame(() => requestAnimationFrame(doRebuild));
    // Rebuild on resize (debounced)
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(doRebuild, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [doRebuild]);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      style={{ position: "absolute", overflow: "hidden" }}
      colorInterpolationFilters="sRGB"
    >
      <defs id="svg-defs" />
    </svg>
  );
}
