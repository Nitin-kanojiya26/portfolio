'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function CustomRetroCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isHoveredRef = useRef(false);
  const hasMovedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, keep standard OS cursor
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rotX = 0.5;
    let rotY = 0.5;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        currentX = mouseX;
        currentY = mouseY;
        document.body.classList.add('custom-cursor-active');
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('retro-btn')
      ) {
        isHoveredRef.current = true;
      } else {
        isHoveredRef.current = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    // Standard 8 vertices of a unit cube / hexahedron
    const baseVertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
    ];

    // 12 edges connecting the vertices
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    // Continuous 60fps render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!hasMovedRef.current || mouseX < 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Smooth cursor follow
      currentX += (mouseX - currentX) * 0.3;
      currentY += (mouseY - currentY) * 0.3;

      const speed = isHoveredRef.current ? 0.045 : 0.02;
      rotX += speed * 0.8;
      rotY += speed * 1.2;
      time += isHoveredRef.current ? 0.035 : 0.018;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Compact, elegant cube size: 8.5px base, 12px on interactive hover
      const targetSize = isHoveredRef.current ? 12 : 8.5;

      // Draw 3 concentric collapsing wireframe layers for the inward tunnel effect
      const layerOffsets = [0, 0.33, 0.66];

      for (let l = 0; l < layerOffsets.length; l++) {
        // Continuous cycle moving inward: 1.0 down to 0.15
        const progress = (time + layerOffsets[l]) % 1;
        const currentScale = targetSize * (1 - progress * 0.85);

        // Alpha fades as it reaches center
        const alpha = Math.max(0.15, 1 - progress);

        // Project 3D rotated vertices to 2D
        const projected = baseVertices.map(([vx, vy, vz]) => {
          // Rotate around Y axis
          const x1 = vx * cosY - vz * sinY;
          const z1 = vx * sinY + vz * cosY;

          // Rotate around X axis
          const y2 = vy * cosX - z1 * sinX;
          const z2 = vy * sinX + z1 * cosX;

          // Isometric / weak perspective projection
          const fov = 3.5;
          const scale = fov / (fov + z2 * 0.4);

          return {
            x: currentX + x1 * currentScale * scale,
            y: currentY + y2 * currentScale * scale,
          };
        });

        // Draw crisp electric blue wireframe edges
        ctx.strokeStyle = `rgba(0, 122, 255, ${alpha})`;
        ctx.lineWidth = l === 0 ? 1.2 : 0.8;
        ctx.beginPath();
        for (let i = 0; i < edges.length; i++) {
          const [startIdx, endIdx] = edges[i];
          const p1 = projected[startIdx];
          const p2 = projected[endIdx];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();

        // Connect collapsing layer to center reticle point (tunnel depth guide lines)
        ctx.strokeStyle = `rgba(0, 122, 255, ${alpha * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(currentX, currentY);
        }
        ctx.stroke();
      }

      // Center reticle dot (crisp electric blue)
      ctx.fillStyle = '#0066ff';
      ctx.shadowColor = '#007aff';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(currentX, currentY, 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
