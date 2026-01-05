"use client";
import { useEffect, useState } from 'react';
import { getDatabase } from '../lib/db';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [dbStatus, setDbStatus] = useState("Iniciando...");
  const [isReady, setIsReady] = useState(false);

  // Al cargar la app, intentamos conectar con el Cerebro (RxDB)
  useEffect(() => {
    const init = async () => {
      try {
        await getDatabase();
        setDbStatus("Cerebro Activo");
        setIsReady(true);
      } catch (e) {
        setDbStatus("Error de Sistema");
        console.error(e);
      }
    };
    init();
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-transparent text-brand-text overflow-hidden">

      {/* === HERO SECTION === */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-safe relative">

        {/* Floating Watermark */}
        <motion.div
          className="absolute text-[20rem] opacity-[0.03] font-display select-none pointer-events-none"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          🗼
        </motion.div>

        {/* Brand Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center z-10"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-3 bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
            L'Architecte
          </h1>
          <p className="text-brand-muted text-xs uppercase tracking-[0.3em] font-medium">
            Inmersión Neurolingüística
          </p>
        </motion.div>

        {/* Daily Briefing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="glass-card rounded-3xl p-6 w-full max-w-sm mt-12 relative overflow-hidden"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 animate-shimmer opacity-50" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">
                Estado del Núcleo
              </span>
              <span className="text-[10px] glass-pill px-3 py-1 rounded-full text-cyan-300 font-medium">
                v1.0 Local
              </span>
            </div>

            {/* Brain Status */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className={`h-4 w-4 rounded-full transition-all duration-500 ${isReady
                      ? "bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.6)]"
                      : "bg-brand-muted animate-pulse"
                    }`}
                />
                {isReady && (
                  <div className="absolute inset-0 h-4 w-4 rounded-full bg-green-400 animate-ping opacity-40" />
                )}
              </div>
              <div>
                <span className="text-lg font-semibold text-white">{dbStatus}</span>
                {isReady && (
                  <p className="text-xs text-brand-muted mt-0.5">Listo para entrenar</p>
                )}
              </div>
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10">
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">30</p>
                <p className="text-[9px] text-brand-muted uppercase tracking-wider">Cartas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">A1</p>
                <p className="text-[9px] text-brand-muted uppercase tracking-wider">Nivel</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">∞</p>
                <p className="text-[9px] text-brand-muted uppercase tracking-wider">Rondas</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* === BOTTOM ACTION ZONE === */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="pb-safe glass-pill mx-4 mb-4 rounded-[2rem] overflow-hidden"
      >
        {/* Hero CTA Button */}
        <div className="p-4">
          <Link href="/dojo" className="block w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary-glow text-slate-900 font-extrabold text-lg py-5 rounded-2xl relative overflow-hidden group"
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span>ENTRAR AL DOJO</span>
                <span className="text-xl">⚡</span>
              </span>
            </motion.button>
          </Link>
        </div>

        {/* Glass Pill Navigation */}
        <nav className="flex justify-around items-center py-4 border-t border-white/10">
          <NavItem icon="⚡" label="Dojo" active />
          <NavItem icon="📊" label="Progreso" />
          <NavItem icon="⚙️" label="Config" />
        </nav>
      </motion.div>
    </main>
  );
}

// Navigation Item Component
function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <button
      className={`flex flex-col items-center gap-1.5 px-6 py-2 rounded-xl transition-all duration-200 btn-tactile ${active
          ? "text-cyan-400"
          : "text-brand-muted hover:text-white"
        }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}