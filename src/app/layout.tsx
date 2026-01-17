import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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

  // Keep these ALWAYS light, even if Safari queries dark scheme theme-color.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff7ed" },
    { media: "(prefers-color-scheme: dark)", color: "#fff7ed" },
  ],

  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "L'Architecte | Inmersión Neurolingüística",
  description: "Tu sistema de adquisición del francés diseñado para el cerebro, no para los exámenes.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "L'Architecte",
  },
  manifest: "/manifest.json",
  other: {
    "color-scheme": "light",
    "supported-color-schemes": "light",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`light ${playfair.variable} ${inter.variable}`} // ✅ ADDED: Explicit 'light' class
      style={{ colorScheme: 'light' }} // ✅ NEW: Inline style override
    >
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />

        <Script id="force-light-mode" strategy="beforeInteractive">
          {`
            (function() {
              const root = document.documentElement;

              // Force light immediately
              root.classList.remove('dark');
              root.classList.add('light');
              root.style.setProperty('color-scheme', 'light', 'important');

              // Actively prevent .dark from being added later
              const observer = new MutationObserver(function(mutations) {
                for (const m of mutations) {
                  if (m.attributeName === 'class' && root.classList.contains('dark')) {
                    root.classList.remove('dark');
                    root.classList.add('light');
                    root.style.setProperty('color-scheme', 'light', 'important');
                  }
                }
              });

              observer.observe(root, { attributes: true });
            })();
          `}
        </Script>
      </head>

      <body className="font-sans antialiased selection:bg-orange-400/30 selection:text-slate-900">
        {/* Ambient Light Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[140%] h-[60%] rounded-full opacity-20"
            style={{
              background: "radial-gradient(ellipse, rgba(251, 146, 60, 0.3) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-[20%] -right-[20%] w-[60%] h-[40%] rounded-full opacity-15"
            style={{
              background: "radial-gradient(ellipse, rgba(234, 88, 12, 0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        {children}
      </body>
    </html>
  );
}