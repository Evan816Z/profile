import { useEffect } from "react";
import LiquidGlass from "@/components/LiquidGlass";
import AdaptiveText from "@/components/AdaptiveText";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import { useStore } from "@/store/useStore";
import type { PersonalData } from "@/types/personal";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface HomeProps {
  previewData?: PersonalData;
}

export default function Home({ previewData }: HomeProps) {
  const { data: storeData } = useStore();
  const data = previewData || storeData;
  const { settings } = data;

  useEffect(() => {
    if (settings.siteTitle) {
      document.title = settings.siteTitle;
    }
    document.documentElement.style.setProperty("--theme-color", settings.themeColor);
    document.documentElement.style.setProperty("--gradient-start", settings.gradientStart);
    document.documentElement.style.setProperty("--gradient-mid", settings.gradientMid);
    document.documentElement.style.setProperty("--gradient-end", settings.gradientEnd);
  }, [settings.siteTitle, settings.themeColor, settings.gradientStart, settings.gradientMid, settings.gradientEnd]);

  return (
    <div
      className="relative min-h-screen"
      style={{ "--theme-color": settings.themeColor } as React.CSSProperties}
    >
      {/* 背景图片：放大填充 */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${settings.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
      {/* 背景加载失败时的兜底：深色渐变 */}
      <div
        className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#0E0A1C] via-[#15102A] to-[#0E0A1C]"
        aria-hidden="true"
      />

      {/* 顶部导航 */}
      {settings.showAdminButton && (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
          <div className="mx-auto flex items-center justify-between" style={{ maxWidth: "calc(36rem * var(--viewport-scale))" }}>
            <Link to="/admin">
              <LiquidGlass
              className="text-[#333] hover:text-[#111]"
              style={{ padding: "2px 6px", fontSize: "9px", gap: "3px" }}
            >
              <Settings size={9} />
              管理
            </LiquidGlass>
            </Link>
          </div>
        </header>
      )}

      <main className="relative z-10 pt-20">
        <AboutSection previewData={previewData} />
        <SkillsSection previewData={previewData} />
        <ProjectsSection previewData={previewData} />
        <ContactSection previewData={previewData} />
      </main>

      {/* 底部装饰 */}
      <footer className="relative z-10 py-8 text-center">
        <AdaptiveText className="text-xs">
          © {new Date().getFullYear()} {data.hero.name} · {settings.footerText}
          <span className="mx-1" style={{ color: "var(--theme-color)" }}>♥</span>
        </AdaptiveText>
      </footer>
    </div>
  );
}
