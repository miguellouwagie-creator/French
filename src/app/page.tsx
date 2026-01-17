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

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Package, Zap, Briefcase, Link: LinkIcon, AudioWaveform, Table2, Puzzle,
};

const colorMap: Record<string, { iconBg: string; iconText: string; hoverBg: string }> = {
  cyan: { iconBg: 'bg-cyan-100', iconText: 'text-cyan-600', hoverBg: 'hover:bg-cyan-50' },
  violet: { iconBg: 'bg-violet-100', iconText: 'text-violet-600', hoverBg: 'hover:bg-violet-50' },
  amber: { iconBg: 'bg-amber-100', iconText: 'text-amber-600', hoverBg: 'hover:bg-amber-50' },
  emerald: { iconBg: 'bg-emerald-100', iconText: 'text-emerald-600', hoverBg: 'hover:bg-emerald-50' },
  rose: { iconBg: 'bg-rose-100', iconText: 'text-rose-600', hoverBg: 'hover:bg-rose-50' },
  fuchsia: { iconBg: 'bg-fuchsia-100', iconText: 'text-fuchsia-600', hoverBg: 'hover:bg-fuchsia-50' },
  sky: { iconBg: 'bg-sky-100', iconText: 'text-sky-600', hoverBg: 'hover:bg-sky-50' },
  teal: { iconBg: 'bg-teal-100', iconText: 'text-teal-600', hoverBg: 'hover:bg-teal-50' },
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
        setDbStatus(`Error: ${e.message || "Desconocido"}`);
        console.error("Falló la base de datos:", e);
      }
    };
    init();
  }, []);

  const totalCards = TRACKS.reduce((acc, track) => acc + track.deck.length, 0);

  return (
    <main className="flex flex-col min-h-screen bg-orange-50 text-slate-800 overflow-x-hidden">

      {/* === HERO SECTION === */}
      <div className="px-6 pt-safe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-8 pb-6"
        >
          <p className="text-slate-500 text-sm font-semibold mb-1">Bonjour,</p>
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">
            Miguel 👋
          </h1>

          <div className="flex items-center gap-2 mt-4">
            <div className="relative">
              <div className={`h-2.5 w-2.5 rounded-full transition-all ${isReady ? "bg-emerald-500" : "bg-slate-300 animate-pulse"}`} />
              {isReady && (
                <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping opacity-40" />
              )}
            </div>
            <span className="text-xs text-slate-500 font-medium">{dbStatus}</span>
          </div>
        </motion.div>
      </div>

      {/* === GAME MODE CARD === */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Link href="/game">
            <motion.div
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="group relative overflow-hidden rounded-3xl p-6 shadow-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ec4899 100%)',
              }}
            >
              <div className="relative z-10 flex items-center gap-5">
                <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Gamepad2 className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-2xl text-white">Le Mixeur</h3>
                    <span className="text-xs bg-white/30 text-white px-2.5 py-1 rounded-full font-bold backdrop-blur-sm">
                      GAME
                    </span>
                  </div>
                  <p className="text-sm text-white/90 font-medium">
                    Quiz con todas las {totalCards} cartas
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-white/70 group-hover:text-white transition-colors" />
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* === SECTION TITLE === */}
      <div className="px-6 mb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <h2 className="text-xl font-bold text-slate-800">Pistas de Estudio</h2>
          <span className="text-xs text-slate-500 font-semibold px-3 py-1 rounded-full bg-white border border-slate-200">
            {TRACKS.length} tracks
          </span>
        </motion.div>
      </div>

      {/* === BENTO GRID === */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
          }}
        >
          {TRACKS.map((track) => {
            const IconComponent = iconMap[track.icon] || Shield;
            const colors = (colorMap[track.color] || colorMap.cyan) as { iconBg: string; iconText: string; hoverBg: string };

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
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-200 ${colors.hoverBg}`}
                  >
                    <div className={`${colors.iconBg} p-3 rounded-xl w-fit mb-3`}>
                      <IconComponent className={`w-6 h-6 ${colors.iconText}`} />
                    </div>
                    <div className="mb-3">
                      <h3 className="font-bold text-slate-800 text-sm mb-0.5">
                        {track.title}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {track.titleFr}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                      {track.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold bg-slate-50 px-2 py-1 rounded-full">
                        {track.deck.length} cartas
                      </span>
                      <svg className="w-4 h-4 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
        className="pb-safe mx-4 mb-4"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100">
          <nav className="flex justify-around items-center py-4">
            <NavItem icon={<Zap className="w-5 h-5" />} label="Dojo" active />
            <NavItem icon={<BarChart3 className="w-5 h-5" />} label="Progreso" />
            <NavItem icon={<Settings className="w-5 h-5" />} label="Config" />
          </nav>
        </div>
      </motion.div>
    </main>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`flex flex-col items-center gap-1.5 px-6 py-2 rounded-xl transition-all duration-200 ${active ? "text-orange-600 bg-orange-50" : "text-slate-400 hover:text-slate-800"}`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}