'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import {
  Home,
  User,
  FileText,
  FolderGit2,
  Cpu,
  Mail,
  Sun,
  Moon,
} from 'lucide-react';

/**
 * Custom Retro-Futuristic 'N' Monogram Insignia
 * Combines 8-bit stepped pixel geometry, 3D embossed pillar bevels,
 * and an active phosphor green micro-LED apex node.
 */
function RetroNLogo() {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <svg
        viewBox="0 0 28 28"
        className="w-full h-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_0_8px_var(--accent-quiet)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Subtle decorative corner grid pixel nodes */}
        <rect x="2" y="2" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="24" y="2" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="2" y="24" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="24" y="24" width="2" height="2" fill="currentColor" opacity="0.3" />

        {/* Left vertical column (Beveled retro block) */}
        <path
          d="M5 4H10V24H5V4Z"
          fill="currentColor"
          className="text-[var(--text-main)]"
        />
        <path d="M5 4H10V6H5V4Z" fill="white" opacity="0.5" />

        {/* Stepped Pixel Diagonal Bridge */}
        <path
          d="M10 7H13V11H16V15H19V20H22V24H18V19H15V15H12V11H10V7Z"
          fill="currentColor"
          className="text-[var(--accent-quiet-text)] dark:text-[var(--accent-quiet)]"
        />

        {/* Right vertical column */}
        <path
          d="M18 4H23V24H18V4Z"
          fill="currentColor"
          className="text-[var(--text-main)]"
        />
        <path d="M18 4H23V6H18V4Z" fill="white" opacity="0.5" />

        {/* Live phosphor green micro-LED dot at apex */}
        <rect
          x="5"
          y="4"
          width="3"
          height="3"
          fill="#10B981"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
}

/**
 * iOS-style Vertical Light / Dark Mode Segmented Switch with Retro Hardware Styling
 */
