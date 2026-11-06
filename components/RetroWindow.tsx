'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RetroWindowProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  badge?: string;
  statusText?: string;
  pathText?: string;
  collapsible?: boolean;
}

export default function RetroWindow({
  id,
  title,
  children,
  className = '',
  badge = 'ACTIVE',
  statusText = 'STATUS: 200 • READY',
  pathText,
  collapsible = true,
}: RetroWindowProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      id={id}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 48, scale: 0.97 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
      className={`retro-window w-full rounded-none overflow-hidden my-4 sm:my-6 border-2 border-[var(--border-retro)] bg-[var(--surface-window)] shadow-[var(--shadow-hard-lg)] relative group ${className} ${
        isMaximized
          ? 'fixed inset-2 sm:inset-4 z-50 my-0 overflow-y-auto max-h-[96vh] shadow-[0_0_50px_rgba(0,0,0,0.9)]'
          : ''
      }`}
    >
      {/* Decorative Technical Corner Crosshairs */}
      <span className="absolute top-1.5 left-1.5 text-[9px] font-mono text-[var(--border-highlight)] select-none pointer-events-none z-20">
        +
      </span>
      <span className="absolute top-1.5 right-1.5 text-[9px] font-mono text-[var(--border-highlight)] select-none pointer-events-none z-20">
        +
      </span>
      <span className="absolute bottom-1.5 left-1.5 text-[9px] font-mono text-[var(--border-highlight)] select-none pointer-events-none z-20">
        +
      </span>
      <span className="absolute bottom-1.5 right-1.5 text-[9px] font-mono text-[var(--border-highlight)] select-none pointer-events-none z-20">
        +
      </span>

      {/* Refined Workstation Titlebar */}
      <header className="retro-titlebar px-3 sm:px-5 py-2.5 flex items-center justify-between select-none relative border-b-2 border-[var(--border-retro)] bg-[var(--surface-titlebar)]">
        {/* Left: Window Operation Buttons */}
        <div className="flex items-center gap-2 z-10">
          <button
            type="button"
            aria-label="Close window"
            className="w-4 h-4 sm:w-5 sm:h-5 border border-[var(--border-retro)] bg-[var(--surface-panel)] flex items-center justify-center text-[10px] sm:text-xs font-pixel leading-none hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            ×
          </button>
          {collapsible && (
            <button
              type="button"
              aria-label={isCollapsed ? 'Expand window' : 'Minimize window'}
              className="w-4 h-4 sm:w-5 sm:h-5 border border-[var(--border-retro)] bg-[var(--surface-panel)] flex items-center justify-center text-[10px] sm:text-xs font-pixel leading-none hover:bg-[var(--accent-color)] hover:text-[var(--accent-contrast)] transition-colors cursor-pointer"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? '+' : '−'}
            </button>
          )}
          <button
            type="button"
            aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
            className="w-4 h-4 sm:w-5 sm:h-5 border border-[var(--border-retro)] bg-[var(--surface-panel)] flex items-center justify-center text-[10px] sm:text-xs font-pixel leading-none hover:bg-[var(--accent-color)] hover:text-[var(--accent-contrast)] transition-colors cursor-pointer"
            onClick={() => setIsMaximized(!isMaximized)}
          >
            {isMaximized ? '⤡' : '⤢'}
          </button>
        </div>

        {/* Center: Striped background with Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-16 sm:px-32">
          <div className="w-full h-[6px] titlebar-stripes hidden md:block" />
          <h2 className="px-3 bg-[var(--surface-titlebar)] text-xs sm:text-sm font-pixel tracking-widest uppercase font-bold text-[var(--text-main)] truncate max-w-[85%] z-10">
            {title}
          </h2>
          <div className="w-full h-[6px] titlebar-stripes hidden md:block" />
        </div>

        {/* Right: Badge / Indicator */}
        <div className="flex items-center gap-2 z-10 ml-auto">
          {badge && (
            <span className="hidden xs:inline-block px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono border border-[var(--border-retro)] bg-[var(--surface-panel)] text-[var(--accent-color)] font-bold">
              {badge}
            </span>
          )}
          <span className="w-2.5 h-2.5 rounded-none bg-[var(--accent-color)] animate-pulse shadow-[0_0_8px_var(--accent-color)]" />
        </div>
      </header>

      {/* Window Body Container */}
      {!isCollapsed && (
        <div className="p-4 sm:p-7 md:p-10 text-[var(--text-main)] transition-all">
          {children}
        </div>
      )}

      {/* Bottom Workstation Telemetry Strip */}
      <footer className="border-t-2 border-[var(--border-retro)] bg-[var(--surface-titlebar)] px-3 sm:px-5 py-2 flex flex-wrap items-center justify-between text-[10px] font-mono text-[var(--text-muted)] select-none">
        <span className="truncate max-w-[55%]">
          {pathText || `DIR: /WORKSTATION/${title.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-[var(--accent-color)] font-bold">{statusText}</span>
        </div>
      </footer>
    </motion.article>
  );
}
