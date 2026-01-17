import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: { 50: "#fff7ed", 100: "#ffedd5" },
        ink: { DEFAULT: "#1e293b", dark: "#0f172a", muted: "#64748b" },
        primary: { DEFAULT: "#ea580c", light: "#f97316", dark: "#c2410c" },
      },
    },
  },
  plugins: [],
};
export default config;