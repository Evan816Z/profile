import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useStore } from "@/store/useStore";

interface RegisteredElement {
  el: HTMLElement;
  onChange: (isLight: boolean | null) => void;
}

interface ContextValue {
  register: (el: HTMLElement, onChange: (isLight: boolean | null) => void) => () => void;
}

const BackgroundBrightnessContext = createContext<ContextValue | null>(null);

export function BackgroundBrightnessProvider({ children }: { children: ReactNode }) {
  const { data } = useStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const readyRef = useRef(false);
  const elementsRef = useRef<RegisteredElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const maxDim = 256;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        /* 测试是否可以读取像素（CORS 会阻止） */
        ctx.getImageData(0, 0, 1, 1);
        canvasRef.current = canvas;
        ctxRef.current = ctx;
        readyRef.current = true;
        setReady(true);
        updateAll();
      } catch {
        /* CORS 受限或 canvas 污染，降级为默认白色文字 */
        readyRef.current = false;
        setReady(true);
      }
    };
    img.onerror = () => {
      readyRef.current = false;
      setReady(true);
    };
    img.src = data.settings.backgroundImage;
  }, [data.settings.backgroundImage]);

  const isLightAt = useCallback((x: number, y: number): boolean | null => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || !readyRef.current) return null;

    try {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const imgRatio = canvas.width / canvas.height;
      const vpRatio = vw / vh;

      let dx = 0;
      let dy = 0;
      let dw = vw;
      let dh = vh;

      if (imgRatio > vpRatio) {
        dh = vh;
        dw = dh * imgRatio;
        dx = (vw - dw) / 2;
      } else {
        dw = vw;
        dh = dw / imgRatio;
        dy = (vh - dh) / 2;
      }

      const u = (x - dx) / dw;
      const v = (y - dy) / dh;
      const ix = Math.round(u * canvas.width);
      const iy = Math.round(v * canvas.height);

      if (ix < 0 || ix >= canvas.width || iy < 0 || iy >= canvas.height) return null;

      const data = ctx.getImageData(ix, iy, 1, 1).data;
      const luminance = 0.299 * data[0] + 0.587 * data[1] + 0.114 * data[2];
      return luminance > 128;
    } catch {
      return null;
    }
  }, []);

  const updateAll = useCallback(() => {
    pendingRef.current = false;
    elementsRef.current.forEach(({ el, onChange }) => {
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      onChange(isLightAt(x, y));
    });
  }, [isLightAt]);

  const scheduleUpdate = useCallback(() => {
    if (pendingRef.current) return;
    pendingRef.current = true;
    rafRef.current = requestAnimationFrame(updateAll);
  }, [updateAll]);

  const register = useCallback(
    (el: HTMLElement, onChange: (isLight: boolean | null) => void) => {
      elementsRef.current.push({ el, onChange });
      if (readyRef.current) {
        const rect = el.getBoundingClientRect();
        onChange(isLightAt(rect.left + rect.width / 2, rect.top + rect.height / 2));
      }
      return () => {
        elementsRef.current = elementsRef.current.filter((item) => item.el !== el);
      };
    },
    [isLightAt]
  );

  useEffect(() => {
    if (!ready) return;
    const onScroll = () => scheduleUpdate();
    const onResize = () => scheduleUpdate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, scheduleUpdate]);

  return (
    <BackgroundBrightnessContext.Provider value={{ register }}>
      {children}
    </BackgroundBrightnessContext.Provider>
  );
}

export function useAdaptiveColor() {
  const context = useContext(BackgroundBrightnessContext);
  const [isLight, setIsLight] = useState<boolean | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!context || !ref.current) return;
    return context.register(ref.current, setIsLight);
  }, [context]);

  return {
    ref,
    isLight,
    style: { color: isLight === null ? undefined : isLight ? "#000" : "#fff" },
  };
}
