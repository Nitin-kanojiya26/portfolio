'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
  type LucideIcon,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
 *  NAVIGATION ITEMS
 * ═══════════════════════════════════════════════════════════ */

interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', name: 'HOME', href: '#home', icon: Home },
  { id: 'about', name: 'ABOUT', href: '#about', icon: User },
  { id: 'resume', name: 'DOSSIER', href: '#resume', icon: FileText },
  { id: 'projects', name: 'PROJECTS', href: '#projects', icon: FolderGit2 },
  { id: 'skills', name: 'SKILLS', href: '#skills', icon: Cpu },
  { id: 'contact', name: 'CONTACT', href: '#contact', icon: Mail },
];

/* ═══════════════════════════════════════════════════════════
 *  1. PC DESKTOP: SLEEK & SLIM LEFT-DOCKED CAMERA CONTROL NOTCH
 *  Attached to left screen edge (x = 0).
 *  Slim 36px width, compact 250px height.
 *  Zero divider lines, zero sharp corners.
 * ═══════════════════════════════════════════════════════════ */

interface PCNotchProps {
  width: number;
  height: number;
  shoulder: number;
}

function PCLeftNotchSVG({ width: W, height: H, shoulder: S }: PCNotchProps) {
  const cp1Y = S * 0.35;
  const cp2X = W * 0.15;
  const cp2Y = S * 0.45;
  const midX = W * 0.50;
  const midY = S * 0.55;
  const cp3X = W * 0.85;
  const cp3Y = S * 0.65;
  const cp4X = W;
  const cp4Y = S * 0.78;

  const bCp4Y = H - cp4Y;
  const bCp3X = cp3X;
  const bCp3Y = H - cp3Y;
  const bMidX = midX;
  const bMidY = H - midY;
  const bCp2X = cp2X;
  const bCp2Y = H - cp2Y;
  const bCp1Y = H - cp1Y;

  const pathData = `
    M 0,0
    C 0,${cp1Y} ${cp2X},${cp2Y} ${midX},${midY}
    C ${cp3X},${cp3Y} ${cp4X},${cp4Y} ${W},${S}
    L ${W},${H - S}
    C ${W},${bCp4Y} ${bCp3X},${bCp3Y} ${bMidX},${bMidY}
    C ${bCp2X},${bCp2Y} 0,${bCp1Y} 0,${H}
    Z
  `;

  return (
    <svg
      className="absolute inset-0 w-full h-full overflow-visible pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]"
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pcBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#020202" stopOpacity="0.99" />
          <stop offset="50%" stopColor="#060608" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#010102" stopOpacity="0.99" />
        </linearGradient>
        <linearGradient id="pcRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.40)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.40)" />
        </linearGradient>
        <linearGradient id="pcBezel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="75%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
      </defs>

      <path
        d={pathData}
        fill="url(#pcBody)"
        stroke="url(#pcRim)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="0.5" y1="0" x2="0.5" y2={H} stroke="url(#pcBezel)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
 *  2. MOBILE: SLEEK & SLIM TOP-DOCKED CAMERA CONTROL NOTCH
 *  Attached to top screen edge (y = 0).
 *  Slim 32px height, 250px width. Zero divider lines.
 * ═══════════════════════════════════════════════════════════ */

interface MobileNotchProps {
  width: number;
  height: number;
  shoulder: number;
}

function MobileTopNotchSVG({ width: W, height: H, shoulder: S }: MobileNotchProps) {
  const cp1X = S * 0.35;
  const cp2X = S * 0.45;
  const cp2Y = H * 0.15;
  const midX = S * 0.55;
  const midY = H * 0.50;
  const cp3X = S * 0.65;
  const cp3Y = H * 0.85;
  const cp4X = S * 0.78;

  const rCp4X = W - cp4X;
  const rCp3X = W - cp3X;
  const rMidX = W - midX;
  const rCp2X = W - cp2X;
  const rCp1X = W - cp1X;

  const pathData = `
    M 0,0
    C ${cp1X},0 ${cp2X},${cp2Y} ${midX},${midY}
    C ${cp3X},${cp3Y} ${cp4X},${H} ${S},${H}
    L ${W - S},${H}
    C ${rCp4X},${H} ${rCp3X},${cp3Y} ${rMidX},${midY}
    C ${rCp2X},${cp2Y} ${rCp1X},0 ${W},0
    Z
  `;

  return (
    <svg
      className="absolute inset-0 w-full h-full overflow-visible pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]"
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mobBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#020202" stopOpacity="0.99" />
          <stop offset="50%" stopColor="#060608" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#010102" stopOpacity="0.99" />
        </linearGradient>
        <linearGradient id="mobRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.40)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.40)" />
        </linearGradient>
        <linearGradient id="mobBezel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="75%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
      </defs>

      <path
        d={pathData}
        fill="url(#mobBody)"
        stroke="url(#mobRim)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="0" y1="0.5" x2={W} y2="0.5" stroke="url(#mobBezel)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
 *  NAVBAR COMPONENT
 * ═══════════════════════════════════════════════════════════ */

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Entrance animation & scroll auto-hide
  const [hasMounted, setHasMounted] = useState(false);
  const [isNavActive, setIsNavActive] = useState(true);
  const [isHoveredOverNav, setIsHoveredOverNav] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setHasMounted(true);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  const trackRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // Responsive Breakpoint check: mobile < 768px, PC >= 768px
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener('change', handler as (e: MediaQueryListEvent) => void);
    return () => mq.removeEventListener('change', handler as (e: MediaQueryListEvent) => void);
  }, []);

  // Section Scroll Spy via IntersectionObserver
  useEffect(() => {
    if (isSliding) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -50% 0px' }
    );
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isSliding]);

  // Scroll Auto-Hide & Reveal Logic
  useEffect(() => {
    const handleScroll = () => {
      setIsNavActive(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        setIsNavActive(false);
      }, 2600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    hideTimeoutRef.current = setTimeout(() => {
      setIsNavActive(false);
    }, 2800);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const navigateToSection = useCallback((id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  /* ─────────────────────────────────────────────────────────
   *  SLEEK & SLIM GEOMETRY (Zero divider line, clean flow)
   * ───────────────────────────────────────────────────────── */

  // PC Left Geometry:
  // Slim 36px width, compact 250px height, shoulder 38px
  const PC_W = 36;
  const PC_H = 250;
  const PC_SHOULDER = 38;
  const PC_START_Y = 44;
  const PC_GAP = 25;
  const PC_THEME_Y = 196;

  // Mobile Top Geometry:
  // Slim 32px height, 250px width, shoulder 38px
  const MOB_W = 250;
  const MOB_H = 32;
  const MOB_SHOULDER = 38;
  const MOB_START_X = 46;
  const MOB_GAP = 24;
  const MOB_THEME_X = 192;

  // Pointer scrubber
  const getItemFromPointer = useCallback(
    (clientX: number, clientY: number): number => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      if (isMobile) {
        const relX = clientX - rect.left;
        const index = Math.round((relX - MOB_START_X) / MOB_GAP);
        return Math.max(0, Math.min(NAV_ITEMS.length - 1, index));
      } else {
        const relY = clientY - rect.top;
        const index = Math.round((relY - PC_START_Y) / PC_GAP);
        return Math.max(0, Math.min(NAV_ITEMS.length - 1, index));
      }
    },
    [isMobile]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    if (isMobile) {
      const relX = e.clientX - rect.left;
      if (relX >= MOB_THEME_X - 14) return;
    } else {
      const relY = e.clientY - rect.top;
      if (relY >= PC_THEME_Y - 14) return;
    }

    isPointerDownRef.current = true;
    setIsSliding(true);
    setIsNavActive(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    const idx = getItemFromPointer(e.clientX, e.clientY);
    navigateToSection(NAV_ITEMS[idx].id);
    setHoveredSection(NAV_ITEMS[idx].id);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const idx = getItemFromPointer(e.clientX, e.clientY);
    const item = NAV_ITEMS[idx];
    if (item) {
      setHoveredSection(item.id);
      if (item.id !== activeSection) navigateToSection(item.id);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isPointerDownRef.current = false;
    setIsSliding(false);
    setHoveredSection(null);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}

    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setIsNavActive(false);
    }, 2400);
  };

  const handleContainerMouseEnter = () => {
    setIsHoveredOverNav(true);
    setIsNavActive(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  };

  const handleContainerMouseLeave = () => {
    setIsHoveredOverNav(false);
    setHoveredSection(null);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setIsNavActive(false);
    }, 2000);
  };

  const activeIndex = Math.max(0, NAV_ITEMS.findIndex((i) => i.id === activeSection));
  const displayId = hoveredSection || (isSliding ? activeSection : null);
  const displayItem = NAV_ITEMS.find((i) => i.id === displayId) ?? null;
  const displayIndex = displayItem ? NAV_ITEMS.findIndex((i) => i.id === displayItem.id) : activeIndex;

  const fluidTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        type: 'spring' as const,
        stiffness: 110,
        damping: 20,
        mass: 0.95,
      };

  const getOpacity = (index: number, refIndex: number, hovered: boolean) => {
    const isSelected = index === refIndex;
    const dist = Math.abs(index - refIndex);
    return isSelected || hovered
      ? 1
      : dist === 1
      ? 0.60
      : dist === 2
      ? 0.32
      : 0.15;
  };

  const shouldShow = (hasMounted && isNavActive) || isHoveredOverNav || isSliding;

  /* ═══════════════════════════════════════════════════════════
   *  RENDER FOR MOBILE (< 768px): SLEEK TOP-DOCKED NOTCH
   * ═══════════════════════════════════════════════════════════ */

  if (isMobile) {
    const displayCenterX = MOB_START_X + displayIndex * MOB_GAP;

    return (
      <aside
        aria-label="Navigation"
        onMouseEnter={handleContainerMouseEnter}
        onMouseLeave={handleContainerMouseLeave}
        className="fixed top-0 left-1/2 -translate-x-1/2 z-50 select-none pt-[max(0rem,env(safe-area-inset-top))]"
      >
        <AnimatePresence>
          {shouldShow && (
            <motion.div
              key="mobile-nav-notch"
              ref={trackRef}
              initial={{ scale: 0.65, opacity: 0, y: -12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.65, opacity: 0, y: -12 }}
              transition={fluidTransition}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onMouseLeave={() => setHoveredSection(null)}
              className="relative touch-none cursor-ew-resize origin-top"
              style={{ width: `${MOB_W}px`, height: `${MOB_H}px` }}
            >
              <MobileTopNotchSVG width={MOB_W} height={MOB_H} shoulder={MOB_SHOULDER} />

              {/* Nav Icons — Sleek 12px size */}
              {NAV_ITEMS.map((item, index) => {
                const Icon = item.icon;
                const isSelected = item.id === activeSection;
                const isHovered = item.id === hoveredSection;
                const opacity = getOpacity(index, activeIndex, isHovered);
                const cx = MOB_START_X + index * MOB_GAP;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToSection(item.id);
                    }}
                    onMouseEnter={() => setHoveredSection(item.id)}
                    aria-label={item.name}
                    aria-current={isSelected ? 'page' : undefined}
                    style={{
                      left: `${cx - 10}px`,
                      top: '6px',
                    }}
                    className="absolute w-[20px] h-[20px] flex items-center justify-center rounded-full transition-transform active:scale-95 cursor-pointer z-10"
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="mob-nav-active-glow"
                        className="absolute inset-0 rounded-full bg-white/18"
                        transition={fluidTransition}
                      />
                    )}

                    <Icon
                      size={12}
                      strokeWidth={2.2}
                      style={{ opacity }}
                      className={`relative z-10 transition-opacity duration-200 text-white ${
                        isSelected || isHovered ? 'drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]' : ''
                      }`}
                    />
                  </a>
                );
              })}

              {/* Theme Toggle Button — Clean, zero divider line */}
              <button
                type="button"
                onPointerDown={(e) => {
                  e.stopPropagation();
                }}
                onPointerUp={(e) => {
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTheme();
                }}
                aria-label="Toggle theme"
                style={{
                  left: `${MOB_THEME_X - 9}px`,
                  top: '7px',
                }}
                className="absolute w-[18px] h-[18px] rounded-full flex items-center justify-center bg-white/8 hover:bg-white/20 border border-white/20 active:scale-95 transition-all cursor-pointer z-20"
              >
                {theme === 'dark' ? (
                  <Moon size={10} strokeWidth={2.2} className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.7)]" />
                ) : (
                  <Sun size={10} strokeWidth={2.2} className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.7)]" />
                )}
              </button>

              {/* Floating Tooltip Label (Clean, zero hyphen line) */}
              <AnimatePresence>
                {displayItem && (
                  <motion.div
                    key="mob-nav-tooltip"
                    initial={{ opacity: 0, y: -4, scale: 0.94 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      left: displayCenterX,
                    }}
                    exit={{ opacity: 0, y: -4, scale: 0.94 }}
                    transition={fluidTransition}
                    className="absolute top-[calc(100%+6px)] -translate-x-1/2 flex items-center px-2 py-0.5 rounded-full bg-black/95 border border-white/20 backdrop-blur-xl shadow-lg pointer-events-none z-30"
                  >
                    <span className="font-sans font-extrabold text-[8px] tracking-[0.22em] text-white uppercase whitespace-nowrap">
                      {displayItem.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    );
  }

  /* ═══════════════════════════════════════════════════════════
   *  RENDER FOR PC (>= 768px): SLEEK & SLIM LEFT-DOCKED NOTCH
   *  Zero divider line, zero hyphen dash.
   * ═══════════════════════════════════════════════════════════ */

  const displayCenterY = PC_START_Y + displayIndex * PC_GAP;

  return (
    <aside
      aria-label="Navigation"
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-50 select-none flex items-center"
    >
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            key="pc-left-nav-notch"
            ref={trackRef}
            initial={{ scale: 0.65, opacity: 0, x: -14 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.65, opacity: 0, x: -14 }}
            transition={fluidTransition}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseLeave={() => setHoveredSection(null)}
            className="relative touch-none cursor-ns-resize origin-left"
            style={{ width: `${PC_W}px`, height: `${PC_H}px` }}
          >
            <PCLeftNotchSVG width={PC_W} height={PC_H} shoulder={PC_SHOULDER} />

            {/* Nav Icons — Sleek 13px size in 22px buttons */}
            {NAV_ITEMS.map((item, index) => {
              const Icon = item.icon;
              const isSelected = item.id === activeSection;
              const isHovered = item.id === hoveredSection;
              const opacity = getOpacity(index, activeIndex, isHovered);
              const cy = PC_START_Y + index * PC_GAP;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection(item.id);
                  }}
                  onMouseEnter={() => setHoveredSection(item.id)}
                  aria-label={item.name}
                  aria-current={isSelected ? 'page' : undefined}
                  style={{
                    top: `${cy - 11}px`,
                    left: '7px',
                  }}
                  className="absolute w-[22px] h-[22px] flex items-center justify-center rounded-full transition-transform active:scale-95 cursor-pointer z-10"
                >
                  {isSelected && (
                    <motion.span
                      layoutId="pc-nav-active-glow"
                      className="absolute inset-0 rounded-full bg-white/18"
                      transition={fluidTransition}
                    />
                  )}

                  <Icon
                    size={13}
                    strokeWidth={2.2}
                    style={{ opacity }}
                    className={`relative z-10 transition-opacity duration-200 text-white ${
                      isSelected || isHovered ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]' : ''
                    }`}
                  />
                </a>
              );
            })}

            {/* Theme Toggle Button — Clean, zero divider line */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onPointerUp={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              aria-label="Toggle theme"
              style={{
                top: `${PC_THEME_Y - 10}px`,
                left: '8px',
              }}
              className="absolute w-[20px] h-[20px] rounded-full flex items-center justify-center bg-white/8 hover:bg-white/20 border border-white/20 active:scale-95 transition-all cursor-pointer z-20"
            >
              {theme === 'dark' ? (
                <Moon size={11} strokeWidth={2.2} className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.7)]" />
              ) : (
                <Sun size={11} strokeWidth={2.2} className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.7)]" />
              )}
            </button>

            {/* Floating Tooltip Label (Pops out to the right, zero hyphen dash) */}
            <AnimatePresence>
              {displayItem && (
                <motion.div
                  key="pc-nav-tooltip"
                  initial={{ opacity: 0, x: -6, scale: 0.94 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    top: displayCenterY,
                  }}
                  exit={{ opacity: 0, x: -6, scale: 0.94 }}
                  transition={fluidTransition}
                  className="absolute left-[calc(100%+8px)] -translate-y-1/2 flex items-center pointer-events-none z-30"
                >
                  <div className="px-2.5 py-0.5 rounded-full bg-black/95 border border-white/20 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                    <span className="font-sans font-extrabold text-[8.5px] tracking-[0.22em] text-white uppercase whitespace-nowrap">
                      {displayItem.name}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
