'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ContextMenuLoader from './ContextMenuLoader';
import RetroBackground from './RetroBackground';
import ScrollProgress from './ScrollProgress';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Fast Mouse Right-Click Context Menu Initializer */}
      <ContextMenuLoader />

      {/* Slim Retro Scroll Progress Bar & Percentage HUD */}
      <ScrollProgress />

      {/* Retro Dither Desktop Canvas Pattern */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none dither-pattern" 
        style={{ opacity: 'var(--pattern-dither-opacity)' }}
        aria-hidden="true"
      />

      {/* Floating Retro Phosphor Dust Canvas */}
      <RetroBackground />

      {/* Main Page Layout Container */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full min-h-screen relative z-10 overflow-x-hidden"
      >
        {children}
      </motion.div>
    </>
  );
}
