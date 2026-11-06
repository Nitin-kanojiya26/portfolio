'use client';

import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t-2 border-[var(--border-retro)] bg-[var(--surface-titlebar)] text-[var(--text-main)] py-3 px-3 sm:px-6 select-none font-pixel text-xs mt-6 shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Left Status */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[var(--accent-color)] font-bold">■</span>
          <span className="tracking-wider">NITIN KANOJIYA • BACKEND DEVELOPER | AI ENGINEERING</span>
        </div>

        {/* Center Copyright */}
        <div className="font-mono text-[10px] sm:text-xs text-[var(--text-muted)]">
          © 2026 Nitin Kanojiya. Built with Next.js
        </div>

        {/* Right Action */}
        <div>
          <button
            type="button"
            onClick={scrollToTop}
            className="retro-btn px-3 py-1.5 text-[10px] font-pixel cursor-pointer tracking-wider hover:bg-[var(--accent-color)] hover:text-[var(--accent-contrast)]"
          >
            [▲ RETURN TO TOP]
          </button>
        </div>

      </div>
    </footer>
  );
}
