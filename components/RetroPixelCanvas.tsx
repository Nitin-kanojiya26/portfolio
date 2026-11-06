'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Pixel {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function RetroPixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Skip entirely on touch devices or reduced-motion
    if (shouldReduceMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = true;
    let lastSpawn = 0;
    const pixels: Pixel[] = [];

    // Resize canvas to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Tab visibility listener to pause rendering when user changes tab
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track pointer movement inside hero section
    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastSpawn < 30) return; // Throttle spawn for 60fps budget
      lastSpawn = now;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spawn 1-2 crisp retro square pixels
      if (pixels.length < 30) {
        pixels.push({
          x: Math.floor(x / 4) * 4, // Snap to 4px retro grid
          y: Math.floor(y / 4) * 4,
          size: 4,
          life: 1,
          maxLife: 30,
          color: Math.random() > 0.5 ? 'var(--accent-color)' : 'var(--text-main)',
        });
      }
    };

    const parent = canvas.parentElement;
    parent?.addEventListener('pointermove', handlePointerMove as any);

    // Render loop
    const render = () => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = pixels.length - 1; i >= 0; i--) {
        const p = pixels[i];
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) {
          pixels.splice(i, 1);
          continue;
        }

        // Draw crisp 4x4 pixel square
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.4;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      parent?.removeEventListener('pointermove', handlePointerMove as any);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
}

