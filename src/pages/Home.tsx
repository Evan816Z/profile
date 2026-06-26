import NebulaBackground from "@/components/NebulaBackground";
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
      <NebulaBackground />

      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Link
            to="/admin"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(20,15,40,0.6)] backdrop-blur-xl border border-[rgba(255,143,187,0.15)] text-xs text-[rgba(252,220,236,0.7)] hover:border-[rgba(255,143,187,0.3)] transition-colors"
          >
            <Settings size={13} />
            管理
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
        <p className="text-xs text-[rgba(252,220,236,0.3)]">
          © {new Date().getFullYear()} Evan816Z · Crafted with
          <span className="text-[#FF8FB8] mx-1">♥</span>
        </p>
      </footer>
    </div>
  );
}
