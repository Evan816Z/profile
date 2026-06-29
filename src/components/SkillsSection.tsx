import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import GlassCard from "@/components/GlassCard";
import AdaptiveText from "@/components/AdaptiveText";
import { useStore } from "@/store/useStore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconMap = Record<string, React.ComponentType<any>>;

function DynamicIcon({ name, ...props }: { name: string } & React.SVGProps<SVGSVGElement>) {
  const IconComponent = (Icons as unknown as IconMap)[name];
  if (!IconComponent) return <Icons.Code2 {...props} />;
  return <IconComponent {...props} />;
}

export default function SkillsSection() {
  const { data } = useStore();
  const categories = Array.from(new Set(data.skills.map((s) => s.category)));

  return (
    <SectionWrapper id="skills">
      <GlassCard className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
            <Sparkles size={18} className="text-[#555]" />
          </div>
          <div>
            <AdaptiveText as="h2" className="font-display text-xl font-semibold">
              技能栈
            </AdaptiveText>
            <AdaptiveText className="text-xs text-[rgba(252,220,236,0.4)]">
              Skills
            </AdaptiveText>
          </div>
        </div>

        <div className="space-y-5">
          {categories.map((category) => (
            <div key={category}>
              <AdaptiveText className="text-xs uppercase tracking-widest text-[rgba(252,220,236,0.4)] mb-3 font-display">
                {category}
              </AdaptiveText>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {data.skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,143,187,0.25)] hover:bg-[rgba(255,143,187,0.06)] transition-all cursor-default"
                    >
                      <DynamicIcon
                        name={skill.icon}
                        className="w-5 h-5 text-[rgba(252,220,236,0.55)] group-hover:text-[#FFB3D1]"
                      />
                      <AdaptiveText className="text-[11px] text-center font-medium">
                        {skill.name}
                      </AdaptiveText>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </SectionWrapper>
  );
}
