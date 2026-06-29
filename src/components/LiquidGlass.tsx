import { useEffect, useRef, useId, type ReactNode } from "react";

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
}

let globalId = 0;

export default function LiquidGlass({
  children,
  className = "",
  intensity = "medium",
}: LiquidGlassProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const filterId = useId().replace(/:/g, "");
  const uniqueFilterId = `liquid-glass-${filterId}-${++globalId}`;

  const blur = intensity === "light" ? 12 : intensity === "heavy" ? 28 : 20;
  const saturation = intensity === "light" ? 1.4 : intensity === "heavy" ? 2.2 : 1.8;

  useEffect(() => {
    // 强制重绘以确保滤镜 ID 在 DOM 中注册
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    wrapper.style.opacity = "0.99";
    requestAnimationFrame(() => {
      wrapper.style.opacity = "";
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`liquid-glass ${className}`}
      style={{
        ["--lg-blur" as string]: `blur(${blur}px) saturate(${saturation})`,
        ["--lg-filter" as string]: `url(#${uniqueFilterId})`,
      }}
    >
      <svg
        className="liquid-glass-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        aria-hidden="true"
      >
        <defs>
          <filter id={uniqueFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="2"
              seed="42"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="1.5" result="smoothNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="smoothNoise"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
}
