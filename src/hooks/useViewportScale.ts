import { useEffect } from "react";
import { isMobileDevice } from "@/lib/perf";

const BASE_WIDTH = 420;
const MIN_SCALE = 0.82;
const MAX_SCALE = 1.18;

function computeScale(width: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, width / BASE_WIDTH));
}

export function useViewportScale() {
  useEffect(() => {
    if (typeof window === "undefined" || !document.documentElement) return;

    const isMobile = isMobileDevice();
    const setScale = () => {
      const width = window.innerWidth;
      const scale = computeScale(width);
      const root = document.documentElement;
      root.style.setProperty("--viewport-scale", scale.toFixed(4));
      root.style.setProperty("--viewport-width", `${width}px`);
    };

    setScale();
    let raf = 0;
    let timeout = 0;
    const onResize = () => {
      if (raf) cancelAnimationFrame(raf);
      if (timeout) window.clearTimeout(timeout);
      if (isMobile) {
        /* 移动端 orientationchange/resize 通常连续触发，防抖避免重排抖动 */
        timeout = window.setTimeout(() => {
          timeout = 0;
          setScale();
        }, 150);
      } else {
        raf = requestAnimationFrame(setScale);
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (raf) cancelAnimationFrame(raf);
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);
}

export default useViewportScale;
