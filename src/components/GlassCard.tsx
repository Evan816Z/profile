import { useEffect, useRef, useId, type ReactNode, useState } from "react";
import {
  registerLiquidGlassFilter,
  unregisterLiquidGlassFilter,
} from "@/components/LiquidGlassFilter";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * GlassCard — 液态玻璃卡片
 * 每张卡片在运行时生成专属 SVG filter，尺寸/圆角与卡片完全匹配。
 * 使用 ResizeObserver 监听元素尺寸变化，随窗口宽度比例实时对齐边框。
 */
export default function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const baseId = useId().replace(/:/g, "");
  const [filterId, setFilterId] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const id = `gc-${baseId}`;

    const updateFilter = () => {
      const rect = el.getBoundingClientRect();
      const computed = getComputedStyle(el);
      const br = parseFloat(computed.borderRadius) || 24;
      registerLiquidGlassFilter(id, {
        width: Math.max(2, Math.round(rect.width)),
        height: Math.max(2, Math.round(rect.height)),
        borderRadius: Math.max(1, Math.round(br)),
      });
      setFilterId(id);
    };

    updateFilter();

    let timer: ReturnType<typeof setTimeout>;
    const scheduleUpdate = () => {
      clearTimeout(timer);
      timer = setTimeout(updateFilter, 150);
    };

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(scheduleUpdate);
      ro.observe(el);
    } else {
      window.addEventListener("resize", scheduleUpdate);
    }

    return () => {
      clearTimeout(timer);
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener("resize", scheduleUpdate);
      }
      unregisterLiquidGlassFilter(id);
    };
  }, [baseId]);

  const style: React.CSSProperties = {
    ["--lg-filter" as string]: filterId ? `url(#${filterId})` : "none",
  };

  return (
    <div
      ref={ref}
      className={`glass-card ${hover ? "glass-card-hover" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
