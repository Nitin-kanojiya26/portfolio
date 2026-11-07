'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const COMPONENTS = [
  { id: '00', name: 'HERO_WORKSPACE.EXE', hotkey: 'F1', path: '/SYS/HERO' },
  { id: '01', name: '01_ABOUT_ME.TXT', hotkey: 'F2', path: '/SYS/ABOUT' },
  { id: '02', name: '02_RESUME.DOC', hotkey: 'F3', path: '/SYS/RESUME' },
  { id: '03', name: '03_PROJECTS.SH', hotkey: 'F4', path: '/SYS/PROJECTS' },
  { id: '04', name: '04_SYS_SKILLS.CFG', hotkey: 'F5', path: '/SYS/SKILLS' },
  { id: '05', name: '05_CONTACT_UPLINK.TS', hotkey: 'F6', path: '/SYS/CONTACT' },
];

export default function ContextMenuLoader() {
  const [visible, setVisible] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Only play once per session, skip if user prefers reduced motion
    const booted = sessionStorage.getItem('context_menu_boot_done');
    if (booted || shouldReduceMotion) {
      return;
    }

    setVisible(true);

    // Fast-fire mounting: each component checks off in ~60ms
    const interval = setInterval(() => {
      setLoadedCount((prev) => {
        if (prev >= COMPONENTS.length) {
          clearInterval(interval);
          return COMPONENTS.length;
        }
        return prev + 1;
      });
    }, 65);

    // Automatically dismiss and reveal the first page after ~680ms
    const timer = setTimeout(() => {
      dismiss();
    }, 680);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [shouldReduceMotion]);

  const dismiss = () => {
    sessionStorage.setItem('context_menu_boot_done', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Workstation Context Initializer"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        onClick={dismiss}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] cursor-pointer select-none"
      >
        {/* Desktop Mouse Right-Click Context Menu Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 6 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm border-2 border-[var(--border-retro)] bg-[var(--surface-window)] text-[var(--text-main)] shadow-[var(--shadow-hard-lg)] overflow-hidden font-mono"
        >
          {/* Context Menu Header Strip */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b-2 border-[var(--border-retro)] bg-[var(--surface-titlebar)] text-[11px] font-pixel font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYS_MENU: MOUNT_COMPONENTS</span>
            </div>
            <span className="text-[var(--accent-color)] text-[10px]">FAST_BOOT</span>
          </div>

          {/* Context Menu Items List */}
          <div className="p-1.5 space-y-0.5 text-xs">
            {COMPONENTS.map((comp, idx) => {
              const isLoaded = idx < loadedCount;
              const isCurrent = idx === loadedCount - 1;
              return (
                <div
                  key={comp.id}
                  className={`flex items-center justify-between px-2.5 py-1.5 transition-colors ${
                    isCurrent
                      ? 'bg-[var(--accent-color)] text-[var(--accent-contrast)] font-bold'
                      : isLoaded
                      ? 'hover:bg-[var(--surface-panel)] text-[var(--text-main)]'
                      : 'text-[var(--text-muted)] opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold text-[11px]">
                      {isLoaded ? '✓' : '○'}
                    </span>
                    <span className="truncate">{comp.name}</span>
                  </div>
                  <span className="text-[10px] font-pixel opacity-70 ml-2">
                    {comp.hotkey}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer Status Bar */}
          <div className="flex items-center justify-between px-3 py-1.5 border-t border-[var(--border-retro)] bg-[var(--surface-titlebar)] text-[10px] text-[var(--text-muted)]">
            <span>
              {loadedCount >= COMPONENTS.length
                ? 'ALL COMPONENTS READY'
                : `LOADING: [${loadedCount}/${COMPONENTS.length}]`}
            </span>
            <span className="font-pixel text-[var(--accent-color)]">
              CLICK ANYWHERE TO SKIP
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

