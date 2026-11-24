'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

/* ═══════════════════════════════════════════════════════════
 *  HANDCRAFTED EXCLUSIVE MINIMAL VECTOR ICONS (NO AI SLOP)
 *  Custom-designed 16x16 vector glyphs with 1.4px precision strokes
 * ═══════════════════════════════════════════════════════════ */

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// 01. Minimal Geometric Home (Roofline + Base + Micro-Door)
function MinimalHomeIcon({ size = 13, className = '', style }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M2.5 7L8 2.5L13.5 7V13.5H9.5V10H6.5V13.5H2.5V7Z" />
    </svg>
  );
}

// 02. Minimal Identity / User (Circular Head + Geometric Shoulder)
function MinimalUserIcon({ size = 13, className = '', style }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="8" cy="5" r="2.5" />
      <path d="M3.5 13.5C3.5 11 5.5 9.5 8 9.5C10.5 9.5 12.5 11 12.5 13.5" />
    </svg>
  );
}

// 03. Minimal Dossier / Sheet (Folded Sheet + 2 Precise Telemetry Lines)
function MinimalDossierIcon({ size = 13, className = '', style }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M3.5 2.5H10L12.5 5V13.5H3.5V2.5Z" />
      <path d="M10 2.5V5H12.5" />
      <line x1="6" y1="8" x2="10" y2="8" />
      <line x1="6" y1="10.5" x2="9" y2="10.5" />
    </svg>
  );
}

// 04. Minimal Code / Projects (Clean Monospace Angled Brackets)
function MinimalCodeIcon({ size = 13, className = '', style }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M5.5 4.5L2 8L5.5 11.5" />
      <path d="M10.5 4.5L14 8L10.5 11.5" />
      <line x1="9.5" y1="4" x2="6.5" y2="12" />
    </svg>
  );
}

// 05. Minimal Silicon Processor / Skills (Central Die + 4 Pin Traces)
function MinimalCpuIcon({ size = 13, className = '', style }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect x="4.5" y="4.5" width="7" height="7" rx="1.2" />
      <line x1="8" y1="2" x2="8" y2="4.5" />
      <line x1="8" y1="11.5" x2="8" y2="14" />
      <line x1="2" y1="8" x2="4.5" y2="8" />
      <line x1="11.5" y1="8" x2="14" y2="8" />
    </svg>
  );
}

