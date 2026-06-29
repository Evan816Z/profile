import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useResponsiveScale } from "@/hooks/useResponsiveScale";

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
}: SectionWrapperProps) {
  const scale = useResponsiveScale();

  return (
    <section id={id} className={`relative px-4 py-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto"
        style={{
          maxWidth: `${Math.round(560 * scale)}px`,
          fontSize: `${Math.round(14 * scale)}px`,
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}
