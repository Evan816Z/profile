import { useState, useRef, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { defaultData } from "@/data/default";
import { ArrowLeft, Save, RotateCcw, Download, Upload, Eye, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import type { PersonalData } from "@/types/personal";
import NebulaBackground from "@/components/NebulaBackground";

const ADMIN_PASSWORD = "Evan816";

function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("admin-auth") === "1";
}

function setAuthenticated(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) sessionStorage.setItem("admin-auth", "1");
  else sessionStorage.removeItem("admin-auth");
}

export default function Admin() {
  const { data, updateData, resetData } = useStore();
  const [formData, setFormData] = useState<PersonalData>(data);
  const [activeTab, setActiveTab] = useState("hero");
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
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setAuth(true);
      setError("");
    } else {
      setError("密码错误");
    }
  };

  if (!auth) {
    return (
      <div className="relative min-h-screen">
        <NebulaBackground />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
          <form
            onSubmit={handleLogin}
            className="glass-card p-8 w-full max-w-sm space-y-5"
          >
            <div className="text-center">
              <h1 className="font-display text-2xl font-bold text-gradient mb-1">
                管理员登录
              </h1>
              <p className="text-xs text-[rgba(252,220,236,0.4)]">
                Admin Login
              </p>
            </div>
            <div>
              <label className="block text-xs text-[rgba(252,220,236,0.55)] mb-1.5">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入管理员密码"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.08)] text-sm text-[#FFE6F2] placeholder:text-[rgba(252,220,236,0.25)] focus:outline-none focus:border-[rgba(255,143,187,0.4)] transition-colors"
              />
            </div>
            {error && (
              <p className="text-xs text-[#FF8FB8] text-center">{error}</p>
            )}
            <button type="submit" className="w-full cta-primary">
              进入后台
            </button>
            <Link
              to="/"
              className="block text-center text-xs text-[rgba(252,220,236,0.4)] hover:text-[#FFE6F2] transition-colors"
            >
              返回主页
            </Link>
          </form>
        </div>
      </div>
    );
  }

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
    alert("保存成功！");
  };

  const handleReset = () => {
    if (confirm("确定要重置为默认数据吗？这会清空你所有的自定义内容。")) {
      resetData();
      setFormData(defaultData);
    }
  };

  const handleExport = () => {
    const useStoreInstance = useStore.getState();
    const blob = new Blob([JSON.stringify(useStoreInstance.data, null, 2)], {
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
        alert("导入成功！");
      } catch {
        alert("导入失败，请检查 JSON 格式。");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const renderField = (label: string, path: string, type = "text", placeholder = "") => (
    <div className="mb-4">
      <label className="block text-xs text-[rgba(252,220,236,0.55)] mb-1.5">{label}</label>
      <input
        type={type}
        value={(() => {
          const keys = path.split(".");
          let current: Record<string, unknown> = formData as unknown as Record<string, unknown>;
          for (const key of keys) {
            current = current[key] as Record<string, unknown>;
          }
          return (current as unknown as string) || "";
        })()}
        onChange={(e) => handleChange(path, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.08)] text-sm text-[#FFE6F2] placeholder:text-[rgba(252,220,236,0.25)] focus:outline-none focus:border-[rgba(255,143,187,0.4)] transition-colors"
      />
    </div>
  );

  const renderTextarea = (label: string, path: string, placeholder = "") => (
    <div className="mb-4">
      <label className="block text-xs text-[rgba(252,220,236,0.55)] mb-1.5">{label}</label>
      <textarea
        value={(() => {
          const keys = path.split(".");
          let current: Record<string, unknown> = formData as unknown as Record<string, unknown>;
          for (const key of keys) {
            current = current[key] as Record<string, unknown>;
          }
          return (current as unknown as string) || "";
        })()}
        onChange={(e) => handleChange(path, e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full px-3.5 py-2.5 rounded-xl bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.08)] text-sm text-[#FFE6F2] placeholder:text-[rgba(252,220,236,0.25)] focus:outline-none focus:border-[rgba(255,143,187,0.4)] transition-colors resize-none"
      />
    </div>
  );

  const tabs = [
    { id: "hero", label: "Hero", icon: "✦" },
    { id: "about", label: "关于", icon: "◎" },
    { id: "skills", label: "技能", icon: "✧" },
    { id: "projects", label: "项目", icon: "◇" },
    { id: "contact", label: "联系", icon: "✉" },
  ];

  return (
    <div className="relative min-h-screen">
      <NebulaBackground />

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 icon-btn lg:hidden"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[rgba(14,10,28,0.85)] backdrop-blur-2xl border-r border-[rgba(255,143,187,0.12)] transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-5 border-b border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFB3D1] to-[#5B8FE3] flex items-center justify-center text-[#0E0A1C] font-bold text-sm">
                E
              </div>
              <h1 className="font-display text-lg font-semibold text-[#FFE6F2]">编辑后台</h1>
            </div>
            <p className="text-[10px] text-[rgba(252,220,236,0.4)]">Admin Dashboard</p>
          </div>

          <nav className="p-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[rgba(255,179,209,0.2)] to-[rgba(91,143,227,0.15)] text-[#FFE6F2] border border-[rgba(255,143,187,0.25)]"
                    : "text-[rgba(252,220,236,0.55)] hover:bg-[rgba(255,255,255,0.04)]"
                }`}
              >
                <span className="text-[#FFB3D1]">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[rgba(255,255,255,0.06)] space-y-2">
            <button
              onClick={() => {
                setAuthenticated(false);
                setAuth(false);
              }}
              className="flex items-center justify-center gap-2 w-full cta-ghost text-xs"
            >
              退出登录
            </button>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full cta-ghost text-xs"
            >
              <ArrowLeft size={14} />
              返回主页
            </Link>
            <div className="flex gap-2">
              <button onClick={handleSave} className="flex-1 cta-primary text-xs flex items-center justify-center gap-1.5">
                <Save size={13} />
                保存
              </button>
              <button onClick={handleReset} className="flex-1 cta-ghost text-xs flex items-center justify-center gap-1.5">
                <RotateCcw size={13} />
                重置
              </button>
            </div>
            <div className="flex gap-2">
              <button onClick={handleExport} className="flex-1 cta-ghost text-xs flex items-center justify-center gap-1.5">
                <Download size={13} />
                导出
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 cta-ghost text-xs flex items-center justify-center gap-1.5"
              >
                <Upload size={13} />
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
          </div>
        </aside>

        {/* Form Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[rgba(14,10,28,0.5)]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
            <h2 className="font-display text-base font-semibold text-[#FFE6F2]">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 text-xs text-[rgba(252,220,236,0.55)] hover:text-[#FFE6F2] transition-colors"
            >
              <Eye size={14} />
              {showPreview ? "隐藏预览" : "显示预览"}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-xl mx-auto">
              {activeTab === "hero" && (
                <div className="glass-card p-5">
                  {renderField("姓名", "hero.name", "text", "你的名字")}
                  {renderField("头像 URL", "hero.avatar", "text", "头像图片链接")}
                  <div className="mb-4">
                    <label className="block text-xs text-[rgba(252,220,236,0.55)] mb-1.5">标语（每行一个）</label>
                    <textarea
                      value={formData.hero.taglines.join("\n")}
                      onChange={(e) =>
                        handleChange(
                          "hero.taglines",
                          e.target.value.split("\n").filter((line) => line.trim() !== "")
                        )
                      }
                      rows={4}
                      placeholder="例如：热爱编程&#10;全栈开发者"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.08)] text-sm text-[#FFE6F2] placeholder:text-[rgba(252,220,236,0.25)] focus:outline-none focus:border-[rgba(255,143,187,0.4)] transition-colors resize-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === "about" && (
                <div className="glass-card p-5">
                  {renderTextarea("个人简介", "about.bio", "介绍一下你自己...")}
                  {renderField("所在地", "about.location", "text", "城市 / 国家")}
                </div>
              )}

              {activeTab === "skills" && (
                <div className="glass-card p-5 space-y-4">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.06)]"
                    >
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {renderField("技能名称", `skills.${index}.name`)}
                        {renderField("分类", `skills.${index}.category`)}
                        {renderField("图标", `skills.${index}.icon`)}
                      </div>
                      <button
                        onClick={() =>
                          handleChange(
                            "skills",
                            formData.skills.filter((_, i) => i !== index)
                          )
                        }
                        className="text-xs text-[#FF8FB8] hover:text-[#FFB3D1] transition-colors"
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
                    className="w-full py-2.5 rounded-xl border border-dashed border-[rgba(255,143,187,0.3)] text-sm text-[#FFB3D1] hover:bg-[rgba(255,143,187,0.06)] transition-colors"
                  >
                    + 添加技能
                  </button>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="glass-card p-5 space-y-4">
                  {formData.projects.map((project, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.06)]"
                    >
                      {renderField("项目名称", `projects.${index}.title`)}
                      {renderTextarea("项目描述", `projects.${index}.description`)}
                      {renderField("项目链接", `projects.${index}.link`)}
                      {renderField("封面图片", `projects.${index}.image`)}
                      <div className="mb-3">
                        <label className="block text-xs text-[rgba(252,220,236,0.55)] mb-1.5">标签（逗号分隔）</label>
                        <input
                          type="text"
                          value={project.tags.join(", ")}
                          onChange={(e) =>
                            handleChange(
                              `projects.${index}.tags`,
                              e.target.value.split(",").map((t) => t.trim())
                            )
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.08)] text-sm text-[#FFE6F2] focus:outline-none focus:border-[rgba(255,143,187,0.4)] transition-colors"
                        />
                      </div>
                      <button
                        onClick={() =>
                          handleChange(
                            "projects",
                            formData.projects.filter((_, i) => i !== index)
                          )
                        }
                        className="text-xs text-[#FF8FB8] hover:text-[#FFB3D1] transition-colors"
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
                    className="w-full py-2.5 rounded-xl border border-dashed border-[rgba(255,143,187,0.3)] text-sm text-[#FFB3D1] hover:bg-[rgba(255,143,187,0.06)] transition-colors"
                  >
                    + 添加项目
                  </button>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="glass-card p-5 space-y-4">
                  {renderTextarea("联系说明", "contact.description", "一段简短的联系说明...")}
                  {renderField("邮箱", "contact.email", "email", "your@email.com")}
                  {formData.contact.socials.map((social, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.06)]"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {renderField("平台", `contact.socials.${index}.platform`)}
                        {renderField("链接", `contact.socials.${index}.url`)}
                      </div>
                      <button
                        onClick={() =>
                          handleChange(
                            "contact.socials",
                            formData.contact.socials.filter((_, i) => i !== index)
                          )
                        }
                        className="text-xs text-[#FF8FB8] hover:text-[#FFB3D1] transition-colors"
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
                    className="w-full py-2.5 rounded-xl border border-dashed border-[rgba(255,143,187,0.3)] text-sm text-[#FFB3D1] hover:bg-[rgba(255,143,187,0.06)] transition-colors"
                  >
                    + 添加社交链接
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Preview */}
        {showPreview && (
          <div className="hidden lg:flex w-[420px] flex-col border-l border-[rgba(255,255,255,0.06)] bg-[rgba(14,10,28,0.3)]">
            <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
              <h3 className="font-display text-sm font-semibold text-[#FFE6F2]">实时预览</h3>
            </div>
            <div className="flex-1 p-4 overflow-hidden">
              <iframe
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <base href="/">
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <link rel="stylesheet" href="/assets/index.css">
                      <style>body{margin:0;}</style>
                    </head>
                    <body>
                      <div id="root"></div>
                      <script type="module" src="/assets/index.js"></script>
                    </body>
                  </html>
                `}
                className="w-full h-full rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0E0A1C]"
                title="preview"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
