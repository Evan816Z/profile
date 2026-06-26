import { motion } from "framer-motion";
import { MapPin, User } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { useStore } from "@/store/useStore";

export default function AboutSection() {
  const { data } = useStore();

  return (
    <SectionWrapper id="about">
      <div className="glass-card glass-shimmer p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
            <User size={18} className="text-[#FFB3D1]" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-[#FFE6F2]">关于我</h2>
            <p className="text-xs text-[rgba(252,220,236,0.4)]">About Me</p>
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-[15px] leading-relaxed text-[rgba(252,220,236,0.75)]">
            {data.about.bio}
          </p>

          <div className="flex items-center gap-2 text-sm text-[rgba(252,220,236,0.55)]">
            <MapPin size={15} className="text-[#FF8FB8]" />
            {data.about.location}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#contact" className="cta-primary">
              联系我
            </a>
            <a href="#projects" className="cta-ghost">
              查看项目
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
