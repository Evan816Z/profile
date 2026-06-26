/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        bg: "#0a0a0f",
        "bg-card": "rgba(255,255,255,0.04)",
        accent: "#00ffc8",
        "accent-dim": "#00ffc840",
        gold: "#f0c040",
        "gold-dim": "#f0c04040",
        muted: "#8888a8",
        fg: "#e8e8f0",
        "fg-dim": "#a0a0b8",
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "slide-up": "slide-up 0.8s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px #00ffc820" },
          "50%": { boxShadow: "0 0 40px #00ffc840" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
