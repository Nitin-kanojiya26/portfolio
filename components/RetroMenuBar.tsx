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
      <span className="pointer-events-none absolute left-13 px-3 py-1.5 rounded-xl bg-[var(--surface-titlebar)]/95 dark:bg-[#18181c]/95 backdrop-blur-xl border-2 border-[var(--border-retro)] shadow-[3px_3px_0px_rgba(0,0,0,0.25)] text-[var(--text-main)] font-pixel text-xs tracking-wider whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center gap-1.5">
        <span className="text-[var(--accent-quiet-text)] dark:text-[var(--accent-quiet)] font-bold">&gt;</span>
        <span>THEME: {theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
      </span>
    </button>
  );
}

export default function RetroMenuBar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  // Track if on desktop (for phone it should only be the thin line)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // For phone it should ONLY be thin line (never expands into wide dock on phone)
  const isExpanded = isOpen && isDesktop;

  // Active Section Scroll Spy
  useEffect(() => {
    const sectionIds = ['home', 'about', 'resume', 'projects', 'skills', 'contact'];

    const handleScroll = () => {
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home', icon: Home },
    { label: 'ABOUT', href: '#about', id: 'about', icon: User },
    { label: 'RESUME', href: '#resume', id: 'resume', icon: FileText },
    { label: 'PROJECTS', href: '#projects', id: 'projects', icon: FolderGit2 },
    { label: 'SKILLS', href: '#skills', id: 'skills', icon: Cpu },
    { label: 'CONTACT', href: '#contact', id: 'contact', icon: Mail },
  ];

  const activeLink = navLinks.find((l) => l.id === activeSection) || navLinks[0];
  const ActiveIcon = activeLink.icon;

  return (
    <aside
      aria-label="Dynamic Island Sidebar Navigation"
      className="fixed left-1.5 sm:left-2.5 top-1/2 -translate-y-1/2 z-50 select-none"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.8 }}
        onClick={() => {
          if (isDesktop && !isExpanded) setIsOpen(true);
        }}
        className={`group relative flex flex-col items-center justify-between rounded-full bg-[var(--surface-titlebar)]/92 dark:bg-[#111114]/92 backdrop-blur-2xl border-2 border-[var(--border-retro)] shadow-[4px_4px_0px_rgba(0,0,0,0.18)] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.65),0_12px_40px_rgba(0,0,0,0.5)] transition-colors will-change-transform ${
          isExpanded
            ? 'py-2 sm:py-2.5 px-1 sm:px-1.5 w-auto'
            : 'py-2 px-0.5 w-3 sm:w-3.5 h-48 sm:h-56 cursor-pointer hover:border-[var(--accent-quiet)]'
        }`}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* ─── SINGLE LOGO SECTION (DYNAMIC ISLAND THIN LINE) ─── */
            <motion.div
              key="single-logo-section"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-between h-full w-full py-1 pointer-events-none gap-2"
            >
              {/* Dynamic Active Section Logo with Fluid Morph Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ scale: 0.4, opacity: 0, y: -6 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.4, opacity: 0, y: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                  className="w-3.5 h-3.5 flex items-center justify-center text-[var(--accent-quiet-text)] dark:text-[var(--accent-quiet)] drop-shadow-[0_0_6px_var(--accent-quiet)]"
                >
                  <ActiveIcon className="w-3 h-3 stroke-[2.4]" />
                </motion.div>
              </AnimatePresence>

              {/* Ultra-Slim Phosphor Cyber Beam Line */}
              <div className="w-[2px] flex-1 min-h-[90px] rounded-full bg-[var(--accent-quiet)] shadow-[0_0_8px_var(--accent-quiet)] shrink-0 transition-all duration-300" />

              {/* Bottom Theme Micro-Switcher (accessible on mobile & desktop) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTheme();
                }}
                aria-label="Toggle theme"
                className="w-3.5 h-3.5 flex items-center justify-center text-[var(--text-main)] pointer-events-auto active:scale-75 transition-transform cursor-pointer"
              >
                {theme === 'dark' ? (
                  <Sun className="w-2.5 h-2.5 text-amber-400" />
                ) : (
                  <Moon className="w-2.5 h-2.5 text-sky-400" />
                )}
              </button>

              {/* Hover Tooltip (Slide-Out on Desktop) */}
              {isDesktop && (
                <span className="pointer-events-none absolute left-10 px-2.5 py-1.5 rounded-xl bg-[var(--surface-titlebar)]/95 dark:bg-[#18181c]/95 backdrop-blur-xl border-2 border-[var(--border-retro)] shadow-[3px_3px_0px_rgba(0,0,0,0.25)] text-[var(--text-main)] font-pixel text-xs tracking-wider whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center gap-1.5">
                  <span className="text-[var(--accent-quiet-text)] dark:text-[var(--accent-quiet)] font-bold">&gt;</span>
                  <span>{activeLink.label}</span>
                  <span className="text-[9px] opacity-60 font-sans">[OPEN]</span>
                </span>
              )}
            </motion.div>
          ) : (
            /* ─── FULL EXPANDED DOCK: Opened on Click ─── */
            <motion.div
              key="expanded-dock"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-1.5 w-auto"
            >
              {/* Top Close / Minimize Toggle Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                title="Collapse to single logo"
                className="flex items-center gap-1.5 opacity-70 hover:opacity-100 mb-0.5 cursor-pointer active:scale-90 transition-transform"
              >
                <span className="w-1.5 h-1.5 rounded-full border border-[var(--border-retro)] bg-[var(--surface-window)]" />
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full border border-[var(--border-retro)] bg-[var(--surface-window)]" />
              </button>

              {/* Custom Retro-Designed 'N' Monogram Squircle */}
              <a
                href="#home"
                title="Nitin · Home"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[var(--surface-window)]/90 dark:bg-white/5 border-2 border-[var(--border-retro)] hover:border-[var(--accent-quiet)] flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <RetroNLogo />

                {/* Tooltip */}
                <span className="pointer-events-none absolute left-13 px-3 py-1.5 rounded-xl bg-[var(--surface-titlebar)]/95 dark:bg-[#18181c]/95 backdrop-blur-xl border-2 border-[var(--border-retro)] shadow-[3px_3px_0px_rgba(0,0,0,0.25)] text-[var(--text-main)] font-pixel text-xs tracking-wider whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center gap-1.5">
                  <span className="text-[var(--accent-quiet-text)] dark:text-[var(--accent-quiet)] font-bold">&gt;</span>
                  <span>NITIN · HOME</span>
                </span>
              </a>

              {/* Divider with Hardware Tick Marks */}
              <div className="w-5 h-[2px] bg-[var(--border-retro)] opacity-50 my-0.5" />

              {/* Vertical Navigation Icons */}
              <nav className="flex flex-col items-center gap-1" aria-label="Main Navigation">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isCurrent = activeSection === link.id;

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      aria-label={link.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                      }}
                      className={`group relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-90 ${
                        isCurrent
                          ? 'text-[var(--accent-quiet-text)] dark:text-white'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                      }`}
                    >
                      {/* Active Spring Capsule Background */}
                      {isCurrent && (
                        <motion.div
                          layoutId="retro-ios-dock-active"
                          className="absolute inset-0 rounded-xl sm:rounded-2xl bg-[var(--accent-quiet-bg)] dark:bg-[var(--accent-quiet-bg)]/40 border-2 border-[var(--accent-quiet)] shadow-sm"
                          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                        />
                      )}

                      {/* Left Active Accent Pill Bar */}
                      {isCurrent && (
                        <span className="absolute -left-1.5 w-1 h-4 rounded-r-full bg-[var(--accent-quiet)] shadow-[0_0_8px_var(--accent-quiet)]" />
                      )}

                      <Icon className="relative z-10 w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />

                      {/* Floating Slide-Out Tooltip */}
                      <span className="pointer-events-none absolute left-13 px-3 py-1.5 rounded-xl bg-[var(--surface-titlebar)]/95 dark:bg-[#18181c]/95 backdrop-blur-xl border-2 border-[var(--border-retro)] shadow-[3px_3px_0px_rgba(0,0,0,0.25)] text-[var(--text-main)] font-pixel text-xs tracking-wider whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center gap-1.5">
                        <span className="text-[var(--accent-quiet-text)] dark:text-[var(--accent-quiet)] font-bold">&gt;</span>
                        <span>{link.label}</span>
                      </span>
                    </a>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className="w-5 h-[2px] bg-[var(--border-retro)] opacity-50 my-0.5" />

              {/* Bottom Control: Vertical iOS Light/Dark Mode Switch */}
              <div className="flex flex-col items-center pt-0.5">
                <RetroIOSVerticalThemeSwitch theme={theme} toggleTheme={toggleTheme} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </aside>
  );
}
