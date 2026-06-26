import { motion } from "framer-motion";
import { MapPin, User } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { useStore } from "@/store/useStore";

export default function AboutSection() {
  const { data } = useStore();

  return (
    <SectionWrapper id="about">
      <div className="flex items-center gap-3 mb-12">
        <User size={28} className="text-accent" />
        <h2 className="font-display text-4xl font-bold text-fg">关于我</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
      </div>

      <div className="grid md:grid-cols-3 gap-12 items-center">
        {/* 头像 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative group">
            <div className="w-56 h-56 rounded-2xl overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <img
                src={data.hero.avatar}
                alt={data.hero.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-2 rounded-2xl border border-accent/20 -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
          </div>
        </motion.div>

        {/* 简介 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:col-span-2 space-y-6"
        >
          <p className="text-lg text-fg-dim leading-relaxed">
            {data.about.bio}
          </p>

          <div className="flex items-center gap-2 text-muted">
            <MapPin size={18} className="text-accent" />
            <span>{data.about.location}</span>
          </div>

          <div className="flex gap-4">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full glass glass-hover text-accent font-display font-medium transition-all duration-300"
            >
              联系我
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-full border border-fg/10 text-fg-dim hover:border-accent/30 hover:text-accent font-display font-medium transition-all duration-300"
            >
              查看项目
            </a>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
