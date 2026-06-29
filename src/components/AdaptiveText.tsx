import { useAdaptiveColor } from "@/components/BackgroundBrightnessProvider";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { useEffect } from "react";

interface AdaptiveTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export default function AdaptiveText({
  children,
  as: Component = "span",
  className = "",
  style,
}: AdaptiveTextProps) {
  const { ref, isLight } = useAdaptiveColor();

  useEffect(() => {
    if (ref.current && isLight !== null) {
      ref.current.style.color = isLight ? "#000" : "#fff";
    }
  }, [isLight, ref]);

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
