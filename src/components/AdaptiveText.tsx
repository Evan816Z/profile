import { useAdaptiveColor } from "@/components/BackgroundBrightnessProvider";
import type { ElementType, ReactNode } from "react";

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
  const { ref, style } = useAdaptiveColor();

  return (
    <Component
      ref={ref as React.RefObject<HTMLElement>}
      className={`transition-colors duration-200 ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
}
