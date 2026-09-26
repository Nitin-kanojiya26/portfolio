'use client';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

export default function BlackHoleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 1. Ultra-minimalist dark gradient background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent" />
      
      {/* Second faint glow for balance */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent" />

      {/* 2. Extremely subtle, sparse particles for a touch of life without clutter */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.15]">
        <ParticleBackground />
      </div>

      {/* 3. Clean, professional fade-in entrance for the entire website */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1] // Apple-style silky smooth ease
        }}
        className="w-full min-h-screen relative z-10"
      >
        {children}
      </motion.div>
    </>
  );
}
