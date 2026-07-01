import { useState, useRef, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { defaultData } from "@/data/default";
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Download,
  Upload,
  Eye,
  EyeOff,
  Menu,
  X,
  Sparkles,
  FolderGit2,
  Mail,
  Layers,
  Lock,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { PersonalData } from "@/types/personal";
import AdminPreview from "@/components/AdminPreview";

function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("admin-auth") === "1";
}

function setAuthenticated(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) sessionStorage.setItem("admin-auth", "1");
  else sessionStorage.removeItem("admin-auth");
}

const TABS = [
  { id: "about", label: "关于", icon: Layers },
  { id: "skills", label: "技能", icon: Sparkles },
  { id: "projects", label: "项目", icon: FolderGit2 },
  { id: "contact", label: "联系", icon: Mail },
  { id: "settings", label: "设置", icon: Settings },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Admin() {
  const { data, updateData, resetData } = useStore();
  const [formData, setFormData] = useState<PersonalData>(data);
  const [activeTab, setActiveTab] = useState<TabId>("about");
  const [showPreview, setShowPreview] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(isAuthenticated());
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === formData.settings.adminPassword) {
      setAuthenticated(true);
      setAuth(true);
      setError("");
    } else {
      setError("密码错误");
    }
  };

  const handleChange = (path: string, value: unknown) => {
    setFormData((prev) => {
      const keys = path.split(".");
      const next = structuredClone(prev) as PersonalData & Record<string, unknown>;
      let current: Record<string, unknown> = next;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        current = current[key] as Record<string, unknown>;
      }
      current[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleSave = () => {
    updateData(formData);
  };

  const handleReset = () => {
    if (confirm("确定要重置为默认数据吗？这会清空你所有的自定义内容。")) {
      resetData();
      setFormData(defaultData);
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "personal-site-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = event.target?.result as string;
        const parsed = JSON.parse(json) as PersonalData;
        setFormData(parsed);
        updateData(parsed);
      } catch {
        alert("导入失败，请检查 JSON 格式。");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const getField = (path: string): string => {
    const keys = path.split(".");
    let current: Record<string, unknown> = formData as unknown as Record<string, unknown>;
    for (const key of keys) {
      current = current[key] as Record<string, unknown>;
    }
    return (current as unknown as string) || "";
  };

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl bg-[rgba(0,0,0,0.65)] border border-[rgba(255,255,255,0.18)] text-sm text-white placeholder:text-[rgba(252,220,236,0.45)] focus:outline-none focus:border-[rgba(255,143,187,0.65)] focus:bg-[rgba(0,0,0,0.75)] focus:ring-1 focus:ring-[rgba(255,143,187,0.25)] transition-all";

  const labelClass = "block text-xs font-semibold text-[rgba(255,255,255,0.92)] mb-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]";

  const sectionTitleClass = "font-display text-sm font-semibold text-[#FFE6F2] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]";

  // ─── Login Screen ───
  if (!auth) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-4">
        {/* Background */}
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url(https://t.alcy.cc/moez)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="fixed inset-0 z-0 bg-black/20" />

        <div className="relative z-10 w-full" style={{ maxWidth: "calc(24rem * var(--viewport-scale))" }}>
          <div
            className="liquid-glass-card p-8 space-y-6"
            style={{ "--lg-filter": "blur(20px) saturate(1.8)" } as React.CSSProperties}
          >
            {/* Logo */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#FFB3D1] via-[#A58CFF] to-[#5B8FE3] flex items-center justify-center shadow-lg shadow-[rgba(165,140,255,0.25)]">
                <Lock size={24} className="text-white" />
              </div>
              <h1 className="font-display text-xl font-bold text-gradient">
                管理员登录
              </h1>
              <p className="text-[11px] text-[rgba(252,220,236,0.35)] mt-1">
                Admin Dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className={labelClass}>密码</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入管理员密码"
                  className={inputClass}
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-[11px] text-[#FF8FB8] text-center bg-[rgba(255,143,187,0.08)] rounded-lg py-2">
                  {error}
                </p>
              )}
              <button type="submit" className="w-full cta-primary py-3">
                进入后台
              </button>
            </form>

            <Link
              to="/"
              className="flex items-center justify-center gap-1.5 text-[11px] text-[rgba(252,220,236,0.35)] hover:text-[#FFE6F2] transition-colors"
            >
              <ArrowLeft size={12} />
              返回主页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main Admin ───
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url(https://t.alcy.cc/moez)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="fixed inset-0 z-0 bg-black/10" />

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Mobile Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 w-9 h-9 rounded-xl flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] text-[rgba(252,220,236,0.7)] hover:text-[#FFE6F2] transition-colors lg:hidden"
        >
          {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col bg-[rgba(10,8,20,0.85)] backdrop-blur-2xl border-r border-[rgba(255,255,255,0.06)] transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-5 border-b border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFB3D1] via-[#A58CFF] to-[#5B8FE3] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[rgba(165,140,255,0.2)]">
                E
              </div>
              <div>
                <h1 className="font-display text-sm font-semibold text-[#FFE6F2]">编辑后台</h1>
                <p className="text-[10px] text-[rgba(252,220,236,0.3)]">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[rgba(255,179,209,0.15)] to-[rgba(91,143,227,0.1)] text-[#FFE6F2] border border-[rgba(255,143,187,0.2)] shadow-lg shadow-[rgba(255,143,187,0.06)]"
                      : "text-[rgba(252,220,236,0.45)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[rgba(252,220,236,0.7)]"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-[#FFB3D1]" : ""} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-[rgba(255,255,255,0.06)] space-y-2">
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 cta-primary text-[11px] flex items-center justify-center gap-1.5 py-2"
              >
                <Save size={12} />
                保存
              </button>
              <button
                onClick={handleReset}
                className="flex-1 text-[11px] flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[rgba(252,220,236,0.5)] hover:text-[#FFE6F2] hover:bg-[rgba(255,255,255,0.08)] transition-all"
              >
                <RotateCcw size={12} />
                重置
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex-1 text-[11px] flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[rgba(252,220,236,0.5)] hover:text-[#FFE6F2] hover:bg-[rgba(255,255,255,0.08)] transition-all"
              >
                <Download size={12} />
                导出
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 text-[11px] flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[rgba(252,220,236,0.5)] hover:text-[#FFE6F2] hover:bg-[rgba(255,255,255,0.08)] transition-all"
              >
                <Upload size={12} />
                导入
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setAuthenticated(false);
                  setAuth(false);
                }}
                className="flex-1 text-[11px] py-2 rounded-xl border border-[rgba(255,143,187,0.15)] text-[rgba(252,220,236,0.45)] hover:text-[#FFB3D1] hover:border-[rgba(255,143,187,0.3)] transition-all"
              >
                退出
              </button>
              <Link
                to="/"
                className="flex-1 flex items-center justify-center gap-1.5 text-[11px] py-2 rounded-xl border border-[rgba(255,255,255,0.08)] text-[rgba(252,220,236,0.45)] hover:text-[#FFE6F2] hover:bg-[rgba(255,255,255,0.04)] transition-all"
              >
                <ArrowLeft size={11} />
                主页
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-[rgba(8,6,18,0.82)] backdrop-blur-xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(10,8,20,0.4)] backdrop-blur-xl">
            <div className="flex items-center gap-2.5">
              {(() => {
                const tab = TABS.find((t) => t.id === activeTab);
                if (!tab) return null;
                const Icon = tab.icon;
                return (
                  <>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)]">
                      <Icon size={14} className="text-[#FFB3D1]" />
                    </div>
                    <h2 className="font-display text-sm font-semibold text-[#FFE6F2]">
                      {tab.label}
                    </h2>
                  </>
                );
              })()}
            </div>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 text-[11px] text-[rgba(252,220,236,0.4)] hover:text-[#FFE6F2] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.04)]"
            >
              {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
              {showPreview ? "隐藏预览" : "显示预览"}
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-5">
            <div className="mx-auto space-y-3" style={{ maxWidth: "calc(32rem * var(--viewport-scale))" }}>
              {activeTab === "about" && (
                <div className="glass-card p-5 space-y-4">
                  <div>
                    <label className={labelClass}>个人简介</label>
                    <textarea
                      value={getField("about.bio")}
                      onChange={(e) => handleChange("about.bio", e.target.value)}
                      placeholder="介绍一下你自己..."
                      rows={5}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>所在地</label>
                    <input
                      type="text"
                      value={getField("about.location")}
                      onChange={(e) => handleChange("about.location", e.target.value)}
                      placeholder="城市 / 国家"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="glass-card p-5 space-y-3">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.06)] space-y-3"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className={labelClass}>技能名称</label>
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) =>
                              handleChange(`skills.${index}.name`, e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>分类</label>
                          <input
                            type="text"
                            value={skill.category}
                            onChange={(e) =>
                              handleChange(`skills.${index}.category`, e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>图标</label>
                          <input
                            type="text"
                            value={skill.icon}
                            onChange={(e) =>
                              handleChange(`skills.${index}.icon`, e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleChange(
                            "skills",
                            formData.skills.filter((_, i) => i !== index)
                          )
                        }
                        className="text-[11px] text-[#FF8FB8] hover:text-[#FFB3D1] transition-colors"
                      >
                        删除此项
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      handleChange("skills", [
                        ...formData.skills,
                        { name: "新技能", category: "技术", icon: "Code2" },
                      ])
                    }
                    className="w-full py-2.5 rounded-xl border border-dashed border-[rgba(255,143,187,0.25)] text-[12px] text-[#FFB3D1] hover:bg-[rgba(255,143,187,0.06)] transition-colors"
                  >
                    + 添加技能
                  </button>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="glass-card p-5 space-y-3">
                  {formData.projects.map((project, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.06)] space-y-3"
                    >
                      <div>
                        <label className={labelClass}>项目名称</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) =>
                            handleChange(`projects.${index}.title`, e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>项目描述</label>
                        <textarea
                          value={project.description}
                          onChange={(e) =>
                            handleChange(`projects.${index}.description`, e.target.value)
                          }
                          rows={3}
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelClass}>项目链接</label>
                          <input
                            type="text"
                            value={project.link}
                            onChange={(e) =>
                              handleChange(`projects.${index}.link`, e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>封面图片</label>
                          <input
                            type="text"
                            value={project.image}
                            onChange={(e) =>
                              handleChange(`projects.${index}.image`, e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>标签（逗号分隔）</label>
                        <input
                          type="text"
                          value={project.tags.join(", ")}
                          onChange={(e) =>
                            handleChange(
                              `projects.${index}.tags`,
                              e.target.value.split(",").map((t) => t.trim())
                            )
                          }
                          className={inputClass}
                        />
                      </div>
                      <button
                        onClick={() =>
                          handleChange(
                            "projects",
                            formData.projects.filter((_, i) => i !== index)
                          )
                        }
                        className="text-[11px] text-[#FF8FB8] hover:text-[#FFB3D1] transition-colors"
                      >
                        删除此项
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      handleChange("projects", [
                        ...formData.projects,
                        {
                          title: "新项目",
                          description: "项目描述",
                          image: "https://placehold.co/600x400/15102A/FFB3D1?text=Project",
                          link: "#",
                          tags: ["Tag"],
                        },
                      ])
                    }
                    className="w-full py-2.5 rounded-xl border border-dashed border-[rgba(255,143,187,0.25)] text-[12px] text-[#FFB3D1] hover:bg-[rgba(255,143,187,0.06)] transition-colors"
                  >
                    + 添加项目
                  </button>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="glass-card p-5 space-y-3">
                  <div>
                    <label className={labelClass}>联系说明</label>
                    <textarea
                      value={getField("contact.description")}
                      onChange={(e) => handleChange("contact.description", e.target.value)}
                      placeholder="一段简短的联系说明..."
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>邮箱</label>
                    <input
                      type="email"
                      value={getField("contact.email")}
                      onChange={(e) => handleChange("contact.email", e.target.value)}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                  {formData.contact.socials.map((social, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.06)] space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelClass}>平台</label>
                          <input
                            type="text"
                            value={social.platform}
                            onChange={(e) =>
                              handleChange(`contact.socials.${index}.platform`, e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>链接</label>
                          <input
                            type="text"
                            value={social.url}
                            onChange={(e) =>
                              handleChange(`contact.socials.${index}.url`, e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleChange(
                            "contact.socials",
                            formData.contact.socials.filter((_, i) => i !== index)
                          )
                        }
                        className="text-[11px] text-[#FF8FB8] hover:text-[#FFB3D1] transition-colors"
                      >
                        删除此项
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      handleChange("contact.socials", [
                        ...formData.contact.socials,
                        { platform: "github", url: "https://github.com/" },
                      ])
                    }
                    className="w-full py-2.5 rounded-xl border border-dashed border-[rgba(255,143,187,0.25)] text-[12px] text-[#FFB3D1] hover:bg-[rgba(255,143,187,0.06)] transition-colors"
                  >
                    + 添加社交链接
                  </button>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="glass-card p-5 space-y-5">
                  <div>
                    <h3 className={sectionTitleClass}>基础设置</h3>
                    <p className="text-[11px] text-[rgba(252,220,236,0.45)] mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                      站点标题、背景与可见性
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>网站标题</label>
                    <input
                      type="text"
                      value={getField("settings.siteTitle")}
                      onChange={(e) => handleChange("settings.siteTitle", e.target.value)}
                      placeholder="例如：Evan816Z"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>背景图片 URL</label>
                    <input
                      type="text"
                      value={getField("settings.backgroundImage")}
                      onChange={(e) => handleChange("settings.backgroundImage", e.target.value)}
                      placeholder="https://..."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>页脚文案</label>
                    <input
                      type="text"
                      value={getField("settings.footerText")}
                      onChange={(e) => handleChange("settings.footerText", e.target.value)}
                      placeholder="Crafted with ♥"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.08)]">
                    <div>
                      <span className="block text-sm font-medium text-[#FFE6F2] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">显示管理按钮</span>
                      <span className="text-[10px] text-[rgba(252,220,236,0.4)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">在首页右上角显示进入后台的入口</span>
                    </div>
                    <button
                      onClick={() =>
                        handleChange("settings.showAdminButton", !formData.settings.showAdminButton)
                      }
                      className={`relative w-10 h-5 rounded-full transition-colors ${
                        formData.settings.showAdminButton
                          ? "bg-[#FFB3D1]"
                          : "bg-[rgba(255,255,255,0.15)]"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          formData.settings.showAdminButton ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className="h-px bg-[rgba(255,255,255,0.08)]" />

                  <div>
                    <h3 className={sectionTitleClass}>主题色与渐变</h3>
                    <p className="text-[11px] text-[rgba(252,220,236,0.45)] mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                      自定义强调色与全局渐变
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>主题色</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={getField("settings.themeColor")}
                        onChange={(e) => handleChange("settings.themeColor", e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border-2 border-[rgba(255,255,255,0.25)] shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
                      />
                      <input
                        type="text"
                        value={getField("settings.themeColor")}
                        onChange={(e) => handleChange("settings.themeColor", e.target.value)}
                        placeholder="#FFB3D1"
                        className={`${inputClass} flex-1`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>渐变色</label>
                    <div
                      className="h-10 rounded-xl mb-3 border border-[rgba(255,255,255,0.15)] shadow-inner"
                      style={{
                        background: `linear-gradient(135deg, ${formData.settings.gradientStart} 0%, ${formData.settings.gradientMid} 50%, ${formData.settings.gradientEnd} 100%)`,
                      }}
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <span className="block text-[10px] text-[rgba(252,220,236,0.55)] mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">起始</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={getField("settings.gradientStart")}
                            onChange={(e) => handleChange("settings.gradientStart", e.target.value)}
                            className="w-8 h-8 rounded-md cursor-pointer border-2 border-[rgba(255,255,255,0.25)] shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
                          />
                          <input
                            type="text"
                            value={getField("settings.gradientStart")}
                            onChange={(e) => handleChange("settings.gradientStart", e.target.value)}
                            placeholder="#FFB3D1"
                            className={`${inputClass} flex-1 min-w-0`}
                          />
                        </div>
                      </div>
                      <div>
                        <span className="block text-[10px] text-[rgba(252,220,236,0.55)] mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">中间</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={getField("settings.gradientMid")}
                            onChange={(e) => handleChange("settings.gradientMid", e.target.value)}
                            className="w-8 h-8 rounded-md cursor-pointer border-2 border-[rgba(255,255,255,0.25)] shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
                          />
                          <input
                            type="text"
                            value={getField("settings.gradientMid")}
                            onChange={(e) => handleChange("settings.gradientMid", e.target.value)}
                            placeholder="#A58CFF"
                            className={`${inputClass} flex-1 min-w-0`}
                          />
                        </div>
                      </div>
                      <div>
                        <span className="block text-[10px] text-[rgba(252,220,236,0.55)] mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">结束</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={getField("settings.gradientEnd")}
                            onChange={(e) => handleChange("settings.gradientEnd", e.target.value)}
                            className="w-8 h-8 rounded-md cursor-pointer border-2 border-[rgba(255,255,255,0.25)] shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
                          />
                          <input
                            type="text"
                            value={getField("settings.gradientEnd")}
                            onChange={(e) => handleChange("settings.gradientEnd", e.target.value)}
                            placeholder="#5B8FE3"
                            className={`${inputClass} flex-1 min-w-0`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-[rgba(255,255,255,0.08)]" />

                  <div>
                    <h3 className={sectionTitleClass}>安全</h3>
                    <p className="text-[11px] text-[rgba(252,220,236,0.45)] mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                      后台登录凭据
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>管理员密码</label>
                    <input
                      type="text"
                      value={getField("settings.adminPassword")}
                      onChange={(e) => handleChange("settings.adminPassword", e.target.value)}
                      placeholder="后台登录密码"
                      className={inputClass}
                    />
                    <p className="text-[11px] text-[rgba(252,220,236,0.45)] mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                      修改后需要使用新密码重新登录
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Preview Panel */}
        {showPreview && (
          <div className="hidden lg:flex w-[380px] flex-col border-l border-[rgba(255,255,255,0.06)] bg-[rgba(10,8,20,0.6)] backdrop-blur-xl">
            <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FFB3D1] animate-pulse" />
              <h3 className="font-display text-[11px] font-semibold text-[#FFE6F2]">实时预览</h3>
              <span className="text-[9px] text-[rgba(252,220,236,0.3)] ml-auto">Live</span>
            </div>
            <div className="flex-1 p-3 overflow-hidden">
              <div className="w-full h-full rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0E0A1C] overflow-hidden">
                <AdminPreview data={formData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
