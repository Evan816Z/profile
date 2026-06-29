import type { PersonalData } from "@/types/personal";

export const defaultData: PersonalData = {
  hero: {
    name: "Evan816Z",
    taglines: [
      "开发者",
      "开源爱好者",
      "创意工程师",
      "终身学习者",
    ],
    avatar: "https://i1.hdslb.com/bfs/face/d0565990416e88acc3ff88bac0f21d8b7d48c6a7.jpg",
  },
  about: {
    bio: "你好！我是 Evan816Z，一名热爱技术的开发者，专注于构建优雅且高性能的 Web 应用。我相信代码不仅是工具，更是表达创意的媒介。在工作之余，我喜欢探索新技术、参与开源项目，以及分享我的知识与经验。",
    location: "地球上的某个角落",
  },
  skills: [
    { name: "React", icon: "Atom", category: "前端" },
    { name: "TypeScript", icon: "FileCode2", category: "前端" },
    { name: "Vue.js", icon: "Layers", category: "前端" },
    { name: "Tailwind CSS", icon: "Palette", category: "前端" },
    { name: "Node.js", icon: "Server", category: "后端" },
    { name: "Python", icon: "Terminal", category: "后端" },
    { name: "PostgreSQL", icon: "Database", category: "数据库" },
    { name: "Redis", icon: "Zap", category: "数据库" },
    { name: "Docker", icon: "Container", category: "DevOps" },
    { name: "Cloudflare", icon: "Cloud", category: "DevOps" },
    { name: "Git", icon: "GitBranch", category: "DevOps" },
    { name: "Figma", icon: "PenTool", category: "设计" },
  ],
  projects: [
    {
      title: "智能任务管理器",
      description:
        "基于 AI 的任务管理工具，支持自然语言创建任务、智能优先级排序和日程建议。",
      tags: ["React", "Node.js", "OpenAI", "PostgreSQL"],
      link: "https://github.com",
      image: "https://picsum.photos/seed/project1/600/400",
    },
    {
      title: "实时协作白板",
      description:
        "支持多人实时协作的在线白板应用，具备画笔、形状、文字和便签等功能。",
      tags: ["Vue.js", "WebSocket", "Canvas", "Redis"],
      link: "https://github.com",
      image: "https://picsum.photos/seed/project2/600/400",
    },
    {
      title: "个人博客系统",
      description:
        "基于 Markdown 的静态博客系统，支持暗色主题、文章搜索和 RSS 订阅。",
      tags: ["Next.js", "MDX", "Tailwind", "Vercel"],
      link: "https://github.com",
      image: "https://picsum.photos/seed/project3/600/400",
    },
  ],
  contact: {
    description: "欢迎通过邮件或社交媒体与我联系，一起交流技术与创意。",
    email: "Evan816Z@users.noreply.github.com",
    socials: [
      { platform: "github", url: "https://github.com/Evan816Z", icon: "Github" },
    ],
  },
};
