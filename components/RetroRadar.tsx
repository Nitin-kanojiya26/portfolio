'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface RetroRadarProps {
  isTransmitting?: boolean;
}

interface VisitorLocation {
  city: string;
  country: string;
  lat: number;
  lng: number;
  ip?: string;
}

export default function RetroRadar({ isTransmitting = false }: RetroRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const [location, setLocation] = useState<VisitorLocation>({
    city: 'Detecting...',
    country: 'Global Node',
    lat: 22.3072,
    lng: 73.1812,
  });

  // Fetch real visitor location like original portfolio
  useEffect(() => {
    let isMounted = true;
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data && data.latitude && data.longitude) {
          setLocation({
            city: data.city || 'Visitor Node',
            country: data.country_name || 'Earth',
            lat: data.latitude,
            lng: data.longitude,
            ip: data.ip,
          });
        }
      })
      .catch(() => {
        if (isMounted) {
          setLocation({
            city: 'Visitor Station',
            country: 'Remote Node',
            lat: 28.6139,
            lng: 77.209,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Radar Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    let pulseRadius = 0;
    const pulses: { r: number; alpha: number }[] = [];

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(centerX, centerY) - 16;

      // Dark phosphor background fade
      ctx.fillStyle = 'rgba(8, 12, 10, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Radar Concentric Range Rings
      const rings = [0.25, 0.5, 0.75, 1.0];
      rings.forEach((scale) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius * scale, 0, Math.PI * 2);
        ctx.strokeStyle = isTransmitting
          ? 'rgba(0, 255, 170, 0.6)'
          : 'rgba(165, 169, 174, 0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash(scale === 1.0 ? [] : [2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Crosshairs (Azimuth axes)
      ctx.beginPath();
      ctx.moveTo(centerX - maxRadius, centerY);
      ctx.lineTo(centerX + maxRadius, centerY);
      ctx.moveTo(centerX, centerY - maxRadius);
      ctx.lineTo(centerX, centerY + maxRadius);
      ctx.strokeStyle = 'rgba(95, 98, 102, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Cardinal direction ticks & labels
      ctx.fillStyle = isTransmitting ? '#00ffaa' : '#F2ECDD';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('N 000°', centerX, centerY - maxRadius + 8);
      ctx.fillText('S 180°', centerX, centerY + maxRadius - 8);
      ctx.fillText('E 090°', centerX + maxRadius - 20, centerY);
      ctx.fillText('W 270°', centerX - maxRadius + 20, centerY);

      // Vadodara Station Blip (Target: Nitin)
      const vadodaraX = centerX + 20;
      const vadodaraY = centerY - 16;
      ctx.beginPath();
      ctx.arc(vadodaraX, vadodaraY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00ffaa';
      ctx.shadowColor = '#00ffaa';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Visitor Station Blip (Calculated from IP)
      const normLat = (location.lat / 90) * 0.65;
      const normLng = (location.lng / 180) * 0.65;
      const visitorX = centerX + normLng * maxRadius;
      const visitorY = centerY - normLat * maxRadius;

      ctx.beginPath();
      ctx.arc(visitorX, visitorY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#F2ECDD';
      ctx.shadowColor = '#F2ECDD';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Smart Non-Merging Entity Callouts:
      // Draw leader line for Nitin to Top-Right
      ctx.beginPath();
      ctx.moveTo(vadodaraX, vadodaraY);
      ctx.lineTo(centerX + maxRadius - 28, centerY - maxRadius + 30);
      ctx.strokeStyle = 'rgba(0, 255, 170, 0.4)';
      ctx.setLineDash([2, 2]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#00ffaa';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('STATION: VADODARA (IN)', centerX + maxRadius - 10, centerY - maxRadius + 30);

      // Draw leader line for Visitor to Bottom-Left
      ctx.beginPath();
      ctx.moveTo(visitorX, visitorY);
      ctx.lineTo(centerX - maxRadius + 28, centerY + maxRadius - 26);
      ctx.strokeStyle = 'rgba(165, 169, 174, 0.45)';
      ctx.setLineDash([2, 2]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#F2ECDD';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`VISITOR: ${location.city.toUpperCase()}`, centerX - maxRadius + 10, centerY + maxRadius - 26);

      // SWEEPING RADAR BEAM
      const sweepSpeed = isTransmitting ? 0.08 : 0.025;
      angle += shouldReduceMotion ? 0 : sweepSpeed;
      if (angle >= Math.PI * 2) angle -= Math.PI * 2;

      // Draw sweeping beam gradient wedge
      const wedgeSegments = 16;
      for (let i = 0; i < wedgeSegments; i++) {
        const segAngle = angle - (i * 0.03);
        const alpha = (1 - i / wedgeSegments) * (isTransmitting ? 0.45 : 0.22);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, maxRadius, segAngle - 0.03, segAngle);
        ctx.fillStyle = isTransmitting
          ? `rgba(0, 255, 170, ${alpha})`
          : `rgba(242, 236, 221, ${alpha * 0.75})`;
        ctx.fill();
      }

      // Beam leading edge line
      const lineX = centerX + Math.cos(angle) * maxRadius;
      const lineY = centerY + Math.sin(angle) * maxRadius;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(lineX, lineY);
      ctx.strokeStyle = isTransmitting ? '#ffffff' : '#F2ECDD';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 🌟 TRANSMISSION ANIMATION (When email is dispatched)
      if (isTransmitting) {
        // High frequency radio signal line connecting visitor to Vadodara
        ctx.beginPath();
        ctx.moveTo(visitorX, visitorY);
        ctx.lineTo(vadodaraX, vadodaraY);
        ctx.strokeStyle = '#00ffaa';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Shockwave rings expanding from transmitter
        pulseRadius += 3.5;
        if (pulseRadius > maxRadius) pulseRadius = 0;

        ctx.beginPath();
        ctx.arc(visitorX, visitorY, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 170, ${Math.max(0, 1 - pulseRadius / maxRadius)})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX, centerY, (pulseRadius * 1.3) % maxRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 229, 255, ${Math.max(0, 1 - (pulseRadius * 1.3) % maxRadius / maxRadius)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Initial clear
    ctx.fillStyle = '#070b09';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [location, isTransmitting, shouldReduceMotion]);

  return (
    <div className="w-full flex flex-col items-center border border-[var(--border-retro)] bg-black p-3 relative shadow-[inset_0_0_25px_rgba(0,0,0,0.85)]">
      {/* Radar Monitor Title Bar */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono border-b border-[var(--border-retro)] pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isTransmitting ? 'bg-emerald-400 animate-ping' : 'bg-[var(--neutral-eggshell)] animate-pulse'
            }`}
          />
          <strong className="text-[var(--text-main)] font-pixel text-xs">
            {isTransmitting ? 'TRANSMITTING SIGNAL' : 'RADAR SCANNER • 360°'}
          </strong>
        </div>
        <span className="text-emerald-400 font-bold text-[10px]">
          {isTransmitting ? '[PACKET SENDING]' : 'CARRIER LOCK'}
        </span>
      </div>

      {/* Canvas Display */}
      <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="w-full h-full object-contain filter contrast-125"
        />

        {/* Scanline CRT overlay */}
        <div className="absolute inset-0 dither-pattern opacity-15 pointer-events-none" />

        {/* Transmission Notification HUD */}
        {isTransmitting && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 bg-black/90 border-2 border-emerald-400 p-2 text-center text-emerald-300 font-mono text-xs shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse">
            <div className="font-pixel text-sm text-emerald-400 mb-0.5">
              ● TRANSMITTING PACKET
            </div>
            <div>UPLINK: ACTIVE • 1420.4 MHz</div>
            <div className="text-[10px] text-white mt-0.5">
              ROUTING TO kanojiyanitin870@gmail.com
            </div>
          </div>
        )}
      </div>

      {/* Radar Telemetry Information */}
      <div className="w-full mt-2 pt-2 border-t border-[#2d2e33] grid grid-cols-2 gap-2 text-[10px] font-mono">
        <div>
          <span className="text-[#8b949e] block text-[9px]">ORIGIN (YOUR NODE):</span>
          <strong className="text-white truncate block">
            {location.city}, {location.country}
          </strong>
        </div>
        <div className="text-right">
          <span className="text-[#8b949e] block text-[9px]">TARGET STATION:</span>
          <strong className="text-emerald-400 block">Vadodara, India</strong>
        </div>
      </div>
    </div>
  );
}

