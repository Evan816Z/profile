import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import TypeWriter from "@/components/TypeWriter";
import LiquidGlass from "@/components/LiquidGlass";
import AdaptiveText from "@/components/AdaptiveText";
import { useStore } from "@/store/useStore";

export default function HeroSection() {
  const { data } = useStore();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-8 pb-12">
      <div className="w-full max-w-xl mx-auto text-center">
        {/* 顶部标签 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <LiquidGlass className="gap-2 px-3 py-1.5 text-[11px] font-medium">
            <Sparkles size={12} className="text-[#FFB3D1]" />
            <AdaptiveText>个人主页</AdaptiveText>
          </LiquidGlass>
          <LiquidGlass className="gap-2 px-3 py-1.5 text-[11px] font-medium">
            <span className="live-dot" />
            <AdaptiveText>在线</AdaptiveText>
          </LiquidGlass>
        </motion.div>

        {/* 头像 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-6"
        >
          <div className="w-28 h-28 mx-auto rounded-full p-1 bg-gradient-to-br from-[#FFB3D1] via-[#A58CFF] to-[#5B8FE3]">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0E0A1C] p-1">
              <img
                src={data.hero.avatar}
                alt={data.hero.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* 姓名 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4"
        >
          <AdaptiveText
            as="h1"
            className="font-display text-5xl md:text-6xl font-bold tracking-tight"
          >
            {data.hero.name}
          </AdaptiveText>
        </motion.div>

        {/* 打字机标语 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-lg font-body mb-8"
        >
          <AdaptiveText className="typewriter-cursor">
            <TypeWriter texts={data.hero.taglines} />
          </AdaptiveText>
        </motion.div>

        {/* 特性小字 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-6 text-xs"
        >
          <AdaptiveText className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#A58CFF]" />
            全栈开发
          </AdaptiveText>
          <AdaptiveText className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#5B8FE3]" />
            开源贡献
          </AdaptiveText>
        </motion.div>
      </div>
    </section>
  );
}
