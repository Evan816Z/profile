import { useAdaptiveColor } from "@/components/BackgroundBrightnessProvider";
import type { ElementType, ReactNode } from "react";
import { useEffect } from "react";

interface AdaptiveTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

export default function AdaptiveText({
  children,
  as: Component = "span",
  className = "",
}: AdaptiveTextProps) {
  const { ref, isLight } = useAdaptiveColor();

  // 用 useEffect 直接设置 style.color，确保覆盖 Tailwind 类
  useEffect(() => {
    if (ref.current && isLight !== null) {
      ref.current.style.color = isLight ? "#000" : "#fff";
    }
  }, [isLight, ref]);

  return (
    <Component
      ref={ref as React.RefObject<HTMLElement>}
      className={`transition-colors duration-200 ${className}`}
    >
      {children}
    </Component>
  );
}
