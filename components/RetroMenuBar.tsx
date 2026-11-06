'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export default function RetroMenuBar() {
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState<string>('--:--');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Live ticking Vadodara (IST) clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Active Section Scroll Spy
  useEffect(() => {
    const sectionIds = ['home', 'about', 'resume', 'projects', 'skills', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
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
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'RESUME', href: '#resume', id: 'resume' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-10 bg-[var(--surface-titlebar)] border-b-2 border-[var(--border-retro)] select-none text-xs font-pixel shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
      <div className="max-w-[1440px] mx-auto h-full px-3 sm:px-6 flex items-center justify-between">
        
        {/* Left: Clean Brand "NITIN" */}
        <div className="flex items-center gap-3 sm:gap-6 h-full">
          <a
            href="#home"
            className="flex items-center gap-2 px-2.5 py-1 hover:bg-[var(--text-main)] hover:text-[var(--bg-canvas)] transition-colors font-bold text-[var(--text-main)] border border-transparent hover:border-[var(--border-retro)]"
          >
            <span className="text-[var(--accent-color)] font-bold text-sm">■</span>
            <span className="tracking-widest text-sm font-bold">NITIN</span>
          </a>

          {/* Clean, Non-Cluttered Navigation Tabs with Live Scroll Spy */}
          <nav className="hidden md:flex items-center gap-1.5 h-full text-[var(--text-main)]" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isCurrent = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-1 transition-all tracking-wider font-bold text-xs border ${
                    isCurrent
                      ? 'bg-[var(--text-main)] text-[var(--bg-canvas)] border-[var(--border-retro)] shadow-[0_0_8px_var(--accent-glow)]'
                      : 'border-transparent hover:border-[var(--border-retro)] hover:bg-[var(--text-main)] hover:text-[var(--bg-canvas)]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Right: Theme Toggle + Clean Vadodara Clock */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="flex items-center gap-1.5 px-2.5 py-1 border border-[var(--border-retro)] bg-[var(--surface-panel)] text-[var(--text-main)] hover:bg-[var(--accent-color)] hover:text-[var(--accent-contrast)] transition-colors cursor-pointer text-xs font-mono font-bold"
          >
            <span className="text-sm">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>

          {/* Clean Live Clock */}
          <div className="px-2.5 py-1 border border-[var(--border-retro)] bg-[var(--surface-panel)] text-[var(--text-main)] font-mono text-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline text-[var(--text-muted)] text-[10px]">VADODARA</span>
            <strong className="font-bold text-emerald-600 dark:text-emerald-400">{currentTime}</strong>
          </div>

          {/* Mobile Menu Dropdown Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden px-2.5 py-1 border border-[var(--border-retro)] bg-[var(--surface-panel)] text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-canvas)] font-pixel text-xs font-bold"
          >
            {mobileMenuOpen ? '×' : 'MENU ≡'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden absolute top-full left-0 right-0 bg-[var(--surface-window)] border-b-2 border-[var(--border-retro)] shadow-[var(--shadow-hard-lg)] p-3 flex flex-col gap-1.5 z-50"
          aria-label="Mobile Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 border border-[var(--border-retro)] bg-[var(--surface-panel)] hover:bg-[var(--accent-color)] hover:text-[var(--accent-contrast)] font-pixel text-xs flex items-center justify-between transition-colors font-bold"
            >
              <span>{link.label}</span>
              <span className="text-[10px] text-[var(--accent-color)] font-mono">→</span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
