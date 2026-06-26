import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { useStore } from "@/store/useStore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconMap = Record<string, React.ComponentType<any>>;

// 动态获取 lucide 图标
function DynamicIcon({ name, ...props }: { name: string } & React.SVGProps<SVGSVGElement>) {
  const IconComponent = (Icons as unknown as IconMap)[name];
  if (!IconComponent) return <Icons.Code2 {...props} />;
  return <IconComponent {...props} />;
}

export default function SkillsSection() {
  const { data } = useStore();

  // 按分类分组
  const categories = Array.from(new Set(data.skills.map((s) => s.category)));

  return (
    <SectionWrapper id="skills" className="bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent">
      <div className="flex items-center gap-3 mb-12">
        <Sparkles size={28} className="text-accent" />
        <h2 className="font-display text-4xl font-bold text-fg">技能</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
      </div>

      <div className="space-y-10">
        {categories.map((category, catIdx) => (
          <div key={category}>
            <h3 className="text-sm uppercase tracking-widest text-muted mb-4 font-display">
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {data.skills
                .filter((s) => s.category === category)
                .map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.1 + idx * 0.05, duration: 0.4 }}
                    className="glass glass-hover rounded-xl p-4 flex flex-col items-center gap-2 cursor-default transition-all duration-300 group"
                  >
                    <DynamicIcon
                      name={skill.icon}
                      className="w-6 h-6 text-muted group-hover:text-accent transition-colors"
                    />
                    <span className="text-sm text-fg-dim group-hover:text-fg transition-colors font-medium">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
