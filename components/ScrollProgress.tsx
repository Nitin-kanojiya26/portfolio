'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-10 left-0 right-0 z-40 pointer-events-none select-none">
      {/* 2px Slim Phosphor Progress Bar */}
      <div className="w-full h-[2px] bg-[var(--border-subtle)]">
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
          className="h-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]"
        />
      </div>

      {/* Floating Retro Scroll Percentage Telemetry in Bottom-Right */}
      <div className="fixed bottom-3 right-3 z-40 hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[var(--surface-titlebar)] border border-[var(--border-retro)] text-[10px] font-mono text-[var(--accent-color)] shadow-[var(--shadow-hard-sm)]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>SCROLL:</span>
        <strong className="text-[var(--text-main)] font-pixel text-xs">{percent}%</strong>
      </div>
    </div>
  );
}

