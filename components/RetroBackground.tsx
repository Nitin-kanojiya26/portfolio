'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
 *  CALM MINIMAL AMBIENT RETRO BACKGROUND
 *  A clean, non-intrusive backdrop with gentle floating phosphor dust specks
 *  and subtle ambient lighting matching the website's exact theme colors.
 * ───────────────────────────────────────────────────────────────────────────── */

interface DustMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export default function RetroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const motes: DustMote[] = [];
    const COUNT = 22; // Minimalist, clean budget
    for (let i = 0; i < COUNT; i++) {
      motes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.12 - Math.random() * 0.2,
        size: Math.random() > 0.85 ? 1.5 : 1,
        alpha: 0.05 + Math.random() * 0.12,
      });
    }

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? '#8FB89B' : '#7FA38A';

      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;

        if (m.y < -10) m.y = canvas.height + 10;
        if (m.x < -10) m.x = canvas.width + 10;
        if (m.x > canvas.width + 10) m.x = -10;

        ctx.globalAlpha = m.alpha;
        ctx.fillRect(Math.floor(m.x), Math.floor(m.y), m.size, m.size);
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
}
