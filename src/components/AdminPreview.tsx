import type { PersonalData } from "@/types/personal";

interface AdminPreviewProps {
  data: PersonalData;
}

export default function AdminPreview({ data }: AdminPreviewProps) {
  return (
    <div className="relative w-full h-full overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${data.settings.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">
      {/* Hero */}
      <div className="text-center py-8 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] text-[10px] text-[rgba(252,220,236,0.7)] mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB3D1] animate-pulse" />
          个人主页
        </div>

        <div className="w-20 h-20 mx-auto rounded-full p-[2px] bg-gradient-to-br from-[#FFB3D1] via-[#A58CFF] to-[#5B8FE3] mb-4">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#0E0A1C] p-[2px]">
            <img
              src={data.hero.avatar}
              alt={data.hero.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        <h1 className="font-display text-2xl font-bold text-[#FFE6F2] mb-2">
          {data.hero.name}
        </h1>

        <p className="text-xs text-[rgba(252,220,236,0.5)] mb-4">
          {data.hero.taglines[0] || "开发者"}
        </p>

        <div className="flex items-center justify-center gap-4 text-[10px] text-[rgba(252,220,236,0.4)]">
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#A58CFF]" />
            全栈开发
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#5B8FE3]" />
            开源贡献
          </span>
        </div>
      </div>

      {/* About */}
      <div className="mx-4 mb-4 rounded-2xl bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFB3D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span className="font-display text-xs font-semibold text-[#FFE6F2]">关于我</span>
        </div>
        <p className="text-[11px] leading-relaxed text-[rgba(252,220,236,0.65)] mb-3">
          {data.about.bio || "暂无简介"}
        </p>
        <div className="flex items-center gap-1.5 text-[10px] text-[rgba(252,220,236,0.4)]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF8FB8" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {data.about.location || "未知"}
        </div>
      </div>

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mx-4 mb-4 rounded-2xl bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A58CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="font-display text-xs font-semibold text-[#FFE6F2]">技能栈</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((skill) => (
              <span
                key={skill.name}
                className="text-[9px] px-2 py-1 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] text-[rgba(252,220,236,0.6)]"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mx-4 mb-4 rounded-2xl bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B8FE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className="font-display text-xs font-semibold text-[#FFE6F2]">项目作品</span>
          </div>
          <div className="space-y-2.5">
            {data.projects.map((project) => (
              <div
                key={project.title}
                className="rounded-xl overflow-hidden bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.06)]"
              >
                <div className="h-16 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A1C]/80 via-transparent to-transparent" />
                </div>
                <div className="p-2.5">
                  <h4 className="font-display text-[11px] font-semibold text-[#FFE6F2] mb-0.5">
                    {project.title}
                  </h4>
                  <p className="text-[9px] text-[rgba(252,220,236,0.45)] line-clamp-2 mb-1.5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] px-1.5 py-0.5 rounded-full bg-[rgba(165,140,255,0.12)] text-[rgba(252,220,236,0.5)] border border-[rgba(165,140,255,0.15)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      <div className="mx-4 mb-8 rounded-2xl bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF8FB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="font-display text-xs font-semibold text-[#FFE6F2]">联系方式</span>
        </div>
        <p className="text-[10px] text-[rgba(252,220,236,0.5)] mb-3">
          {data.contact.description || "欢迎与我联系"}
        </p>
        <div className="flex flex-wrap gap-2">
          {data.contact.email && (
            <span className="text-[9px] px-2.5 py-1 rounded-full bg-[rgba(255,143,187,0.1)] border border-[rgba(255,143,187,0.2)] text-[rgba(252,220,236,0.6)]">
              {data.contact.email}
            </span>
          )}
          {data.contact.socials.map((social) => (
            <span
              key={social.platform}
              className="text-[9px] px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-[rgba(252,220,236,0.5)] capitalize"
            >
              {social.platform}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-6">
        <p className="text-[9px] text-[rgba(252,220,236,0.3)]">
          © {new Date().getFullYear()} {data.hero.name} · {data.settings.footerText}
        </p>
      </div>
      </div>
    </div>
  );
}
