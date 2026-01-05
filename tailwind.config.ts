import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['var(--font-display)', 'serif'],
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
            },
            colors: {
                brand: {
                    bg: "#020617",        // slate-950 - Deep Abyss
                    surface: "rgba(255, 255, 255, 0.05)",
                    glass: "rgba(255, 255, 255, 0.08)",
                    border: "rgba(255, 255, 255, 0.1)",
                    primary: "#22d3ee",   // cyan-400 - Electric Cyan
                    text: "#f8fafc",      // slate-50
                    muted: "#94a3b8",     // slate-400
                    success: "#22c55e",   // green-500
                    error: "#f87171",     // red-400
                    warning: "#fbbf24",   // amber-400
                },
            },
            padding: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
            },
            height: {
                'screen-safe': '100vh',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': {
                        boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
                        transform: 'scale(1)',
                    },
                    '50%': {
                        boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)',
                        transform: 'scale(1.02)',
                    },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;