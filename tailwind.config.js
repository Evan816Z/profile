/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Outfit", "Google Sans", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        body: ["DM Sans", "Google Sans Text", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      colors: {
        bg: "#0E0A1C",
        "bg-elevated": "#15102A",
        pink: "#FFB3D1",
        "pink-dim": "#FF8FB8",
        purple: "#A58CFF",
        blue: "#5B8FE3",
      },
      borderRadius: {
        "2xl": "24px",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        pulse: "livePulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
