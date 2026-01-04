"use client";
import { useEffect, useState } from 'react';
import { getDatabase } from '../lib/db';
import Link from 'next/link'; // <--- AÑADE ESTO ARRIBA

export default function Home() {
  const [dbStatus, setDbStatus] = useState("Iniciando...");

  // Al cargar la app, intentamos conectar con el Cerebro (RxDB)
  useEffect(() => {
    const init = async () => {
      try {
        await getDatabase();
        setDbStatus("Cerebro Activo 🧠");
      } catch (e) {
        setDbStatus("Error de Sistema ❌");
        console.error(e);
      }
    };
    init();
  }, []);

  return (
    <main className="flex flex-col h-screen-safe bg-brand-bg text-brand-text overflow-hidden">

      {/* --- ZONA SUPERIOR (Visualización) --- 
          Diseñada para ver, no para tocar (Zona Roja del iPhone) */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-safe">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-brand-primary font-serif">
          L'Architecte
        </h1>
        <p className="text-brand-muted text-xs uppercase tracking-widest mb-12">
          Inmersión Neurolingüística
        </p>

        {/* Tarjeta de Estado del Sistema */}
        <div className="bg-brand-surface p-6 rounded-2xl border border-slate-700/50 w-full max-w-xs shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-brand-muted uppercase">Estado del Núcleo</span>
            <span className="text-[10px] bg-sky-900/30 text-sky-300 px-2 py-1 rounded border border-sky-700/50">
              v1.0 Local
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${dbStatus.includes("Activo") ? "bg-brand-success shadow-[0_0_10px_#22c55e]" : "bg-brand-muted"}`}></div>
            <span className="text-sm font-medium">{dbStatus}</span>
          </div>
        </div>
      </div>

      {/* --- ZONA INFERIOR (Interacción) --- 
          Diseñada para el pulgar (Zona Verde del iPhone) */}
      <div className="pb-safe bg-brand-surface border-t border-slate-800 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">

        {/* Botón de Acción Principal (Floating Action) */}
        <div className="px-6 -mt-8 relative z-10 mb-4">
          <Link href="/dojo" className="block w-full">
            <button className="w-full bg-brand-primary text-brand-bg font-extrabold text-lg py-5 rounded-2xl shadow-lg shadow-sky-500/20 active:scale-95 transition-all hover:brightness-110">
              ENTRAR AL DOJO
            </button>
          </Link>
        </div>

        {/* Barra de Navegación (Bottom Tab Bar) */}
        <nav className="flex justify-around items-end pb-4 h-16 text-[10px] font-bold text-brand-muted uppercase tracking-wider">
          <button className="flex flex-col items-center gap-1 text-brand-primary w-16">
            <span className="text-2xl">⚡</span>
            <span>Dojo</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-brand-text transition-colors w-16">
            <span className="text-2xl">📰</span>
            <span>News</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-brand-text transition-colors w-16">
            <span className="text-2xl">👤</span>
            <span>Perfil</span>
          </button>
        </nav>
      </div>
    </main>
  );
}