// 06. Minimal Dispatch / Contact (Folded Envelope Silhouette)
function MinimalMailIcon({ size = 13, className = '', style }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect x="2.5" y="4" width="11" height="8" rx="1" />
      <path d="M2.5 5.5L8 9.5L13.5 5.5" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
 *  NEW BESPOKE LIGHT & DARK MODE ICONS (CELESTIAL ECLIPSE ORB)
 * ═══════════════════════════════════════════════════════════ */

// New Light Mode Icon: Precision Radiant Solar Core with Cardinal Beams & Orbital Pips
function NewLightModeIcon({ size = 12, className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="2.8" />
      <line x1="8" y1="1.4" x2="8" y2="3.2" />
      <line x1="8" y1="12.8" x2="8" y2="14.6" />
      <line x1="1.4" y1="8" x2="3.2" y2="8" />
      <line x1="12.8" y1="8" x2="14.6" y2="8" />
      <circle cx="3.4" cy="3.4" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="12.6" cy="3.4" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="3.4" cy="12.6" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="12.6" cy="12.6" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

// New Dark Mode Icon: Sharp Precision Lunar Eclipse Curve with Starlight Beacon
function NewDarkModeIcon({ size = 12, className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.8 8.6C12.1 11.5 9.4 13.5 6.4 13.2C3.4 12.9 1 10.4 1 7.4C1 4.4 3 2 5.9 1.4C5.3 2.7 5.4 4.1 6.1 5.3C7 6.9 8.7 7.9 10.6 7.9C11.4 7.9 12.2 7.7 12.8 7.2V8.6Z" />
      <circle cx="12.6" cy="3.2" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
 *  NAVIGATION ITEMS
 * ═══════════════════════════════════════════════════════════ */

interface NavItem {
  id: string;
  name: string;
  href: string;
  IconComponent: React.ComponentType<IconProps>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', name: 'HOME', href: '#home', IconComponent: MinimalHomeIcon },
  { id: 'about', name: 'ABOUT', href: '#about', IconComponent: MinimalUserIcon },
  { id: 'resume', name: 'RESUME', href: '#resume', IconComponent: MinimalDossierIcon },
  { id: 'projects', name: 'PROJECTS', href: '#projects', IconComponent: MinimalCodeIcon },
  { id: 'skills', name: 'SKILLS', href: '#skills', IconComponent: MinimalCpuIcon },
  { id: 'contact', name: 'CONTACT', href: '#contact', IconComponent: MinimalMailIcon },
];

export type DockSide = 'left' | 'right' | 'top' | 'bottom';

/* ═══════════════════════════════════════════════════════════
 *  NOTCH SVGS
 * ═══════════════════════════════════════════════════════════ */

interface NotchProps {
  width: number;
  height: number;
  shoulder: number;
}

function PCLeftNotchSVG({ width: W, height: H, shoulder: S }: NotchProps) {
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
        <linearGradient id="leftBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#020202" stopOpacity="0.99" />
          <stop offset="50%" stopColor="#060608" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#010102" stopOpacity="0.99" />
        </linearGradient>
        <linearGradient id="leftRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.40)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.40)" />
        </linearGradient>
        <linearGradient id="leftBezel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="75%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
      </defs>

      <path
        d={pathData}
        fill="url(#leftBody)"
        stroke="url(#leftRim)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="0.5" y1="0" x2="0.5" y2={H} stroke="url(#leftBezel)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PCRightNotchSVG({ width: W, height: H, shoulder: S }: NotchProps) {
  const cp1Y = S * 0.35;
  const cp2X = W - W * 0.15;
  const cp2Y = S * 0.45;
  const midX = W - W * 0.50;
  const midY = S * 0.55;
  const cp3X = W - W * 0.85;
  const cp3Y = S * 0.65;
  const cp4X = 0;
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
    M ${W},0
    C ${W},${cp1Y} ${cp2X},${cp2Y} ${midX},${midY}
    C ${cp3X},${cp3Y} ${cp4X},${cp4Y} 0,${S}
    L 0,${H - S}
    C 0,${bCp4Y} ${bCp3X},${bCp3Y} ${bMidX},${bMidY}
    C ${bCp2X},${bCp2Y} ${W},${bCp1Y} ${W},${H}
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
        <linearGradient id="rightBody" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#020202" stopOpacity="0.99" />
          <stop offset="50%" stopColor="#060608" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#010102" stopOpacity="0.99" />
        </linearGradient>
        <linearGradient id="rightRim" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.40)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.40)" />
        </linearGradient>
        <linearGradient id="rightBezel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="75%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
      </defs>

      <path
        d={pathData}
        fill="url(#rightBody)"
        stroke="url(#rightRim)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1={W - 0.5} y1="0" x2={W - 0.5} y2={H} stroke="url(#rightBezel)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MobileTopNotchSVG({ width: W, height: H, shoulder: S }: NotchProps) {
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
        <linearGradient id="topBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#020202" stopOpacity="0.99" />
          <stop offset="50%" stopColor="#060608" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#010102" stopOpacity="0.99" />
        </linearGradient>
        <linearGradient id="topRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.40)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.40)" />
        </linearGradient>
        <linearGradient id="topBezel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="75%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
      </defs>

      <path
        d={pathData}
        fill="url(#topBody)"
        stroke="url(#topRim)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="0" y1="0.5" x2={W} y2="0.5" stroke="url(#topBezel)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BottomNotchSVG({ width: W, height: H, shoulder: S }: NotchProps) {
  const cp1X = S * 0.35;
  const cp2X = S * 0.45;
  const cp2Y = H - H * 0.15;
  const midX = S * 0.55;
  const midY = H - H * 0.50;
  const cp3X = S * 0.65;
  const cp3Y = H - H * 0.85;
  const cp4X = S * 0.78;

  const rCp4X = W - cp4X;
  const rCp3X = W - cp3X;
  const rMidX = W - midX;
  const rCp2X = W - cp2X;
  const rCp1X = W - cp1X;

  const pathData = `
    M 0,${H}
    C ${cp1X},${H} ${cp2X},${cp2Y} ${midX},${midY}
    C ${cp3X},${cp3Y} ${cp4X},0 ${S},0
    L ${W - S},0
    C ${rCp4X},0 ${rCp3X},${cp3Y} ${rMidX},${midY}
    C ${rCp2X},${cp2Y} ${rCp1X},${H} ${W},${H}
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
        <linearGradient id="bottomBody" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#020202" stopOpacity="0.99" />
          <stop offset="50%" stopColor="#060608" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#010102" stopOpacity="0.99" />
        </linearGradient>
        <linearGradient id="bottomRim" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.40)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.40)" />
        </linearGradient>
        <linearGradient id="bottomBezel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="75%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
      </defs>

      <path
        d={pathData}
        fill="url(#bottomBody)"
        stroke="url(#bottomRim)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="0" y1={H - 0.5} x2={W} y2={H - 0.5} stroke="url(#bottomBezel)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
 *  ADAPTIVE NOTCH NAVBAR
 *  - Ultra-responsive Samsung-style Dark Dot drag (never gets stuck anywhere)
 *  - Snaps effortlessly to Top (iPhone notch), Left, Right, or Bottom
 *  - Motion-reactive (reveals on movement, hides after stillness)
 *  - Handcrafted exclusive minimal vector icons + New Theme Toggle
 * ═══════════════════════════════════════════════════════════ */

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [dock, setDock] = useState<DockSide>('left');
  const [hasMounted, setHasMounted] = useState(false);
  const [isNavActive, setIsNavActive] = useState(true);
  const [isHoveredOverNav, setIsHoveredOverNav] = useState(false);

  // Samsung Dark Dot Drag state (tracked at window level so it NEVER gets stuck)
  const [isDragging, setIsDragging] = useState(false);
  const [dragPoint, setDragPoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [previewEdge, setPreviewEdge] = useState<DockSide>('left');

  const dragStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const isPointerActiveRef = useRef(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Dimensions
  const SIDE_W = 36;
  const SIDE_H = 250;
  const SIDE_SHOULDER = 38;
  const SIDE_START_Y = 44;
  const SIDE_GAP = 25;
  const SIDE_THEME_Y = 196;

  const TOP_W = 250;
  const TOP_H = 32;
  const TOP_SHOULDER = 38;
  const TOP_START_X = 46;
  const TOP_GAP = 24;
  const TOP_THEME_X = 192;

  // Initialize dock position: Phone default -> 'right', PC default -> 'left'
  useEffect(() => {
    const isMobileDevice = window.innerWidth < 768;
    try {
      const saved = localStorage.getItem('portfolio_nav_dock') as DockSide | null;
      if (saved && (saved === 'left' || saved === 'right' || saved === 'top' || saved === 'bottom')) {
        setDock(saved);
      } else {
        setDock(isMobileDevice ? 'right' : 'left');
      }
    } catch {
      setDock(isMobileDevice ? 'right' : 'left');
    }
    setHasMounted(true);
  }, []);

  // Section Scroll Spy via IntersectionObserver
  useEffect(() => {
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
  }, []);

  // Motion Detection (Reveals on movement, hides after stillness)
  useEffect(() => {
    const handleMovement = () => {
      setIsNavActive(true);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsNavActive(false);
      }, 2600);
    };

    window.addEventListener('pointermove', handleMovement, { passive: true });
    window.addEventListener('touchstart', handleMovement, { passive: true });

    idleTimerRef.current = setTimeout(() => {
      setIsNavActive(false);
    }, 2800);

    return () => {
      window.removeEventListener('pointermove', handleMovement);
      window.removeEventListener('touchstart', handleMovement);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  const navigateToSection = useCallback((id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // ═══════════════════════════════════════════════════════════
  // PURE EUCLIDEAN EDGE SNAP CALCULATION (NEVER GETS STUCK)
  // Calculates real-time distance to all 4 edges from ANY screen point
  // ═══════════════════════════════════════════════════════════
  const calculateClosestEdge = useCallback((x: number, y: number): DockSide => {
    if (typeof window === 'undefined') return 'left';
    const W = window.innerWidth;
    const H = window.innerHeight;

    // Distances to screen perimeters
    const dTop = y;
    const dBottom = H - y;
    const dLeft = x;
    const dRight = W - x;

    // Direct minimum calculation guarantees smooth docking anywhere
    const minVal = Math.min(dTop, dBottom, dLeft, dRight);

    if (minVal === dTop) return 'top';
    if (minVal === dBottom) return 'bottom';
    if (minVal === dLeft) return 'left';
    return 'right';
  }, []);

  // ═══════════════════════════════════════════════════════════
  // WINDOW-LEVEL POINTER DRAGGING (1:1 Responsive, Zero Lag)
  // ═══════════════════════════════════════════════════════════
  const handlePointerDown = (e: React.PointerEvent) => {
    // Ignore clicks on buttons/links so clicks fire instantly
    if ((e.target as HTMLElement).closest('button, a')) return;

    isPointerActiveRef.current = true;
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    setDragPoint({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleWindowPointerMove = (e: PointerEvent) => {
      if (!isPointerActiveRef.current || !dragStartPosRef.current) return;

      const dx = e.clientX - dragStartPosRef.current.x;
      const dy = e.clientY - dragStartPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Once pointer moves > 5px, engage Samsung Dark Dot drag mode
      if (dist > 5) {
        setIsDragging(true);
        setIsNavActive(true);
        setDragPoint({ x: e.clientX, y: e.clientY });

        const closest = calculateClosestEdge(e.clientX, e.clientY);
        setPreviewEdge(closest);
      }
    };

    const handleWindowPointerUp = (e: PointerEvent) => {
      if (!isPointerActiveRef.current) return;
      isPointerActiveRef.current = false;
      dragStartPosRef.current = null;

      if (isDragging) {
        setIsDragging(false);
        const finalEdge = calculateClosestEdge(e.clientX, e.clientY);
        setDock(finalEdge);

        try {
          localStorage.setItem('portfolio_nav_dock', finalEdge);
        } catch {}

        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          setIsNavActive(false);
        }, 2600);
      }
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
    };
  }, [calculateClosestEdge, isDragging]);

  const handleContainerMouseEnter = () => {
    setIsHoveredOverNav(true);
    setIsNavActive(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  };

  const handleContainerMouseLeave = () => {
    setIsHoveredOverNav(false);
    setHoveredSection(null);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsNavActive(false);
    }, 2200);
  };

  const activeIndex = Math.max(0, NAV_ITEMS.findIndex((i) => i.id === activeSection));
  const displayId = hoveredSection || activeSection;
  const displayItem = NAV_ITEMS.find((i) => i.id === displayId) ?? null;
  const displayIndex = displayItem ? NAV_ITEMS.findIndex((i) => i.id === displayItem.id) : activeIndex;

  const isHorizontal = dock === 'top' || dock === 'bottom';
  const shouldShow = (hasMounted && isNavActive) || isHoveredOverNav || isDragging;

  const fluidTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        type: 'spring' as const,
        stiffness: 120,
        damping: 20,
        mass: 0.9,
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

  // Dock container positioning classes
  const getDockContainerClass = () => {
    switch (dock) {
      case 'left':
        return 'fixed left-0 top-1/2 -translate-y-1/2 z-50 select-none flex items-center';
      case 'right':
        return 'fixed right-0 top-1/2 -translate-y-1/2 z-50 select-none flex items-center';
      case 'top':
        return 'fixed top-0 left-1/2 -translate-x-1/2 z-50 select-none pt-[max(0rem,env(safe-area-inset-top))] flex justify-center';
      case 'bottom':
        return 'fixed bottom-0 left-1/2 -translate-x-1/2 z-50 select-none pb-[max(0rem,env(safe-area-inset-bottom))] flex justify-center';
    }
  };

  // Motion animation offsets
  const getMotionAnimation = () => {
    switch (dock) {
      case 'left':
        return {
          initial: { x: -44, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -44, opacity: 0 },
        };
      case 'right':
        return {
          initial: { x: 44, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 44, opacity: 0 },
        };
      case 'top':
        return {
          initial: { y: -40, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -40, opacity: 0 },
        };
      case 'bottom':
        return {
          initial: { y: 40, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: 40, opacity: 0 },
        };
    }
  };

  const motionProps = getMotionAnimation();

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
       *  1. ACTIVE EDGE PREVIEWS (Real-time magnetic indicator)
       * ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 pointer-events-none z-40"
          >
            {previewEdge === 'top' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-1.5 bg-white/50 rounded-full shadow-[0_0_20px_#ffffff]" />
            )}
            {previewEdge === 'bottom' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-1.5 bg-white/50 rounded-full shadow-[0_0_20px_#ffffff]" />
            )}
            {previewEdge === 'left' && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-72 bg-white/50 rounded-full shadow-[0_0_20px_#ffffff]" />
            )}
            {previewEdge === 'right' && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-72 bg-white/50 rounded-full shadow-[0_0_20px_#ffffff]" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
       *  2. SAMSUNG-STYLE DARK DOT (Follows pointer 1:1, never stuck)
       * ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.12 }}
            style={{
              position: 'fixed',
              left: `${dragPoint.x - 14}px`,
              top: `${dragPoint.y - 14}px`,
              width: '28px',
              height: '28px',
            }}
            className="pointer-events-none z-50 rounded-full bg-[#060608]/95 border border-white/50 shadow-[0_0_24px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.95)] flex items-center justify-center backdrop-blur-xl"
          >
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff] animate-ping" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
       *  3. FULL DOCKED NOTCH NAVBAR (Normal State)
       * ══════════════════════════════════════════════════════════ */}
      {!isDragging && (
        <aside
          aria-label="Navigation"
          onMouseEnter={handleContainerMouseEnter}
          onMouseLeave={handleContainerMouseLeave}
          className={getDockContainerClass()}
        >
          <AnimatePresence>
            {shouldShow && (
              <motion.div
                key={`nav-notch-${dock}`}
                onPointerDown={handlePointerDown}
                initial={motionProps.initial}
                animate={motionProps.animate}
                exit={motionProps.exit}
                transition={fluidTransition}
                style={{
                  width: isHorizontal ? `${TOP_W}px` : `${SIDE_W}px`,
                  height: isHorizontal ? `${TOP_H}px` : `${SIDE_H}px`,
                }}
                className="relative touch-none cursor-grab active:cursor-grabbing origin-center"
              >
                {/* ─── Notch Background SVG ─── */}
                {dock === 'left' && <PCLeftNotchSVG width={SIDE_W} height={SIDE_H} shoulder={SIDE_SHOULDER} />}
                {dock === 'right' && <PCRightNotchSVG width={SIDE_W} height={SIDE_H} shoulder={SIDE_SHOULDER} />}
                {dock === 'top' && <MobileTopNotchSVG width={TOP_W} height={TOP_H} shoulder={TOP_SHOULDER} />}
                {dock === 'bottom' && <BottomNotchSVG width={TOP_W} height={TOP_H} shoulder={TOP_SHOULDER} />}

                {/* ─── Handcrafted Minimal Icons ─── */}
                {NAV_ITEMS.map((item, index) => {
                  const Icon = item.IconComponent;
                  const isSelected = item.id === activeSection;
                  const isHovered = item.id === hoveredSection;
                  const opacity = getOpacity(index, activeIndex, isHovered);

                  let posStyle: React.CSSProperties = {};
                  if (isHorizontal) {
                    const cx = TOP_START_X + index * TOP_GAP;
                    posStyle = { left: `${cx - 10}px`, top: '6px' };
                  } else if (dock === 'left') {
                    const cy = SIDE_START_Y + index * SIDE_GAP;
                    posStyle = { top: `${cy - 11}px`, left: '7px' };
                  } else {
                    const cy = SIDE_START_Y + index * SIDE_GAP;
                    posStyle = { top: `${cy - 11}px`, right: '7px' };
                  }

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
                      style={posStyle}
                      className={`absolute ${
                        isHorizontal ? 'w-[20px] h-[20px]' : 'w-[22px] h-[22px]'
                      } flex items-center justify-center rounded-full transition-transform active:scale-95 cursor-pointer z-10`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="notch-nav-active-glow"
                          className="absolute inset-0 rounded-full bg-white/18"
                          transition={fluidTransition}
                        />
                      )}

                      <Icon
                        size={isHorizontal ? 12 : 13}
                        style={{ opacity }}
                        className={`relative z-10 transition-opacity duration-200 text-white ${
                          isSelected || isHovered ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]' : ''
                        }`}
                      />
                    </a>
                  );
                })}

                {/* ─── New Theme Toggle Button (Celestial Orbit / Eclipse) ─── */}
                {(() => {
                  let themeStyle: React.CSSProperties = {};
                  if (isHorizontal) {
                    themeStyle = {
                      left: `${TOP_THEME_X - 9}px`,
                      top: '7px',
                    };
                  } else if (dock === 'left') {
                    themeStyle = { top: `${SIDE_THEME_Y - 10}px`, left: '8px' };
                  } else {
                    themeStyle = { top: `${SIDE_THEME_Y - 10}px`, right: '8px' };
                  }

                  return (
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onPointerUp={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTheme();
                      }}
                      aria-label="Toggle theme"
                      style={themeStyle}
                      className={`absolute ${
                        isHorizontal ? 'w-[18px] h-[18px]' : 'w-[20px] h-[20px]'
                      } rounded-full flex items-center justify-center bg-white/8 hover:bg-white/20 border border-white/20 active:scale-95 transition-all cursor-pointer z-20`}
                      title="Toggle Dark/Light Mode"
                    >
                      {theme === 'dark' ? (
                        <NewDarkModeIcon size={isHorizontal ? 11 : 12} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.85)]" />
                      ) : (
                        <NewLightModeIcon size={isHorizontal ? 11 : 12} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.85)]" />
                      )}
                    </button>
                  );
                })()}

                {/* ─── Floating Tooltip Label ─── */}
                <AnimatePresence>
                  {displayItem && hoveredSection && !isDragging && (
                    <motion.div
                      key="notch-nav-tooltip"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={fluidTransition}
                      style={
                        isHorizontal
                          ? {
                              left: `${TOP_START_X + displayIndex * TOP_GAP}px`,
                              transform: 'translateX(-50%)',
                              top: dock === 'top' ? 'calc(100% + 6px)' : undefined,
                              bottom: dock === 'bottom' ? 'calc(100% + 6px)' : undefined,
                            }
                          : {
                              top: `${SIDE_START_Y + displayIndex * SIDE_GAP}px`,
                              transform: 'translateY(-50%)',
                              left: dock === 'left' ? 'calc(100% + 8px)' : undefined,
                              right: dock === 'right' ? 'calc(100% + 8px)' : undefined,
                            }
                      }
                      className="absolute flex items-center pointer-events-none z-30"
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
      )}
    </>
  );
}
