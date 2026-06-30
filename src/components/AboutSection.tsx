import { motion } from "framer-motion";
import { MapPin, User } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import GlassCard from "@/components/GlassCard";
import AdaptiveText from "@/components/AdaptiveText";
import { useStore } from "@/store/useStore";
import type { PersonalData } from "@/types/personal";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function AboutSection({ previewData }: { previewData?: PersonalData }) {
  const { data: storeData } = useStore();
  const data = previewData || storeData;

  return (
    <SectionWrapper id="about">
      <GlassCard className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
            <User size={18} className="text-[#333]" />
          </div>
          <div>
            <AdaptiveText as="h2" className="font-display text-xl font-semibold">
              关于我
            </AdaptiveText>
            <AdaptiveText className="text-xs text-[rgba(252,220,236,0.4)]">
              About Me
            </AdaptiveText>
          </div>
        </div>

        <div className="space-y-5">
          <AdaptiveText className="text-[15px] leading-relaxed">
            {data.about.bio}
          </AdaptiveText>

          <AdaptiveText className="flex items-center gap-2 text-sm">
            <MapPin size={15} className="text-[#333]" />
            {data.about.location}
          </AdaptiveText>

          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={() => scrollTo("contact")} className="cta-primary">
              <AdaptiveText>联系我</AdaptiveText>
            </button>
            <button onClick={() => scrollTo("projects")} className="cta-ghost">
              <AdaptiveText>查看项目</AdaptiveText>
            </button>
          </div>
        </div>
      </GlassCard>
    </SectionWrapper>
  );
}
