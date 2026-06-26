import { useState, useRef } from "react";
import { useStore } from "@/store/useStore";
import type { PersonalData } from "@/types/personal";
import {
  Save,
  RotateCcw,
  Download,
  Upload,
  ChevronDown,
  ChevronUp,
  Eye,
  Home,
  Plus,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 可折叠区块
function Collapsible({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-display font-semibold text-fg">{title}</span>
        {open ? <ChevronUp size={18} className="text-muted" /> : <ChevronDown size={18} className="text-muted" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 输入框
function Input({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const cls =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-fg placeholder:text-muted/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all font-body text-sm";
  return (
    <div>
      <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}

// 标签列表编辑
function TagListEditor({
  label,
  tags,
  onChange,
}: {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [newTag, setNewTag] = useState("");
  return (
    <div>
      <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, i) => (
          <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 text-accent/80 text-xs font-medium">
            {tag}
            <button onClick={() => onChange(tags.filter((_, idx) => idx !== i))} className="hover:text-red-400 transition-colors">
              <Trash2 size={10} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newTag.trim()) {
              onChange([...tags, newTag.trim()]);
              setNewTag("");
            }
          }}
          placeholder="输入后按回车添加"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-fg text-xs placeholder:text-muted/50 focus:outline-none focus:border-accent/40 transition-all"
        />
      </div>
    </div>
  );
}

export default function Admin() {
  const { data, updateData, resetData, exportData, importData } = useStore();
  const [editData, setEditData] = useState<PersonalData>(JSON.parse(JSON.stringify(data)));
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (path: string, value: unknown) => {
    const newData = JSON.parse(JSON.stringify(editData));
    const keys = path.split(".");
    let obj: Record<string, unknown> = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]] as Record<string, unknown>;
    }
    obj[keys[keys.length - 1]] = value;
    setEditData(newData);
  };

  const handleSave = () => {
    updateData(editData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm("确定要重置为默认数据吗？所有修改将丢失。")) {
      resetData();
      setEditData(JSON.parse(JSON.stringify(data)));
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = importData(ev.target?.result as string);
      if (result) {
        setEditData(JSON.parse(JSON.stringify(useStore.getState().data)));
        setSaved(false);
      } else {
        alert("导入失败：JSON 格式无效");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye size={22} className="text-accent" />
            <h1 className="font-display text-xl font-bold text-fg">管理后台</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-fg-dim hover:border-accent/30 hover:text-accent transition-all text-sm font-display"
            >
              <Home size={16} />
              主页预览
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 操作栏 */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-display font-medium text-sm transition-all duration-300 ${
              saved
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-accent/15 text-accent border border-accent/30 hover:bg-accent/25"
            }`}
          >
            <Save size={16} />
            {saved ? "已保存" : "保存"}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-fg-dim hover:border-red-400/30 hover:text-red-400 transition-all text-sm font-display"
          >
            <RotateCcw size={16} />
            重置
          </button>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-fg-dim hover:border-gold/30 hover:text-gold transition-all text-sm font-display"
          >
            <Download size={16} />
            导出
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-fg-dim hover:border-accent/30 hover:text-accent transition-all text-sm font-display"
          >
            <Upload size={16} />
            导入
          </button>
          <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        </div>

        {/* 编辑区 */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左侧：表单 */}
          <div className="space-y-4">
            <Collapsible title="Hero 区域" defaultOpen>
              <Input label="姓名" value={editData.hero.name} onChange={(v) => update("hero.name", v)} />
              <TagListEditor
                label="标语列表"
                tags={editData.hero.taglines}
                onChange={(v) => update("hero.taglines", v)}
              />
              <Input label="头像 URL" value={editData.hero.avatar} onChange={(v) => update("hero.avatar", v)} placeholder="https://..." />
            </Collapsible>

            <Collapsible title="关于我" defaultOpen>
              <Input label="自我描述" value={editData.about.bio} onChange={(v) => update("about.bio", v)} multiline />
              <Input label="位置" value={editData.about.location} onChange={(v) => update("about.location", v)} />
            </Collapsible>

            <Collapsible title="技能">
              {editData.skills.map((skill, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-2">
                    <Input label={`技能 ${i + 1}`} value={skill.name} onChange={(v) => {
                      const skills = [...editData.skills];
                      skills[i] = { ...skills[i], name: v };
                      setEditData({ ...editData, skills });
                    }} />
                    <div className="grid grid-cols-2 gap-2">
                      <Input label="图标" value={skill.icon} onChange={(v) => {
                        const skills = [...editData.skills];
                        skills[i] = { ...skills[i], icon: v };
                        setEditData({ ...editData, skills });
                      }} placeholder="lucide 图标名" />
                      <Input label="分类" value={skill.category} onChange={(v) => {
                        const skills = [...editData.skills];
                        skills[i] = { ...skills[i], category: v };
                        setEditData({ ...editData, skills });
                      }} />
                    </div>
                  </div>
                  <button
                    onClick={() => setEditData({ ...editData, skills: editData.skills.filter((_, idx) => idx !== i) })}
                    className="mt-7 p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => setEditData({ ...editData, skills: [...editData.skills, { name: "", icon: "Code2", category: "前端" }] })}
                className="flex items-center gap-2 text-sm text-accent/60 hover:text-accent transition-colors"
              >
                <Plus size={14} /> 添加技能
              </button>
            </Collapsible>

            <Collapsible title="项目">
              {editData.projects.map((project, i) => (
                <div key={i} className="p-4 glass rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">项目 {i + 1}</span>
                    <button
                      onClick={() => setEditData({ ...editData, projects: editData.projects.filter((_, idx) => idx !== i) })}
                      className="p-1.5 rounded text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <Input label="标题" value={project.title} onChange={(v) => {
                    const projects = [...editData.projects];
                    projects[i] = { ...projects[i], title: v };
                    setEditData({ ...editData, projects });
                  }} />
                  <Input label="描述" value={project.description} onChange={(v) => {
                    const projects = [...editData.projects];
                    projects[i] = { ...projects[i], description: v };
                    setEditData({ ...editData, projects });
                  }} multiline />
                  <TagListEditor
                    label="技术栈"
                    tags={project.tags}
                    onChange={(tags) => {
                      const projects = [...editData.projects];
                      projects[i] = { ...projects[i], tags };
                      setEditData({ ...editData, projects });
                    }}
                  />
                  <Input label="链接" value={project.link} onChange={(v) => {
                    const projects = [...editData.projects];
                    projects[i] = { ...projects[i], link: v };
                    setEditData({ ...editData, projects });
                  }} placeholder="https://..." />
                  <Input label="图片 URL" value={project.image} onChange={(v) => {
                    const projects = [...editData.projects];
                    projects[i] = { ...projects[i], image: v };
                    setEditData({ ...editData, projects });
                  }} placeholder="https://..." />
                </div>
              ))}
              <button
                onClick={() => setEditData({
                  ...editData,
                  projects: [...editData.projects, { title: "", description: "", tags: [], link: "", image: "" }],
                })}
                className="flex items-center gap-2 text-sm text-accent/60 hover:text-accent transition-colors"
              >
                <Plus size={14} /> 添加项目
              </button>
            </Collapsible>

            <Collapsible title="联系方式">
              <Input label="邮箱" value={editData.contact.email} onChange={(v) => update("contact.email", v)} />
              {editData.contact.socials.map((social, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <Input label="平台" value={social.platform} onChange={(v) => {
                      const socials = [...editData.contact.socials];
                      socials[i] = { ...socials[i], platform: v };
                      setEditData({ ...editData, contact: { ...editData.contact, socials } });
                    }} />
                    <Input label="URL" value={social.url} onChange={(v) => {
                      const socials = [...editData.contact.socials];
                      socials[i] = { ...socials[i], url: v };
                      setEditData({ ...editData, contact: { ...editData.contact, socials } });
                    }} />
                    <Input label="图标" value={social.icon} onChange={(v) => {
                      const socials = [...editData.contact.socials];
                      socials[i] = { ...socials[i], icon: v };
                      setEditData({ ...editData, contact: { ...editData.contact, socials } });
                    }} placeholder="lucide 图标名" />
                  </div>
                  <button
                    onClick={() => {
                      const socials = editData.contact.socials.filter((_, idx) => idx !== i);
                      setEditData({ ...editData, contact: { ...editData.contact, socials } });
                    }}
                    className="mb-1 p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => setEditData({
                  ...editData,
                  contact: {
                    ...editData.contact,
                    socials: [...editData.contact.socials, { platform: "", url: "", icon: "Link" }],
                  },
                })}
                className="flex items-center gap-2 text-sm text-accent/60 hover:text-accent transition-colors"
              >
                <Plus size={14} /> 添加社交链接
              </button>
            </Collapsible>
          </div>

          {/* 右侧：预览 */}
          <div className="hidden lg:block sticky top-24">
            <div className="glass rounded-2xl p-4">
              <h3 className="text-sm text-muted mb-3 font-display uppercase tracking-wider">实时预览</h3>
              <div className="rounded-xl overflow-hidden border border-white/5 bg-bg h-[70vh] overflow-y-auto">
                <iframe
                  src="/"
                  title="预览"
                  className="w-full h-full scale-100 origin-top-left pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
