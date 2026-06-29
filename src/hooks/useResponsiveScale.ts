import { useEffect, useState } from "react";

/**
 * 根据浏览器窗口宽度实时计算缩放因子。
 * 基准：1440px = 1.0
 * 范围：0.6 ~ 1.2
 */
export function useResponsiveScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const BASE = 1440;
    const MIN = 0.6;
    const MAX = 1.2;

    const update = () => {
      const w = window.innerWidth;
      const s = Math.min(MAX, Math.max(MIN, w / BASE));
      setScale(s);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}
