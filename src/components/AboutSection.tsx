import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
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
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-br from-[var(--theme-color)] via-[#A58CFF] to-[#5B8FE3] mb-4">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0E0A1C] p-[2px]">
              <img
                src={data.hero.avatar}
                alt={data.hero.name}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
          <div className="text-center">
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
