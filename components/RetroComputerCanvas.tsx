'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  from: number;
  to: number;
}

export default function RetroComputerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let angleY = 0.45;
    let angleX = 0.22;
    let targetAngleY = 0.45;
    let targetAngleX = 0.22;
    let velocityY = 0;
    let velocityX = 0;
    let pointerDown = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let frameCount = 0;

    // Handle high DPI crisp rendering
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight || width;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Highly Detailed 3D Geometry: Monitor, Bezel, Dual Drive Bays, Keyboard Rows
    const vertices: Point3D[] = [
      // Monitor Outer Enclosure (0 - 7)
      { x: -58, y: -72, z: -45 },
      { x: 58, y: -72, z: -45 },
      { x: 58, y: 12, z: -45 },
      { x: -58, y: 12, z: -45 },
      { x: -52, y: -66, z: 42 },
      { x: 52, y: -66, z: 42 },
      { x: 52, y: 8, z: 42 },
      { x: -52, y: 8, z: 42 },

      // Monitor Screen Outer Bezel (8 - 11)
      { x: -44, y: -56, z: 44 },
      { x: 44, y: -56, z: 44 },
      { x: 44, y: -4, z: 44 },
      { x: -44, y: -4, z: 44 },

      // Monitor Screen Inner Display (12 - 15)
      { x: -38, y: -50, z: 45 },
      { x: 38, y: -50, z: 45 },
      { x: 38, y: -10, z: 45 },
      { x: -38, y: -10, z: 45 },

      // Chassis Main Tower (16 - 23)
      { x: -80, y: 12, z: -60 },
      { x: 80, y: 12, z: -60 },
      { x: 80, y: 50, z: -60 },
      { x: -80, y: 50, z: -60 },
      { x: -80, y: 12, z: 70 },
      { x: 80, y: 12, z: 70 },
      { x: 80, y: 50, z: 70 },
      { x: -80, y: 50, z: 70 },

      // Drive Bay 1 (Upper 3.5" Floppy) (24 - 27)
      { x: 18, y: 22, z: 71 },
      { x: 68, y: 22, z: 71 },
      { x: 68, y: 28, z: 71 },
      { x: 18, y: 28, z: 71 },

      // Drive Bay 2 (Lower 5.25" Bay) (28 - 31)
      { x: 18, y: 34, z: 71 },
      { x: 68, y: 34, z: 71 },
      { x: 68, y: 42, z: 71 },
      { x: 18, y: 42, z: 71 },

      // Keyboard Housing (32 - 39)
      { x: -74, y: 52, z: 85 },
      { x: 74, y: 52, z: 85 },
      { x: 74, y: 60, z: 85 },
      { x: -74, y: 60, z: 85 },
      { x: -74, y: 58, z: 135 },
      { x: 74, y: 58, z: 135 },
      { x: 74, y: 66, z: 135 },
      { x: -74, y: 66, z: 135 },

      // Keyboard Key Wells (40 - 43)
      { x: -68, y: 54, z: 92 },
      { x: 68, y: 54, z: 92 },
      { x: 68, y: 60, z: 128 },
      { x: -68, y: 60, z: 128 },

      // Spacebar (44 - 47)
      { x: -24, y: 58, z: 124 },
      { x: 24, y: 58, z: 124 },
      { x: 24, y: 62, z: 130 },
      { x: -24, y: 62, z: 130 },
    ];

    const edges: Edge[] = [
      // Monitor Outer
      { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0 },
      { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 4 },
      { from: 0, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 7 },

      // Monitor Screen Outer Bezel
      { from: 8, to: 9 }, { from: 9, to: 10 }, { from: 10, to: 11 }, { from: 11, to: 8 },

      // Monitor Screen Inner Display
      { from: 12, to: 13 }, { from: 13, to: 14 }, { from: 14, to: 15 }, { from: 15, to: 12 },

      // Base Chassis
      { from: 16, to: 17 }, { from: 17, to: 18 }, { from: 18, to: 19 }, { from: 19, to: 16 },
      { from: 20, to: 21 }, { from: 21, to: 22 }, { from: 22, to: 23 }, { from: 23, to: 20 },
      { from: 16, to: 20 }, { from: 17, to: 21 }, { from: 18, to: 22 }, { from: 19, to: 23 },

      // Drive Bays
      { from: 24, to: 25 }, { from: 25, to: 26 }, { from: 26, to: 27 }, { from: 27, to: 24 },
      { from: 28, to: 29 }, { from: 29, to: 30 }, { from: 30, to: 31 }, { from: 31, to: 28 },

      // Keyboard Housing
      { from: 32, to: 33 }, { from: 33, to: 34 }, { from: 34, to: 35 }, { from: 35, to: 32 },
      { from: 36, to: 37 }, { from: 37, to: 38 }, { from: 38, to: 39 }, { from: 39, to: 36 },
      { from: 32, to: 36 }, { from: 33, to: 37 }, { from: 34, to: 38 }, { from: 35, to: 39 },

      // Keyboard Inner Key Well
      { from: 40, to: 41 }, { from: 41, to: 42 }, { from: 42, to: 43 }, { from: 43, to: 40 },

      // Spacebar
      { from: 44, to: 45 }, { from: 45, to: 46 }, { from: 46, to: 47 }, { from: 47, to: 44 },
    ];

    // Pointer events for interactive 3D rotation
    const onPointerDown = (e: PointerEvent) => {
      pointerDown = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      setIsInteracting(true);
      velocityY = 0;
      velocityX = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerDown) {
        // Subtle tilt on hover
        const rect = canvas.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        targetAngleY = nx * 0.7;
        targetAngleX = ny * 0.35 + 0.15;
        return;
      }
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      
      velocityY = dx * 0.008;
      velocityX = dy * 0.008;
      targetAngleY += velocityY;
      targetAngleX += velocityX;
      targetAngleX = Math.max(-0.5, Math.min(0.6, targetAngleX));
    };

    const onPointerUp = () => {
      pointerDown = false;
      setIsInteracting(false);
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      frameCount++;

      // Inertia & Continuous gentle spin
      if (!pointerDown) {
        targetAngleY += (shouldReduceMotion ? 0 : 0.004) + velocityY;
        velocityY *= 0.92;
        velocityX *= 0.92;
      }

      // Smooth camera interpolation
      angleY += (targetAngleY - angleY) * 0.1;
      angleX += (targetAngleX - angleX) * 0.1;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const cx = width / 2;
      const cy = height / 2 + 15;
      const fov = Math.min(width, height) * 0.95;
      const cameraDist = 300;

      ctx.clearRect(0, 0, width, height);

      // Trigonometry for 3D rotation
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // 1. Draw Animated Retro Perspective Grid Floor
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
      ctx.lineWidth = 1;
      const gridY = 70; // Floor height
      const gridExtent = 220;
      const gridStep = 44;

      for (let gx = -gridExtent; gx <= gridExtent; gx += gridStep) {
        const x1 = gx * cosY + (-gridExtent) * sinY;
        const z1 = -gx * sinY + (-gridExtent) * cosY;
        const y1_rot = gridY * cosX - z1 * sinX;
        const z1_rot = gridY * sinX + z1 * cosX;
        const s1 = fov / (z1_rot + cameraDist);

        const x2 = gx * cosY + gridExtent * sinY;
        const z2 = -gx * sinY + gridExtent * cosY;
        const y2_rot = gridY * cosX - z2 * sinX;
        const z2_rot = gridY * sinX + z2 * cosX;
        const s2 = fov / (z2_rot + cameraDist);

        if (z1_rot + cameraDist > 10 && z2_rot + cameraDist > 10) {
          ctx.beginPath();
          ctx.moveTo(cx + x1 * s1, cy + y1_rot * s1);
          ctx.lineTo(cx + x2 * s2, cy + y2_rot * s2);
          ctx.stroke();
        }
      }
      ctx.restore();

      // 2. Project Computer Vertices to 2D Screen Space
      const projected: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];

        // Rotate around Y-axis
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;

        // Rotate around X-axis
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;

        // Perspective divide
        const scale = fov / (z2 + cameraDist);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        projected.push({ x: px, y: py, z: z2 });
      }

      // 3. Draw Computer Wireframe Edges (Warm Retro Eggshell Phosphor)
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = '#F2ECDD'; // Eggshell warm retro wireframe
      ctx.shadowColor = '#F2ECDD';
      ctx.shadowBlur = 4;

      ctx.beginPath();
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        const p1 = projected[edge.from];
        const p2 = projected[edge.to];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.stroke();

      // 4. Draw Keyboard Key Row Horizontal Dividers (Cadet Gray)
      const pKeyL = projected[40];
      const pKeyR = projected[41];
      const pKeyBL = projected[43];
      const pKeyBR = projected[42];

      if (pKeyL && pKeyR && pKeyBL && pKeyBR) {
        ctx.strokeStyle = 'rgba(165, 169, 174, 0.45)';
        ctx.lineWidth = 1;
        for (let r = 1; r <= 3; r++) {
          const ratio = r / 4;
          const xA = pKeyL.x + (pKeyBL.x - pKeyL.x) * ratio;
          const yA = pKeyL.y + (pKeyBL.y - pKeyL.y) * ratio;
          const xB = pKeyR.x + (pKeyBR.x - pKeyR.x) * ratio;
          const yB = pKeyR.y + (pKeyBR.y - pKeyR.y) * ratio;
          ctx.beginPath();
          ctx.moveTo(xA, yA);
          ctx.lineTo(xB, yB);
          ctx.stroke();
        }
      }

      // 5. Draw Iconic 1984 Colorful "hello" On Monitor Screen
      const pScreenTL = projected[12];
      const pScreenTR = projected[13];
      const pScreenBR = projected[14];
      const pScreenBL = projected[15];

      const sWidth = Math.abs(pScreenTR.x - pScreenTL.x);
      const sHeight = Math.abs(pScreenBL.y - pScreenTL.y);

      if (sWidth > 26 && sHeight > 18) {
        ctx.save();

        const midX = (pScreenTL.x + pScreenTR.x + pScreenBR.x + pScreenBL.x) / 4;
        const midY = (pScreenTL.y + pScreenTR.y + pScreenBR.y + pScreenBL.y) / 4;

        // Iconic 1984 Macintosh style colorful "hello" palette
        const helloLetters = [
          { char: 'h', color: '#FF3B30' }, // Apple Red
          { char: 'e', color: '#FF9500' }, // Apple Orange
          { char: 'l', color: '#FFCC00' }, // Apple Yellow
          { char: 'l', color: '#34C759' }, // Apple Green
          { char: 'o', color: '#007AFF' }, // Apple Blue
        ];

        const fontSize = Math.max(13, Math.min(24, sWidth * 0.26));
        ctx.font = `italic bold ${Math.round(fontSize)}px "Brush Script MT", "Comic Sans MS", "Caveat", cursive, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const totalHelloWidth = fontSize * 2.4;
        const letterSpacing = totalHelloWidth / helloLetters.length;
        const startX = midX - (totalHelloWidth / 2) + (letterSpacing / 2);

        // Glowing colorful letters mapped dynamically to the 3D screen
        ctx.shadowBlur = 6;
        helloLetters.forEach((item, idx) => {
          ctx.fillStyle = item.color;
          ctx.shadowColor = item.color;
          const letterX = startX + idx * letterSpacing;
          const floatY = midY - 3 + Math.sin(frameCount * 0.08 + idx * 0.6) * 1.5;
          ctx.fillText(item.char, letterX, floatY);
        });

        // Subtle retro cursor prompt below hello
        ctx.shadowBlur = 0;
        ctx.font = `${Math.max(7, Math.min(9, sWidth * 0.09))}px monospace`;
        ctx.fillStyle = '#A5A9AE';
        const blink = Math.floor(frameCount / 25) % 2 === 0;
        ctx.fillText(blink ? '> NITIN_OS █' : '> NITIN_OS  ', midX, midY + fontSize * 0.8);

        ctx.restore();
      }

      // 6. Dual Floppy Drive Animated Activity LEDs
      const pDrive1 = projected[25];
      const pDrive2 = projected[29];

      if (pDrive1) {
        // Upper drive LED: flashes on simulated data access
        const isBlinking = frameCount % 40 < 20;
        ctx.fillStyle = isBlinking ? '#00ff66' : '#003311';
        ctx.beginPath();
        ctx.arc(pDrive1.x - 3, pDrive1.y + 3, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (pDrive2) {
        // Lower drive LED: steady amber power indicator
        ctx.fillStyle = '#ffb000';
        ctx.beginPath();
        ctx.arc(pDrive2.x - 3, pDrive2.y + 4, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none cursor-grab active:cursor-grabbing">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-h-[460px] aspect-square object-contain"
        aria-label="Interactive 3D Retro Computer Wireframe Model"
      />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/90 border border-[#5F6266] text-[#F2ECDD] text-[10px] font-mono tracking-wider whitespace-nowrap pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.8)]">
        {isInteracting ? 'ROTATING 3D MODEL • VECTOR PERSPECTIVE' : 'DRAG TO ROTATE 3D WORKSTATION'}
      </div>
    </div>
  );
}
