'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import RetroComputerCanvas from './RetroComputerCanvas';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const fullTagline = 'Backend Developer | AI Engineering';
  const [displayedTagline, setDisplayedTagline] = useState(
    shouldReduceMotion ? fullTagline : ''
  );
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typewriter effect for role tagline
  useEffect(() => {
    if (shouldReduceMotion) return;

    let index = 0;
    const typingInterval = setInterval(() => {
      index++;
      setDisplayedTagline(fullTagline.slice(0, index));
      if (index >= fullTagline.length) {
        clearInterval(typingInterval);
      }
    }, 40);

    // Blinking terminal cursor
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 450);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      id="home"
      className="relative w-full flex flex-col justify-center items-center pt-2 sm:pt-4 pb-2 sm:pb-3 px-2 sm:px-4 md:px-8 bg-[var(--bg-canvas)] overflow-hidden"
    >
      {/* Edge-to-Edge Retro CRT Workstation Bezel (Covers Full Screen) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 36, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1400px] my-auto retro-window border-2 sm:border-4 border-[var(--border-retro)] bg-[var(--surface-window)] shadow-[var(--shadow-hard-lg)] overflow-hidden"
      >
        
        {/* Terminal Window Header Bar */}
        <header className="retro-titlebar px-3 sm:px-4 py-2 flex items-center justify-between border-b border-[var(--border-retro)] bg-[var(--surface-titlebar)] text-xs font-pixel select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 border border-[var(--border-retro)] bg-[var(--surface-window)] inline-flex items-center justify-center text-[8px]">
              ×
            </span>
            <span className="w-3 h-3 border border-[var(--border-retro)] bg-[var(--surface-window)] inline-flex items-center justify-center text-[8px]">
              +
            </span>
            <span className="font-bold tracking-wider text-[var(--text-main)] ml-1">
              NITIN WORKSTATION • 1984
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ONLINE • READY</span>
            </div>
          </div>
        </header>

        {/* Workstation Screen: Two Column Grid (Desktop) / Stacked (Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 items-center">
          
          {/* Left Column: Big Interactive 3D Animated Retro Computer */}
          <div className="lg:col-span-6 w-full flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="w-full aspect-square max-w-[310px] sm:max-w-[420px] lg:max-w-[480px] border-2 border-[var(--border-retro)] bg-black p-1.5 sm:p-2 relative shadow-[inset_0_0_25px_rgba(0,0,0,0.85)]">
              {/* Scanline overlay for the monitor */}
              <div className="absolute inset-0 dither-pattern opacity-25 pointer-events-none" />
              
              {/* Header inside screen */}
              <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between text-[9px] sm:text-[10px] font-pixel text-[var(--neutral-eggshell)] z-10 pointer-events-none">
                <span>3D VECTOR DISPLAY</span>
                <span>MODEL: RETRO_PC_5150</span>
              </div>

              {/* The Live Interactive 3D Wireframe Computer */}
              <RetroComputerCanvas />
            </div>
          </div>

          {/* Right Column: Hero Typography, Story & Mechanical Action Buttons */}
          <div className="lg:col-span-6 flex flex-col items-start gap-3 sm:gap-4 order-2 lg:order-1">
            
            {/* Huge Name Heading */}
            <div className="flex flex-col gap-1 w-full">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-pixel font-bold tracking-tight text-[var(--text-main)] leading-none break-words">
                NITIN KANOJIYA
              </h1>

              {/* Animated Typewriter Role Prompt */}
              <div className="flex items-center text-sm sm:text-xl md:text-2xl font-mono text-[var(--accent-color)] font-bold mt-1">
                <span className="text-[var(--text-muted)] mr-2">&gt;</span>
                <span>{displayedTagline}</span>
                <span
                  className={`inline-block w-2.5 h-5 bg-[var(--accent-color)] ml-1 ${
                    cursorVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Narrative Bio - Concise & ATS Friendly */}
            <p className="text-[var(--text-muted)] text-xs sm:text-sm md:text-base leading-relaxed font-sans font-normal border-l-2 border-[var(--border-retro)] pl-3 sm:pl-4 my-1 max-w-xl">
              <strong>B.Tech Computer Engineering</strong> student at <strong>Dharmsinh Desai University</strong> with strong foundations in Data Structures, Algorithms, backend architecture, and full-stack software development.
            </p>

            {/* Quick Specs Metric Ribbon (Clean & Verified) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full text-[11px] sm:text-xs font-mono">
              <div className="p-2 border border-[var(--border-retro)] bg-[var(--surface-titlebar)]">
                <span className="text-[var(--text-muted)] block text-[9px]">DEGREE</span>
                <strong className="text-[var(--text-main)]">B.Tech Comp Engg</strong>
              </div>
              <div className="p-2 border border-[var(--border-retro)] bg-[var(--surface-titlebar)]">
                <span className="text-[var(--text-muted)] block text-[9px]">INSTITUTION</span>
                <strong className="text-[var(--text-main)]">DDU Nadiad</strong>
              </div>
              <div className="p-2 border border-[var(--border-retro)] bg-[var(--surface-titlebar)]">
                <span className="text-[var(--text-muted)] block text-[9px]">LOCATION</span>
                <strong className="text-[var(--text-main)]">Vadodara, IN</strong>
              </div>
            </div>

            {/* Mechanical Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 w-full">
              <a
                href="#projects"
                className="retro-btn px-4 sm:px-5 py-2.5 font-pixel text-xs sm:text-sm tracking-wider uppercase font-bold flex items-center gap-2"
              >
                <span>[▶]</span>
                <span>PROJECTS</span>
              </a>

              <a
                href="/Nitin_Kanojiya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn px-4 sm:px-5 py-2.5 font-pixel text-xs sm:text-sm tracking-wider uppercase font-bold flex items-center gap-2"
              >
                <span>[↓]</span>
                <span>RESUME PDF</span>
              </a>

              <a
                href="#contact"
                className="retro-btn px-4 sm:px-5 py-2.5 font-pixel text-xs sm:text-sm tracking-wider uppercase font-bold flex items-center gap-2 text-[var(--accent-color)]"
              >
                <span>[✉]</span>
                <span>CONTACT</span>
              </a>
            </div>

            {/* Animated Scroll Down Prompt */}
            <div className="pt-2 w-full flex items-center justify-between border-t border-[var(--border-retro)] mt-1">
              <a
                href="#about"
                className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-color)] hover:text-[var(--text-main)] transition-colors group cursor-pointer"
              >
                <span className="w-5 h-5 border border-[var(--border-retro)] bg-[var(--surface-titlebar)] flex items-center justify-center text-[10px] text-[var(--accent-color)] group-hover:border-[var(--accent-color)] shadow-[0_0_8px_var(--accent-glow)] animate-bounce">
                  ▼
                </span>
                <span className="tracking-wider uppercase font-bold text-xs">
                  SCROLL DOWN TO EXPLORE
                </span>
              </a>
            </div>

          </div>

        </div>

        {/* Workstation Screen Bottom Status Bar */}
        <footer className="border-t border-[var(--border-retro)] bg-[var(--surface-titlebar)] px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
          <span>HOST: NITIN KANOJIYA • B.TECH COMPUTER ENGINEERING</span>
          <span className="hidden sm:inline">INTERACTION: DRAG TO ROTATE 3D WIREFRAME</span>
          <span className="text-emerald-400 font-bold">WORKSTATION: ONLINE</span>
        </footer>

      </motion.div>
    </section>
  );
}
