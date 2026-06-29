import { motion } from "framer-motion";
import TypeWriter from "@/components/TypeWriter";
import AdaptiveText from "@/components/AdaptiveText";
import { useStore } from "@/store/useStore";
import { useResponsiveScale } from "@/hooks/useResponsiveScale";

export default function HeroSection() {
  const { data } = useStore();
  const scale = useResponsiveScale();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-8 pb-12">
      <div
        className="w-full mx-auto text-center"
        style={{ maxWidth: `${Math.round(560 * scale)}px` }}
      >
        {/* 头像 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-6"
        >
          <div
            className="mx-auto rounded-full p-1 bg-gradient-to-br from-[#FFB3D1] via-[#A58CFF] to-[#5B8FE3]"
            style={{ width: `${Math.round(112 * scale)}px`, height: `${Math.round(112 * scale)}px` }}
          >
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
            className="font-display font-bold tracking-tight"
            style={{ fontSize: `${Math.round(48 * scale)}px` }}
          >
            {data.hero.name}
          </AdaptiveText>
        </motion.div>

        {/* 打字机标语 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-body mb-8"
          style={{ fontSize: `${Math.round(18 * scale)}px` }}
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
          className="flex items-center justify-center gap-6"
          style={{ fontSize: `${Math.round(12 * scale)}px` }}
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
