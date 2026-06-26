import { motion } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { useStore } from "@/store/useStore";

export default function ProjectsSection() {
  const { data } = useStore();

  return (
    <SectionWrapper id="projects">
      <div className="glass-card glass-shimmer p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
            <FolderGit2 size={18} className="text-[#5B8FE3]" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-[#FFE6F2]">项目作品</h2>
            <p className="text-xs text-[rgba(252,220,236,0.4)]">Projects</p>
          </div>
        </div>

        <div className="space-y-4">
          {data.projects.map((project, idx) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              className="block rounded-2xl overflow-hidden bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,143,187,0.25)] transition-all group"
            >
              <div className="h-36 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A1C]/90 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={16} className="text-[#FFB3D1]" />
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-display text-base font-semibold text-[#FFE6F2] mb-1.5 group-hover:text-[#FFB3D1] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[rgba(252,220,236,0.55)] mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-1 rounded-full bg-[rgba(165,140,255,0.12)] text-[#A58CFF] font-medium border border-[rgba(165,140,255,0.2)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
