import { type ReactNode } from "react";

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  mode?: "pure" | "compatible";
}

/**
 * LiquidGlass — 边缘色散高光 + 中心完全透明
 *
 * 实现方式：
 * - 容器本身无背景色，完全透出下方画布
 * - ::before 用 radial-gradient mask 只渲染边缘环带（约8px宽）
 * - ::after 用 SVG filter 生成红/蓝偏移的色散层，同样只在边缘可见
 * - 正文区域无任何位移扭曲
 */
export default function LiquidGlass({ children, className = "", mode = "pure" }: LiquidGlassProps) {
  const isPure = mode === "pure";

  return (
    <div
      className={`liquid-glass ${className}`}
      data-mode={isPure ? "pure" : "compatible"}
    >
      {children}
    </div>
  );
}
