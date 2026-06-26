import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TypeWriter from "@/components/TypeWriter";
import ParticleBackground from "@/components/ParticleBackground";
import { useStore } from "@/store/useStore";

export default function HeroSection() {
  const { data } = useStore();

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* 渐变装饰 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-6">
        {/* 头像 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-2 ring-accent/30 ring-offset-4 ring-offset-bg animate-glow-pulse">
            <img
              src={data.hero.avatar}
              alt={data.hero.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* 姓名 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-6xl md:text-8xl font-bold mb-6 text-gradient"
        >
          {data.hero.name}
        </motion.h1>

        {/* 打字机标语 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-xl md:text-2xl text-fg-dim font-display font-light tracking-wide"
        >
          <TypeWriter texts={data.hero.taglines} />
        </motion.div>

        {/* 向下箭头 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="block text-muted hover:text-accent transition-colors">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown size={32} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
