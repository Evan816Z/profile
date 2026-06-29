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
      title: "Tinject",
      description: "开源的 DLL 注入器，支持进程注入与模块管理。",
      tags: ["C++", "Windows", "Injection", "Open Source"],
      link: "https://github.com/Evan816Z/Tinject",
      image: "https://opengraph.githubassets.com/1/Evan816Z/Tinject",
    },
    {
      title: "webcam3",
      description:
        "多摄像头 Web 采集工具：枚举所有视频输入设备，拍照并上传到本地 Flask 服务器，可配合 ngrok 实现公网 HTTPS 访问。",
      tags: ["Python", "Flask", "WebRTC", "ngrok"],
      link: "https://github.com/Evan816Z/webcam3",
      image: "https://opengraph.githubassets.com/1/Evan816Z/webcam3",
    },
    {
      title: "profile",
      description: "基于 React + Vite + TypeScript 构建的个人主页，支持 Admin 后台编辑与 Cloudflare Pages / GitHub Pages 双平台部署。",
      tags: ["React", "Vite", "TypeScript", "Tailwind"],
      link: "https://github.com/Evan816Z/profile",
      image: "https://opengraph.githubassets.com/1/Evan816Z/profile",
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
