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
                // L'Atelier Light Theme
                paper: {
                    50: "#fff7ed",   // orange-50 - Warm background
                    100: "#ffedd5",  // orange-100 - Subtle warmth
                },
                ink: {
                    DEFAULT: "#1e293b", // slate-800 - Primary text
                    dark: "#0f172a",    // slate-900 - Headers
                    muted: "#64748b",   // slate-500 - Secondary text
                },
                primary: {
                    DEFAULT: "#ea580c", // orange-600 - Main actions
                    light: "#f97316",   // orange-500 - Hover states
                    dark: "#c2410c",    // orange-700 - Active states
                },
                accent: {
                    // Track-specific vibrant colors
                    cyan: "#06b6d4",
                    violet: "#8b5cf6",
                    amber: "#f59e0b",
                    emerald: "#10b981",
                    rose: "#f43f5e",
                    fuchsia: "#d946ef",
                    sky: "#0ea5e9",
                    teal: "#14b8a6",
                },
                // Keep original brand for backwards compatibility
                brand: {
                    bg: "#fff7ed",
                    surface: "white",
                    glass: "rgba(255, 255, 255, 0.9)",
                    border: "rgba(0, 0, 0, 0.08)",
                    primary: "#ea580c",
                    text: "#1e293b",
                    muted: "#64748b",
                    success: "#22c55e",
                    error: "#ef4444",
                    warning: "#f59e0b",
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
                        boxShadow: '0 0 20px rgba(234, 88, 12, 0.3)',
                        transform: 'scale(1)',
                    },
                    '50%': {
                        boxShadow: '0 0 40px rgba(234, 88, 12, 0.5)',
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