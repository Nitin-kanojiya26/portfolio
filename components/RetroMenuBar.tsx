'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      onClick={toggleTheme}
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

  return (
    <>
      {/* ─── DESKTOP: Left-Side Floating iOS × Retro Sidebar Dock ─── */}
      <motion.aside
        initial={{ x: -90, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Sidebar Navigation"
        className="hidden md:flex fixed left-1 sm:left-2 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-1.5 py-2 sm:py-2.5 px-1 sm:px-1.5 rounded-full bg-[var(--surface-titlebar)]/90 dark:bg-[#111114]/90 backdrop-blur-2xl border-2 border-[var(--border-retro)] shadow-[4px_4px_0px_rgba(0,0,0,0.18)] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.65),0_12px_40px_rgba(0,0,0,0.5)] select-none transition-all duration-300 w-auto"
      >
        {/* Top Hardware Screws / LED Status Pips */}
        <div className="flex items-center gap-1.5 opacity-60 mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full border border-[var(--border-retro)] bg-[var(--surface-window)]" />
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full border border-[var(--border-retro)] bg-[var(--surface-window)]" />
        </div>

        {/* Custom Retro-Designed 'N' Monogram Squircle */}
        <a
          href="#home"
          title="Nitin · Home"
          className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[var(--surface-window)]/90 dark:bg-white/5 border-2 border-[var(--border-retro)] hover:border-[var(--accent-quiet)] flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <RetroNLogo />

          {/* iOS-Style Slide-Out Tooltip with Retro Pixel Typography */}
          <span className="pointer-events-none absolute left-13 px-3 py-1.5 rounded-xl bg-[var(--surface-titlebar)]/95 dark:bg-[#18181c]/95 backdrop-blur-xl border-2 border-[var(--border-retro)] shadow-[3px_3px_0px_rgba(0,0,0,0.25)] text-[var(--text-main)] font-pixel text-xs tracking-wider whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center gap-1.5">
            <span className="text-[var(--accent-quiet-text)] dark:text-[var(--accent-quiet)] font-bold">&gt;</span>
            <span>NITIN · HOME</span>
          </span>
        </a>

        {/* Divider with Hardware Tick Marks */}
        <div className="w-5 h-[2px] bg-[var(--border-retro)] opacity-50 my-0.5" />

        {/* Vertical Navigation Icons with Spring Active Pill & Retro Tooltips */}
        <nav className="flex flex-col items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isCurrent = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                aria-label={link.label}
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
      </motion.aside>

      {/* ─── MOBILE: Bottom Floating iOS × Retro Tab Bar ─── */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-3 left-3 right-3 z-50 h-14 px-2 rounded-2xl bg-[var(--surface-titlebar)]/90 dark:bg-[#111114]/90 backdrop-blur-2xl border-2 border-[var(--border-retro)] shadow-[4px_4px_0px_rgba(0,0,0,0.25)] flex items-center justify-around select-none"
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isCurrent = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              aria-label={link.label}
              className={`flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all active:scale-90 ${
                isCurrent
                  ? 'bg-[var(--accent-quiet-bg)] dark:bg-[var(--accent-quiet-bg)]/40 text-[var(--accent-quiet-text)] dark:text-white border-2 border-[var(--accent-quiet)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] font-pixel mt-0.5 tracking-tight">
                {link.label}
              </span>
            </a>
          );
        })}

        {/* Mobile Theme Switch Button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex flex-col items-center justify-center w-9 h-9 rounded-xl bg-[var(--surface-window)]/80 dark:bg-white/5 border border-[var(--border-retro)] text-[var(--text-main)] active:scale-90 transition-all cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-sky-500" />
          )}
        </button>
      </nav>
    </>
  );
}
