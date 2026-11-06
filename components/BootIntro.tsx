'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function BootIntro() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if user already saw the boot sequence this session or prefers reduced motion
    const alreadyBooted = sessionStorage.getItem('retro_boot_done');
    if (alreadyBooted || shouldReduceMotion) {
      return;
    }

    setVisible(true);

    const bootSequence = [
      { text: 'BIOS VERSION 1.0.8 (1984)', delay: 100 },
      { text: 'CHECKING 640K CONVENTIONAL MEMORY... OK', delay: 350 },
      { text: 'INITIALIZING 1-BIT DITHER DISPLAY...', delay: 700 },
      { text: 'MOUNTING FILE SYSTEM: /NITIN_KANOJIYA', delay: 1050 },
      { text: 'EXECUTING STARTUP.EXE...', delay: 1400 },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    bootSequence.forEach((item) => {
      const t = setTimeout(() => {
        setLogs((prev) => [...prev, item.text]);
      }, item.delay);
      timeouts.push(t);
    });

    // Stepped progress bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    // Complete boot and fade out
    const finishTimeout = setTimeout(() => {
      dismiss();
    }, 2100);
    timeouts.push(finishTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [shouldReduceMotion]);

  const dismiss = () => {
    sessionStorage.setItem('retro_boot_done', 'true');
    setVisible(false);
  };

  // Keyboard escape listener to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && visible) {
        dismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  if (!visible) return null;

  // Calculate solid block count for ASCII progress bar (total 20 chars)
  const filledBlocks = Math.round((progress / 100) * 20);
  const emptyBlocks = 20 - filledBlocks;
  const progressBarString = `[${'█'.repeat(filledBlocks)}${'-'.repeat(emptyBlocks)}] ${progress}%`;

  return (
    <AnimatePresence>
      <motion.aside
        aria-label="System Boot Sequence"
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-black text-[#00e5ff] font-pixel p-6 sm:p-12 flex flex-col justify-between select-none"
      >
        {/* Top Header & Skip Button */}
        <div className="flex items-center justify-between border-b border-[#00e5ff]/40 pb-3">
          <span className="text-sm tracking-widest uppercase">NITIN_OS BOOT SEQUENCE</span>
          <button
            type="button"
            onClick={dismiss}
            className="px-3 py-1 border border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black font-pixel text-xs tracking-wider transition-colors cursor-pointer"
          >
            SKIP BOOT [ESC]
          </button>
        </div>

        {/* Middle: Terminal Logs */}
        <div className="my-auto max-w-2xl font-mono text-xs sm:text-sm space-y-2 text-[#00e5ff]">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-gray-500">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 text-white mt-4 font-pixel text-sm sm:text-base">
            <span className="text-[#00e5ff]">&gt;</span>
            <span className="tracking-widest">{progressBarString}</span>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-[10px] sm:text-xs text-gray-500 font-mono flex items-center justify-between border-t border-[#00e5ff]/20 pt-3">
          <span>PRESS ESC TO ABORT</span>
          <span>MEMORY TEST OK</span>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

