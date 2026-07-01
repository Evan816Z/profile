import { useEffect } from "react";

const BASE_WIDTH = 420;
const MIN_SCALE = 0.82;
const MAX_SCALE = 1.18;

function computeScale(width: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, width / BASE_WIDTH));
}

export function useViewportScale() {
  useEffect(() => {
    if (typeof window === "undefined" || !document.documentElement) return;

    const setScale = () => {
      const width = window.innerWidth;
      const scale = computeScale(width);
      const root = document.documentElement;
      root.style.setProperty("--viewport-scale", scale.toFixed(4));
      root.style.setProperty("--viewport-width", `${width}px`);
    };

    setScale();
    let raf = 0;
    const onResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(setScale);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", setScale);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", setScale);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

export default useViewportScale;
