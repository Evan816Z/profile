import { motion } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { useStore } from "@/store/useStore";

export default function ProjectsSection() {
  const { data } = useStore();

  return (
    <SectionWrapper id="projects">
      <div className="flex items-center gap-3 mb-12">
        <FolderGit2 size={28} className="text-accent" />
        <h2 className="font-display text-4xl font-bold text-fg">项目</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((project, idx) => (
          <motion.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,200,0.1)] block"
          >
            {/* 项目图片 */}
            <div className="h-48 overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={18} className="text-accent" />
              </div>
            </div>

            {/* 项目信息 */}
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold text-fg mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-fg-dim mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent/80 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
}
