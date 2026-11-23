'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CalmPageBackgroundProps {
  variant?: 'about' | 'contact' | 'default';
  className?: string;
}

export default function CalmPageBackground({
  variant = 'default',
  className = '',
}: CalmPageBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none -z-0 ${className}`}
      aria-hidden="true"
    >
      {/* ─── Ambient Soft Aura Glow ─── */}
      <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent-quiet)]/6 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/4 blur-[90px] pointer-events-none" />

      {/* ─── Fine Architectural Topographic & Vector Geometry Canvas ─── */}
      <svg
        className="w-full h-full opacity-35 dark:opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle Precision Grid */}
          <pattern
            id={`calmGrid_${variant}`}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              className="text-[var(--text-muted)] opacity-10"
            />
            <circle
              cx="32"
              cy="32"
              r="0.6"
              fill="currentColor"
              className="text-[var(--accent-quiet)] opacity-20"
            />
          </pattern>

          {/* Calm Wave Gradient */}
          <linearGradient id={`waveGrad_${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Base Grid Texture */}
        <rect width="100%" height="100%" fill={`url(#calmGrid_${variant})`} />

        {/* ─── Calm Topographic Contour Lines ─── */}
        {/* Line 1 */}
        <path
          d="M -100,120 Q 250,60 600,140 T 1300,90"
          fill="none"
          stroke={`url(#waveGrad_${variant})`}
          strokeWidth="1"
          className="text-[var(--accent-quiet)]"
        />

        {/* Line 2 */}
        <path
          d="M -100,240 Q 300,180 700,280 T 1400,200"
          fill="none"
          stroke={`url(#waveGrad_${variant})`}
          strokeWidth="1"
          className="text-[var(--accent-quiet)] opacity-80"
        />

        {/* Line 3 */}
        <path
          d="M -100,380 Q 200,300 650,420 T 1400,340"
          fill="none"
          stroke={`url(#waveGrad_${variant})`}
          strokeWidth="1"
          className="text-[var(--accent-quiet)] opacity-60"
        />

        {/* Line 4 */}
        <path
          d="M -100,520 Q 350,460 750,560 T 1400,480"
          fill="none"
          stroke={`url(#waveGrad_${variant})`}
          strokeWidth="0.8"
          className="text-[var(--accent-quiet)] opacity-40"
        />

        {/* Line 5 */}
        <path
          d="M -100,680 Q 280,600 700,720 T 1400,640"
          fill="none"
          stroke={`url(#waveGrad_${variant})`}
          strokeWidth="0.8"
          className="text-[var(--accent-quiet)] opacity-30"
        />
      </svg>

      {/* ─── Calm Ambient Floating Particles ─── */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/5 w-1 h-1 rounded-full bg-[var(--accent-quiet)] opacity-40"
            animate={{ y: [0, -18, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-2/3 left-3/4 w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-30"
            animate={{ y: [0, -24, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full bg-[var(--accent-quiet)] opacity-35"
            animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          />
          <motion.div
            className="absolute top-1/6 right-1/4 w-1.5 h-1.5 rounded-full bg-blue-400 opacity-25"
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </div>
      )}
    </div>
  );
}
