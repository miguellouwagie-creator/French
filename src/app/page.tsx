"use client";
import { useEffect, useState } from 'react';
import { getDatabase } from '../lib/db';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TRACKS } from '../lib/data';
import {
  Shield, Package, Zap, Briefcase, Link as LinkIcon,
  BarChart3, Settings, AudioWaveform, Gamepad2, Trophy,
  Table2, Puzzle
} from 'lucide-react';

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Package,
  Zap,
  Briefcase,
  Link: LinkIcon,
  AudioWaveform,
  Table2,
  Puzzle,
};

// Color mapping for track cards
const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  cyan: {
    bg: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    glow: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]',
  },
  violet: {
    bg: 'from-violet-500/20 to-violet-600/5',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]',
  },
  amber: {
    bg: 'from-amber-500/20 to-amber-600/5',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]',
  },
  emerald: {
    bg: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
  },
  rose: {
    bg: 'from-rose-500/20 to-rose-600/5',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    glow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]',
  },
  fuchsia: {
    bg: 'from-fuchsia-500/20 to-fuchsia-600/5',
    border: 'border-fuchsia-500/30',
    text: 'text-fuchsia-400',
    glow: 'group-hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]',
  },
  sky: {
    bg: 'from-sky-500/20 to-sky-600/5',
    border: 'border-sky-500/30',
    text: 'text-sky-400',
    glow: 'group-hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]',
  },
  teal: {
    bg: 'from-teal-500/20 to-teal-600/5',
    border: 'border-teal-500/30',
    text: 'text-teal-400',
    glow: 'group-hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]',
  },
};

export default function Home() {
  const [dbStatus, setDbStatus] = useState("Iniciando...");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await getDatabase();
        setDbStatus("Cerebro Activo");
        setIsReady(true);
      } catch (e: any) {
        // AHORA MOSTRAMOS EL ERROR REAL EN PANTALLA
        setDbStatus(`Error: ${e.message || "Desconocido"}`);
        console.error("Falló la base de datos:", e);
      }
    };
    init();
  }, []);

  // Calculate total cards
  const totalCards = TRACKS.reduce((acc, track) => acc + track.deck.length, 0);

  return (
    <main className="flex flex-col min-h-screen bg-transparent text-brand-text overflow-x-hidden">

      {/* === HERO SECTION === */}
      <div className="px-6 pt-safe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-8 pb-4"
        >
          {/* Greeting */}
          <p className="text-brand-muted text-sm font-medium mb-1">Bonjour,</p>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Miguel 👋
          </h1>

          {/* Status Badge */}
          <div className="flex items-center gap-2 mt-4">
            <div className="relative">
              <div className={`h-2.5 w-2.5 rounded-full transition-all ${isReady ? "bg-green-400" : "bg-brand-muted animate-pulse"
                }`} />
              {isReady && (
                <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-green-400 animate-ping opacity-40" />
              )}
            </div>
            <span className="text-xs text-brand-muted">{dbStatus}</span>
          </div>
        </motion.div>
      </div>

      {/* === GAME MODE CARD === */}
      <div className="px-6 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Link href="/game">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl p-5 border border-amber-500/40 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(217,70,239,0.1) 50%, rgba(34,211,238,0.05) 100%)',
              }}
            >
              {/* Animated Background Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.2) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 flex items-center gap-4">
                {/* Game Icon */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/30 to-fuchsia-500/20 border border-amber-500/30">
                  <Gamepad2 className="w-8 h-8 text-amber-400" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-white">Le Mixeur</h3>
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                      GAME
                    </span>
                  </div>
                  <p className="text-sm text-brand-muted">
                    Quiz con todas las {totalCards} cartas
                  </p>
                </div>

                {/* Trophy */}
                <Trophy className="w-6 h-6 text-amber-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* === SECTION TITLE === */}
      <div className="px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-3"
        >
          <h2 className="text-lg font-semibold text-white">Pistas de Estudio</h2>
          <span className="text-xs text-brand-muted">{TRACKS.length} tracks</span>
        </motion.div>
      </div>

      {/* === TRACK GRID === */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <motion.div
          className="grid gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          {TRACKS.map((track) => {
            const IconComponent = iconMap[track.icon] || Shield;
            const colors = colorMap[track.color] || colorMap.cyan;

            return (
              <motion.div
                key={track.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Link href={`/dojo?track=${track.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative overflow-hidden rounded-2xl p-4 border backdrop-blur-sm transition-all duration-300 ${colors.border} ${colors.glow}`}
                    style={{
                      background: `linear-gradient(135deg, ${colors.bg.includes('cyan') ? 'rgba(34,211,238,0.08)' : colors.bg.includes('violet') ? 'rgba(139,92,246,0.08)' : colors.bg.includes('amber') ? 'rgba(245,158,11,0.08)' : colors.bg.includes('emerald') ? 'rgba(16,185,129,0.08)' : colors.bg.includes('fuchsia') ? 'rgba(217,70,239,0.08)' : 'rgba(244,63,94,0.08)'} 0%, rgba(255,255,255,0.02) 100%)`,
                    }}
                  >
                    <div className="relative z-10 flex items-center gap-4">
                      {/* Icon */}
                      <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${colors.text}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-white text-sm">{track.title}</h3>
                          <span className={`text-[10px] font-medium ${colors.text}`}>
                            {track.titleFr}
                          </span>
                        </div>
                        <p className="text-xs text-brand-muted leading-relaxed">
                          {track.description}
                        </p>
                      </div>

                      {/* Card Count + Arrow */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-brand-muted/70 bg-white/5 px-2 py-1 rounded-full">
                          {track.deck.length}
                        </span>
                        <svg className="w-4 h-4 text-brand-muted group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* === BOTTOM NAVIGATION === */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pb-safe glass-pill mx-4 mb-4 rounded-[2rem]"
      >
        <nav className="flex justify-around items-center py-4">
          <NavItem icon={<Zap className="w-5 h-5" />} label="Dojo" active />
          <NavItem icon={<BarChart3 className="w-5 h-5" />} label="Progreso" />
          <NavItem icon={<Settings className="w-5 h-5" />} label="Config" />
        </nav>
      </motion.div>
    </main>
  );
}

function NavItem({
  icon,
  label,
  active = false
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean
}) {
  return (
    <button
      className={`flex flex-col items-center gap-1.5 px-6 py-2 rounded-xl transition-all duration-200 btn-tactile ${active ? "text-cyan-400" : "text-brand-muted hover:text-white"
        }`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}