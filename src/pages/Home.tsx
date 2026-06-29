import LiquidGlass from "@/components/LiquidGlass";
import AdaptiveText from "@/components/AdaptiveText";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* 背景图片：放大填充 */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url(https://t.alcy.cc/moez)",
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
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Link to="/admin">
            <LiquidGlass className="gap-2 px-3 py-1.5 text-xs text-[rgba(252,220,236,0.9)] hover:text-[#FFE6F2]">
              <Settings size={13} />
              管理
            </LiquidGlass>
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* 底部装饰 */}
      <footer className="relative z-10 py-8 text-center">
        <AdaptiveText className="text-xs">
          © {new Date().getFullYear()} Evan816Z · Crafted with
          <span className="text-[#FF8FB8] mx-1">♥</span>
        </AdaptiveText>
      </footer>
    </div>
  );
}
