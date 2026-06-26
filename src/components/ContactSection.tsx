import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import * as Icons from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { useStore } from "@/store/useStore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconMap = Record<string, React.ComponentType<any>>;

function DynamicIcon({ name, ...props }: { name: string } & React.SVGProps<SVGSVGElement>) {
  const IconComponent = (Icons as unknown as IconMap)[name];
  if (!IconComponent) return <Icons.Link {...props} />;
  return <IconComponent {...props} />;
}

export default function ContactSection() {
  const { data } = useStore();

  return (
    <SectionWrapper id="contact">
      <div className="flex items-center gap-3 mb-12">
        <Mail size={28} className="text-accent" />
        <h2 className="font-display text-4xl font-bold text-fg">联系方式</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-fg-dim mb-8">
          如果你有任何问题或合作意向，欢迎通过以下方式联系我
        </p>

        {/* 邮箱 */}
        <motion.a
          href={`mailto:${data.contact.email}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass glass-hover text-accent text-lg font-display font-medium mb-10 transition-all duration-300"
        >
          <Mail size={20} />
          {data.contact.email}
        </motion.a>

        {/* 社交链接 */}
        <div className="flex justify-center gap-4 mt-8">
          {data.contact.socials.map((social, idx) => (
            <motion.a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.1, type: "spring" }}
              whileHover={{ scale: 1.15, y: -4 }}
              className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center text-muted hover:text-accent transition-colors"
              title={social.platform}
            >
              <DynamicIcon name={social.icon} className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-white/5 text-center">
        <p className="text-sm text-muted flex items-center justify-center gap-1.5">
          Made with <Heart size={14} className="text-accent" /> using React & Tailwind
        </p>
        <a
          href="#/admin"
          className="inline-block mt-3 text-xs text-muted/40 hover:text-muted transition-colors"
        >
          管理后台
        </a>
      </div>
    </SectionWrapper>
  );
}