function RetroIOSVerticalThemeSwitch({
  theme,
  toggleTheme,
}: {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleTheme();
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="group relative w-[26px] h-[48px] rounded-full p-[2px] bg-[var(--surface-window)]/90 dark:bg-black/60 border-2 border-[var(--border-retro)] hover:border-[var(--accent-quiet)] flex flex-col items-center justify-between cursor-pointer active:scale-95 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)]"
    >
      {/* Sliding Tactile Thumb (Vertical) */}
      <motion.div
        className="absolute left-[2px] right-[2px] h-[20px] rounded-full bg-[var(--accent-quiet-bg)] dark:bg-[var(--accent-quiet-bg)]/80 border border-[var(--accent-quiet)] shadow-[0_2px_4px_rgba(0,0,0,0.25)] pointer-events-none"
        animate={{ top: theme === 'dark' ? '22px' : '2px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      />

      {/* Top Slot: Light Mode (Sun) */}
      <div className="w-full h-[20px] flex items-center justify-center relative z-10">
        <Sun
          className={`w-3.5 h-3.5 transition-all duration-200 ${
            theme === 'light'
              ? 'text-amber-500 scale-100 drop-shadow-[0_0_6px_rgba(245,158,11,0.7)]'
              : 'text-[var(--text-muted)] opacity-40 scale-85'
          }`}
        />
      </div>

      {/* Bottom Slot: Dark Mode (Moon) */}
      <div className="w-full h-[20px] flex items-center justify-center relative z-10">
        <Moon
          className={`w-3.5 h-3.5 transition-all duration-200 ${
            theme === 'dark'
              ? 'text-sky-400 scale-100 drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]'
              : 'text-[var(--text-muted)] opacity-40 scale-85'
          }`}
        />
      </div>

      {/* Hover Tooltip */}
      <span className="pointer-events-none absolute left-12 px-2.5 py-1.5 rounded-xl bg-[var(--surface-titlebar)]/95 dark:bg-[#18181c]/95 border-2 border-[var(--border-retro)] shadow-[3px_3px_0px_rgba(0,0,0,0.25)] text-[var(--text-main)] font-pixel text-xs tracking-wider whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center gap-1.5">
        <span className="text-[var(--accent-quiet-text)] dark:text-[var(--accent-quiet)] font-bold">&gt;</span>
        <span>THEME: {theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
      </span>
    </button>
  );
}

/**
 * Reusable Small Torch Light Cone SVG (White Light with Icy Light-Blue Hue, No Dotted Line)
 */
function HologramBeamSVG() {
  return (
    <svg
      className="w-12 sm:w-14 h-11 sm:h-12 overflow-visible pointer-events-none"
      viewBox="0 0 54 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft Gaussian Blur for Light Beam */}
        <filter
          id="whiteIceTorchBlur"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Predominantly White Core with Icy Light-Blue Sheen - Translucent so icon stands out */}
        <linearGradient
          id="whiteIceBeamConeGrad"
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="28%" stopColor="#e0f2fe" stopOpacity="0.4" />
          <stop offset="65%" stopColor="#bae6fd" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
        </linearGradient>

        {/* Boundary Rays: Pure White to Icy Light-Blue */}
        <linearGradient
          id="whiteIceBeamRayGrad"
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#bae6fd" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Light Cone Polygon and Rays (\ /) with Soft Blur */}
      <g filter="url(#whiteIceTorchBlur)">
        <polygon
          points="0,22 48,4 48,44 0,26"
          fill="url(#whiteIceBeamConeGrad)"
        />
        <line
          x1="0"
          y1="22"
          x2="48"
          y2="4"
          stroke="url(#whiteIceBeamRayGrad)"
          strokeWidth="1.8"
        />
        <line
          x1="0"
          y1="26"
          x2="48"
          y2="44"
          stroke="url(#whiteIceBeamRayGrad)"
          strokeWidth="1.8"
        />
      </g>

      {/* Luminous Torch Emitter Node */}
      <circle cx="0" cy="24" r="2.5" fill="#ffffff" />
      <circle cx="0" cy="24" r="1.2" fill="#bae6fd" />
    </svg>
  );
}

export default function RetroMenuBar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTorchVisible, setIsTorchVisible] = useState<boolean>(false);
  const [isThemeHoloVisible, setIsThemeHoloVisible] = useState<boolean>(false);

  const torchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const themeHoloTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prevSectionRef = useRef<string>('home');

  // Triple-tap detection refs
  const tapCountRef = useRef<number>(0);
  const tapResetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const singleTapTimerRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home', icon: Home },
    { label: 'ABOUT', href: '#about', id: 'about', icon: User },
    { label: 'RESUME', href: '#resume', id: 'resume', icon: FileText },
    { label: 'PROJECTS', href: '#projects', id: 'projects', icon: FolderGit2 },
    { label: 'SKILLS', href: '#skills', id: 'skills', icon: Cpu },
    { label: 'CONTACT', href: '#contact', id: 'contact', icon: Mail },
  ];

  // Auto-retracting Section Hologram Toggle (on scroll, pops out momentarily and retracts)
  const triggerSectionHologram = () => {
    setIsTorchVisible(true);
    if (torchTimerRef.current) {
      clearTimeout(torchTimerRef.current);
    }
    // Retracts automatically after 1.4s
    torchTimerRef.current = setTimeout(() => {
      setIsTorchVisible(false);
    }, 1400);
  };

  // Show Theme Hologram momentarily (only on 3-tap action)
  const showThemeHologramMomentarily = () => {
    setIsThemeHoloVisible(true);
    if (themeHoloTimerRef.current) {
      clearTimeout(themeHoloTimerRef.current);
    }
    // Retracts automatically after 1.5s
    themeHoloTimerRef.current = setTimeout(() => {
      setIsThemeHoloVisible(false);
    }, 1500);
  };

  // Handle tap / click on the line: 1 tap = open dock, 2 taps = convert light/dark & show theme hologram
  const handleLineTap = () => {
    tapCountRef.current += 1;

    // Clear reset timer
    if (tapResetTimerRef.current) {
      clearTimeout(tapResetTimerRef.current);
    }

    if (tapCountRef.current >= 2) {
      // ─── DOUBLE TAP DETECTED: Convert Light to Dark & Show Theme Hologram! ───
      if (singleTapTimerRef.current) {
        clearTimeout(singleTapTimerRef.current);
      }
      tapCountRef.current = 0;

      // Toggle Theme
      toggleTheme();

      // Show the theme hologram at that time!
      showThemeHologramMomentarily();
      return;
    }

    // Reset tap counter if no subsequent tap within 350ms
    tapResetTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 350);

    // If 1st tap, queue opening the dock after 250ms (cancelled if 2nd tap follows)
    if (tapCountRef.current === 1) {
      if (singleTapTimerRef.current) {
        clearTimeout(singleTapTimerRef.current);
      }
      singleTapTimerRef.current = setTimeout(() => {
        if (tapCountRef.current < 2) {
          setIsOpen(true);
          tapCountRef.current = 0;
        }
      }, 250);
    }
  };

  // Active Section Scroll Spy (Shows ONLY Section Hologram on scroll, NOT Theme Hologram)
  useEffect(() => {
    const sectionIds = ['home', 'about', 'resume', 'projects', 'skills', 'contact'];

    const handleScroll = () => {
      triggerSectionHologram();

      const scrollPos = window.scrollY + 250;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (torchTimerRef.current) clearTimeout(torchTimerRef.current);
      if (themeHoloTimerRef.current) clearTimeout(themeHoloTimerRef.current);
      if (tapResetTimerRef.current) clearTimeout(tapResetTimerRef.current);
      if (singleTapTimerRef.current) clearTimeout(singleTapTimerRef.current);
    };
  }, []);

  // When activeSection changes (enters new section), trigger the section hologram toggle
  useEffect(() => {
    if (prevSectionRef.current !== activeSection) {
      prevSectionRef.current = activeSection;
      triggerSectionHologram();
    }
  }, [activeSection]);

  const activeIndex = navLinks.findIndex((l) => l.id === activeSection);
  const validIndex = activeIndex >= 0 ? activeIndex : 0;
  const activeLink = navLinks[validIndex];
  const ActiveIcon = activeLink.icon;

  // Compute vertical position along the line for the active section hologram (HOME: ~12% -> CONTACT: ~76%)
  const verticalPercent = (validIndex / (navLinks.length - 1)) * 64 + 12;

  // Section hologram shows on scroll/hover when dock is collapsed
  const showSectionHolo = isTorchVisible && !isOpen;

  // Theme hologram shows ONLY when triggered by 3-tap (or click) when dock is collapsed
  const showThemeHolo = isThemeHoloVisible && !isOpen;

  return (
    <>
      {/* Backdrop: clicking outside collapses the dock back into the thin line WITHOUT blurring the background */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/10 dark:bg-black/30"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        aria-label="Anime Retro Navigation"
        className="fixed left-2 sm:left-3 top-1/2 -translate-y-1/2 z-50 select-none"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ─── THIN LINE STATE (DEFAULT FOR BOTH LAPTOP & PHONE) ─── */
            <motion.div
              key="thin-line-container"
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.8 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="relative flex items-center h-52 sm:h-64"
            >
              {/* Clickable Touch / Tap Target Container (1 Tap = Open Dock, 2 Taps = Toggle Theme) */}
              <button
                type="button"
                onClick={handleLineTap}
                onMouseEnter={triggerSectionHologram}
                aria-label="Navigation Line (1 Tap: Open, 2 Taps: Toggle Theme)"
                title="1 Tap: Open Navigation | 2 Taps: Toggle Light/Dark Mode"
                className="group relative w-7 sm:w-8 h-full flex items-center justify-center cursor-pointer focus:outline-none"
              >
                {/* Pure Clean Long Phosphor Cyber Beam Line */}
                <div className="relative w-[2.5px] sm:w-[3px] h-full rounded-full bg-[var(--accent-quiet)] shadow-[0_0_8px_var(--accent-quiet),0_0_18px_var(--accent-quiet)] group-hover:shadow-[0_0_14px_var(--accent-quiet),0_0_24px_var(--accent-quiet)] group-hover:w-[3.5px] transition-all duration-200 overflow-hidden">
                  {/* Fluid Gliding Cyber Energy Packet - Brilliant White Pulse Visible in Both Light & Dark Mode */}
                  <motion.div
                    animate={{ y: ['-100%', '350%'] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-full h-14 bg-gradient-to-b from-transparent via-white to-transparent opacity-95 drop-shadow-[0_0_6px_#ffffff] shadow-[0_0_8px_#ffffff]"
                  />
                </div>

                {/* Subtle Active Focal Indicator Pip that tracks the section vertically on the line */}
                <motion.div
                  animate={{ top: `${verticalPercent}%` }}
                  transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                  className="absolute w-2 h-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_14px_#38bdf8] pointer-events-none"
                />

                {/* Subtle Pulsing Aura on Hover / Active */}
                <span className="absolute inset-0 rounded-full bg-[var(--accent-quiet)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
              </button>

              {/* ─── 1. ACTIVE SECTION HOLOGRAM (SHOWS ON SCROLL, GLIDES VERTICALLY DOWN THE LINE) ─── */}
              <AnimatePresence>
                {showSectionHolo && (
                  <motion.div
                    key="section-hologram-wrapper"
                    initial={{ opacity: 0, scale: 0.6, x: -8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      top: `${verticalPercent}%`,
                    }}
                    exit={{ opacity: 0, scale: 0.5, x: -10 }}
                    transition={{
                      top: { type: 'spring', stiffness: 320, damping: 26 },
                      opacity: { duration: 0.18 },
                      scale: { type: 'spring', stiffness: 440, damping: 24 },
                    }}
                    onClick={() => setIsOpen(true)}
                    className="absolute left-4 sm:left-5 -translate-y-1/2 flex items-center select-none z-50 pointer-events-auto cursor-pointer"
                    title="Click to open navigation"
                  >
                    <div className="relative flex items-center">
                      {/* Compact White-Type Hologram Light Beam with Icy Light-Blue Hue */}
                      <HologramBeamSVG />

                      {/* Pure Floating Skeleton Section Icon Bathed Inside the Light Beam */}
                      <div className="absolute left-7 sm:left-8 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeSection}
                            initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.3, opacity: 0, rotate: 15 }}
                            transition={{
                              type: 'spring',
                              stiffness: 480,
                              damping: 22,
                            }}
                            className="flex items-center justify-center p-0.5"
                          >
                            <motion.div
                              animate={{
                                opacity: [0.92, 1, 0.94, 1, 0.96],
                                scale: [1, 1.02, 1],
                              }}
                              transition={{
                                duration: 1.6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className="flex items-center justify-center text-[#0369a1] dark:text-[#38bdf8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
                            >
                              <ActiveIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.4] text-[#0369a1] dark:text-[#38bdf8] dark:drop-shadow-[0_0_8px_#38bdf8]" />
                            </motion.div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─── 2. THEME HOLOGRAM (APPEARS ONLY ON 2-TAP TO CONVERT LIGHT/DARK MODE) ─── */}
              <AnimatePresence>
                {showThemeHolo && (
                  <motion.div
                    key="theme-hologram-wrapper"
                    initial={{ opacity: 0, scale: 0.6, x: -8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                    }}
                    exit={{ opacity: 0, scale: 0.5, x: -10 }}
                    transition={{
                      opacity: { duration: 0.18 },
                      scale: { type: 'spring', stiffness: 440, damping: 24 },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTheme();
                    }}
                    className="absolute left-4 sm:left-5 bottom-1 sm:bottom-2 flex items-center select-none z-50 pointer-events-auto cursor-pointer"
                    title={`Theme converted! Click to switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                  >
                    <div className="relative flex items-center group">
                      {/* Independent White-Type Hologram Light Beam for Theme Toggle */}
                      <HologramBeamSVG />

                      {/* Theme Skeleton Icon (Sun in Dark Mode, Moon in Light Mode - A Little Darker for Contrast) */}
                      <div className="absolute left-7 sm:left-8 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 rounded-full group-hover:scale-125 active:scale-90 transition-transform">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={theme}
                            initial={{ scale: 0.3, opacity: 0, rotate: -25 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.3, opacity: 0, rotate: 25 }}
                            transition={{
                              type: 'spring',
                              stiffness: 480,
                              damping: 22,
                            }}
                            className="flex items-center justify-center"
                          >
                            {theme === 'dark' ? (
                              <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] text-amber-500 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] drop-shadow-[0_0_6px_rgba(245,158,11,0.85)]" />
                            ) : (
                              <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] text-sky-600 dark:text-sky-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] drop-shadow-[0_0_6px_rgba(2,132,199,0.7)]" />
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* ─── FULL EXPANDED DOCK: CLEAN RETRO CAPSULE SHAPE (NO EXTRA CIRCLES UP OR DOWN) ─── */
            <motion.div
              key="expanded-dock-container"
              initial={{ opacity: 0, scale: 0.92, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.92, x: -10 }}
              transition={{
                type: 'spring',
                stiffness: 340,
                damping: 26,
                mass: 0.7,
              }}
              className="relative flex flex-col items-center py-2 sm:py-2.5 px-1 sm:px-1.5 w-[50px] sm:w-[54px] rounded-full bg-[var(--surface-titlebar)]/95 dark:bg-[#111114]/95 border-2 border-[var(--border-retro)] shadow-[4px_4px_0px_rgba(0,0,0,0.22)] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.7),0_12px_40px_rgba(0,0,0,0.5)] gap-1"
            >
              {/* Custom Retro 3D Monogram Insignia Squircle (Clean Top Apex) */}
              <a
                href="#home"
                title="Nitin · Home"
                onClick={() => setIsOpen(false)}
                className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[var(--surface-window)]/90 dark:bg-white/5 border-2 border-[var(--border-retro)] hover:border-[var(--accent-quiet)] flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <RetroNLogo />

                {/* Tooltip */}
                <span className="pointer-events-none absolute left-14 px-2.5 py-1.5 rounded-xl bg-[var(--surface-titlebar)]/95 dark:bg-[#18181c]/95 border-2 border-[var(--border-retro)] shadow-[3px_3px_0px_rgba(0,0,0,0.25)] text-[var(--text-main)] font-pixel text-xs tracking-wider whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center gap-1.5">
                  <span className="text-[var(--accent-quiet-text)] dark:text-[var(--accent-quiet)] font-bold">&gt;</span>
                  <span>NITIN · HOME</span>
                </span>
              </a>

              {/* Hardware Tick Divider */}
              <div className="w-5 h-[2px] bg-[var(--border-retro)] opacity-50 my-0.5" />

              {/* Navigation Items (Clean Compact Capsule Alignment) */}
              <nav className="flex flex-col items-center gap-1" aria-label="Main Navigation">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isCurrent = activeSection === link.id;

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      aria-label={link.label}
                      onClick={() => setIsOpen(false)}
                      className={`group relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-90 ${
                        isCurrent
                          ? 'text-[var(--accent-quiet-text)] dark:text-white'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                      }`}
                    >
                      {/* Active Spring Capsule Background */}
                      {isCurrent && (
                        <motion.div
                          layoutId="retro-dock-active-pill"
                          className="absolute inset-0 rounded-xl sm:rounded-2xl bg-[var(--accent-quiet-bg)] dark:bg-[var(--accent-quiet-bg)]/40 border-2 border-[var(--accent-quiet)] shadow-sm"
                          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                        />
                      )}

                      {/* Left Active Phosphor Accent Pip */}
                      {isCurrent && (
                        <span className="absolute -left-1.5 w-1 h-4 rounded-r-full bg-[var(--accent-quiet)] shadow-[0_0_8px_var(--accent-quiet)]" />
                      )}

                      <Icon className="relative z-10 w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />

                      {/* Tooltip */}
                      <span className="pointer-events-none absolute left-14 px-2.5 py-1.5 rounded-xl bg-[var(--surface-titlebar)]/95 dark:bg-[#18181c]/95 border-2 border-[var(--border-retro)] shadow-[3px_3px_0px_rgba(0,0,0,0.25)] text-[var(--text-main)] font-pixel text-xs tracking-wider whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center gap-1.5">
                        <span className="text-[var(--accent-quiet-text)] dark:text-[var(--accent-quiet)] font-bold">&gt;</span>
                        <span>{link.label}</span>
                      </span>
                    </a>
                  );
                })}
              </nav>

              {/* Hardware Tick Divider */}
              <div className="w-5 h-[2px] bg-[var(--border-retro)] opacity-50 my-0.5" />

              {/* Bottom Control: Vertical iOS Light/Dark Mode Switch (Clean Bottom Base) */}
              <div className="flex flex-col items-center pt-0.5 pb-0.5">
                <RetroIOSVerticalThemeSwitch theme={theme} toggleTheme={toggleTheme} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
}
