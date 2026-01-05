import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Elegant Serif for French Text
const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Clean Sans for UI Elements
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#020617",
};

export const metadata: Metadata = {
  title: "L'Architecte | Inmersión Neurolingüística",
  description: "Tu sistema de adquisición del francés diseñado para el cerebro, no para los exámenes.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "L'Architecte",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased selection:bg-cyan-400/30 selection:text-white">
        {/* Ambient Light Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {/* Top Cyan Glow */}
          <div
            className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[140%] h-[60%] rounded-full opacity-20"
            style={{
              background: "radial-gradient(ellipse, rgba(34, 211, 238, 0.3) 0%, transparent 70%)",
            }}
          />
          {/* Bottom Right Purple Accent */}
          <div
            className="absolute -bottom-[20%] -right-[20%] w-[60%] h-[40%] rounded-full opacity-15"
            style={{
              background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        {children}
      </body>
    </html>
  );
}
