import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    bg: "#0f172a",
                    surface: "#1e293b",
                    primary: "#38bdf8",
                    text: "#f8fafc",
                    muted: "#94a3b8",
                    success: "#22c55e",
                    error: "#ef4444",
                },
            },
            padding: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
            },
            height: {
                'screen-safe': '100vh',
            }
        },
    },
    plugins: [],
};
export default config;