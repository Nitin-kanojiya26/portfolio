'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

interface RetroRadarProps {
  isTransmitting?: boolean;
}

interface VisitorLocation {
  city: string;
  country: string;
  lat: number;
  lng: number;
  source: 'GPS' | 'IP' | 'DEFAULT';
  ip?: string;
}

// Vadodara Station Coordinates (Nitin's Host Node)
const VADODARA = {
  lat: 22.3072,
  lng: 73.1812,
  name: 'Vadodara, India',
};

// Haversine distance in KM
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Helper to draw a sleek retro map pin on canvas
function drawMapPin(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  badgeText: string,
  isHost: boolean
) {
  const pinH = 16;
  const pinW = 10;
  const topY = y - pinH;

  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;

  // Pin marker teardrop body
  ctx.beginPath();
  ctx.moveTo(x, y); // Pin needle tip touching the coordinate point
  ctx.bezierCurveTo(x - pinW / 2, y - pinH * 0.45, x - pinW / 2, topY, x, topY);
  ctx.bezierCurveTo(x + pinW / 2, topY, x + pinW / 2, y - pinH * 0.45, x, y);
  ctx.fillStyle = color;
  ctx.fill();

  // Pin center core
  ctx.beginPath();
  ctx.arc(x, topY + pinW / 2 - 1, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0c0e';
  ctx.fill();

  // Floating text badge above pin
  ctx.shadowBlur = 0;
  ctx.font = 'bold 8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  const tagY = topY - 3;
  const tw = ctx.measureText(badgeText).width;

  ctx.fillStyle = 'rgba(8, 10, 12, 0.9)';
  ctx.fillRect(x - tw / 2 - 3, tagY - 9, tw + 6, 10);
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.8;
  ctx.strokeRect(x - tw / 2 - 3, tagY - 9, tw + 6, 10);

  ctx.fillStyle = color;
  ctx.fillText(badgeText, x, tagY);

  ctx.restore();
}

// Helper to draw a message airplane structure
function drawMessageAirplane(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.shadowColor = '#00ffaa';
  ctx.shadowBlur = 12;

  // Top wing of paper plane (pure crisp white)
  ctx.beginPath();
  ctx.moveTo(13, 0); // Nose
  ctx.lineTo(-9, -8); // Left wingtip
  ctx.lineTo(-3, -1); // Notch
  ctx.closePath();
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // Bottom wing of paper plane (emerald-tinted white for 3D fold)
  ctx.beginPath();
  ctx.moveTo(13, 0); // Nose
  ctx.lineTo(-9, 8); // Right wingtip
  ctx.lineTo(-3, 1); // Notch
  ctx.closePath();
  ctx.fillStyle = '#bdfce8';
  ctx.fill();

  // Center crease spine
  ctx.beginPath();
  ctx.moveTo(13, 0);
  ctx.lineTo(-7, 0);
  ctx.strokeStyle = '#00ffaa';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Envelope message stamp icon above aircraft
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#00ffaa';
  ctx.font = '9px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('✉', 0, -10);

  ctx.restore();
}

export default function RetroRadar({ isTransmitting = false }: RetroRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const [location, setLocation] = useState<VisitorLocation>({
    city: 'Detecting...',
    country: 'Global Node',
    lat: VADODARA.lat,
    lng: VADODARA.lng,
    source: 'DEFAULT',
  });
  const [isLocating, setIsLocating] = useState(false);

  // Airplane flight animation states
  const [flightActive, setFlightActive] = useState(false);
  const [flightDelivered, setFlightDelivered] = useState(false);
  const flightT = useRef<number>(-1); // -1 = idle, 0..1 = in-flight
  const wasTransmittingRef = useRef(false);

  // Trigger airplane flight animation when transmission starts
  useEffect(() => {
    if (isTransmitting && !wasTransmittingRef.current) {
      setFlightActive(true);
      setFlightDelivered(false);
      flightT.current = 0;
    }
    wasTransmittingRef.current = isTransmitting;
  }, [isTransmitting]);

  // Test flight trigger for manual user preview
  const triggerDemoFlight = () => {
    setFlightActive(true);
    setFlightDelivered(false);
    flightT.current = 0;
  };

  // Location Fetching (GPS with dual IP fallbacks)
  const fetchIpLocation = useCallback(async () => {
    try {
      const res = await fetch('https://ipwho.is/');
      const data = await res.json();
      if (data && data.success && data.latitude && data.longitude) {
        setLocation({
          city: data.city || data.region || 'Visitor Node',
          country: data.country || 'Earth',
          lat: data.latitude,
          lng: data.longitude,
          source: 'IP',
          ip: data.ip,
        });
        return;
      }
    } catch {
      try {
        const res2 = await fetch('https://ipapi.co/json/');
        const data2 = await res2.json();
        if (data2 && data2.latitude && data2.longitude) {
          setLocation({
            city: data2.city || 'Visitor Node',
            country: data2.country_name || 'Earth',
            lat: data2.latitude,
            lng: data2.longitude,
            source: 'IP',
            ip: data2.ip,
          });
          return;
        }
      } catch {
        setLocation({
          city: 'Remote Station',
          country: 'Earth',
          lat: 28.6139,
          lng: 77.209,
          source: 'DEFAULT',
        });
      }
    }
  }, []);

  const requestGpsLocation = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      fetchIpLocation();
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
          );
          const geoData = await geoRes.json();
          const resolvedCity =
            geoData.city ||
            geoData.locality ||
            geoData.principalSubdivision ||
            'Local Station';
          const resolvedCountry = geoData.countryName || 'India';

          setLocation({
            city: resolvedCity,
            country: resolvedCountry,
            lat,
            lng,
            source: 'GPS',
          });
        } catch {
          setLocation({
            city: 'GPS Station',
            country: 'Earth',
            lat,
            lng,
            source: 'GPS',
          });
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        fetchIpLocation();
      },
      {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 60000,
      }
    );
  }, [fetchIpLocation]);

  useEffect(() => {
    requestGpsLocation();
  }, [requestGpsLocation]);

  // Main Radar Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let sweepAngle = 0;
    let landingPulse = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) - 16;

      // Deep clean dark canvas fade
      ctx.fillStyle = 'rgba(9, 11, 13, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // 1. Concentric Range Rings (Minimal & Fine)
      const ringScales = [0.33, 0.66, 1.0];
      ringScales.forEach((s) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * s, 0, Math.PI * 2);
        ctx.strokeStyle = isTransmitting || flightT.current >= 0
          ? 'rgba(0, 255, 170, 0.35)'
          : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = s === 1.0 ? 1.2 : 0.8;
        if (s !== 1.0) ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 2. Subtle Crosshair Lines
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // 3. Station Coordinates Mapping
      // Host Pin (Vadodara) fixed at standard reference location
      const vadodaraX = centerX + radius * 0.42;
      const vadodaraY = centerY - radius * 0.28;

      // User Pin (Calculated from coordinates relative to Vadodara)
      const deltaLng = location.lng - VADODARA.lng;
      const deltaLat = location.lat - VADODARA.lat;

      let visNormX = deltaLng / 120;
      let visNormY = -deltaLat / 60;

      const distFromCenter = Math.hypot(visNormX, visNormY);
      if (distFromCenter > 0.72) {
        visNormX = (visNormX / distFromCenter) * 0.72;
        visNormY = (visNormY / distFromCenter) * 0.72;
      }

      let visitorX = centerX + visNormX * radius;
      let visitorY = centerY + visNormY * radius;

      // If coordinates are too close (e.g. testing in Vadodara), give smart separation so both pins are visible
      if (Math.hypot(visitorX - vadodaraX, visitorY - vadodaraY) < 42) {
        visitorX = vadodaraX - 58;
        visitorY = vadodaraY + 36;
      }

      // 4. Arched Flight Vector Path (Quadratic Bézier Curve)
      const dx = vadodaraX - visitorX;
      const dy = vadodaraY - visitorY;
      const pathDist = Math.hypot(dx, dy);

      let nx = -dy / pathDist;
      let ny = dx / pathDist;
      if (ny > 0) {
        nx = -nx;
        ny = -ny;
      }

      const arcHeight = Math.max(22, Math.min(50, pathDist * 0.32));
      const ctrlX = (visitorX + vadodaraX) / 2 + nx * arcHeight;
      const ctrlY = (visitorY + vadodaraY) / 2 + ny * arcHeight;

      // Draw faint baseline curved flight corridor
      ctx.beginPath();
      ctx.moveTo(visitorX, visitorY - 8);
      ctx.quadraticCurveTo(ctrlX, ctrlY, vadodaraX, vadodaraY - 8);
      ctx.strokeStyle = isTransmitting || flightT.current >= 0
        ? 'rgba(0, 255, 170, 0.4)'
        : 'rgba(0, 229, 255, 0.16)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 5. Sweeping Radar Beam
      const sweepSpeed = isTransmitting || flightT.current >= 0 ? 0.05 : 0.022;
      sweepAngle += shouldReduceMotion ? 0 : sweepSpeed;
      if (sweepAngle >= Math.PI * 2) sweepAngle -= Math.PI * 2;

      const segments = 10;
      for (let i = 0; i < segments; i++) {
        const segAngle = sweepAngle - i * 0.025;
        const alpha = (1 - i / segments) * (isTransmitting || flightT.current >= 0 ? 0.32 : 0.11);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, segAngle - 0.025, segAngle);
        ctx.fillStyle = isTransmitting || flightT.current >= 0
          ? `rgba(0, 255, 170, ${alpha})`
          : `rgba(0, 229, 255, ${alpha})`;
        ctx.fill();
      }

      const edgeX = centerX + Math.cos(sweepAngle) * radius;
      const edgeY = centerY + Math.sin(sweepAngle) * radius;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(edgeX, edgeY);
      ctx.strokeStyle = isTransmitting || flightT.current >= 0 ? '#00ffaa' : 'rgba(0, 229, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 6. Airplane / Message Flight Animation
      if (flightT.current >= 0) {
        const t = Math.min(1, flightT.current);

        // Compute current plane position on quadratic curve
        const oT = 1 - t;
        const planeX = oT * oT * visitorX + 2 * oT * t * ctrlX + t * t * vadodaraX;
        const planeY = oT * oT * (visitorY - 8) + 2 * oT * t * ctrlY + t * t * (vadodaraY - 8);

        // Compute velocity vector tangent for rotation angle
        const vx = 2 * oT * (ctrlX - visitorX) + 2 * t * (vadodaraX - ctrlX);
        const vy = 2 * oT * (ctrlY - (visitorY - 8)) + 2 * t * ((vadodaraY - 8) - ctrlY);
        const planeAngle = Math.atan2(vy, vx);

        // Draw glowing vapor trail from User pin up to airplane
        ctx.beginPath();
        ctx.moveTo(visitorX, visitorY - 8);
        const trailSteps = 24;
        for (let s = 1; s <= trailSteps; s++) {
          const st = (s / trailSteps) * t;
          const sOT = 1 - st;
          const tx = sOT * sOT * visitorX + 2 * sOT * st * ctrlX + st * st * vadodaraX;
          const ty = sOT * sOT * (visitorY - 8) + 2 * sOT * st * ctrlY + st * st * (vadodaraY - 8);
          ctx.lineTo(tx, ty);
        }
        ctx.strokeStyle = '#00ffaa';
        ctx.lineWidth = 1.8;
        ctx.shadowColor = '#00ffaa';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw the Paper Airplane structure
        drawMessageAirplane(ctx, planeX, planeY, planeAngle);

        // Advance flight parameter t
        flightT.current += 0.013; // ~75 frames = ~1.25s per smooth flight

        // Check if airplane landed at Host Pin
        if (flightT.current >= 1.0) {
          flightT.current = -1; // Reset flight
          setFlightDelivered(true);
          landingPulse = 1.0;
          setTimeout(() => {
            setFlightActive(false);
            setFlightDelivered(false);
          }, 2400);
        }
      }

      // 7. Landing Pulse Ripple at Host Pin (when message arrives)
      if (landingPulse > 0) {
        landingPulse -= 0.03;
        const rPulse = (1 - landingPulse) * 32;
        ctx.beginPath();
        ctx.arc(vadodaraX, vadodaraY - 8, rPulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 170, ${landingPulse})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 8. Draw Pins: User Pin & Host Pin
      // USER PIN (Cyan, Origin)
      const userBadge = location.city && location.city !== 'Detecting...'
        ? `YOU: ${location.city.slice(0, 10).toUpperCase()}`
        : 'YOU';
      drawMapPin(ctx, visitorX, visitorY, '#00e5ff', userBadge, false);

      // HOST PIN (Emerald, Destination)
      drawMapPin(ctx, vadodaraX, vadodaraY, '#00ffaa', 'HOST: NITIN', true);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [location, isTransmitting, shouldReduceMotion]);

  const distanceKm = calculateDistanceKm(
    location.lat,
    location.lng,
    VADODARA.lat,
    VADODARA.lng
  );

  return (
    <div className="w-full flex flex-col border border-[var(--border-retro)] bg-[var(--surface-window)] p-3 relative shadow-[var(--shadow-hard-sm)] font-mono text-xs">
      {/* Sleek Minimalist Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-retro)] text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-[var(--text-main)] font-pixel text-xs">
            RADAR_UPLINK
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className={`text-[9px] px-1.5 py-0.5 border font-bold ${
              flightActive || isTransmitting
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 animate-pulse'
                : location.source === 'GPS'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                : 'border-[var(--border-retro)] text-[var(--text-muted)]'
            }`}
          >
            {flightActive || isTransmitting
              ? '✈ AIRPLANE DISPATCHED'
              : location.source === 'GPS'
              ? '● GPS ACCURATE'
              : 'IP ESTIMATE'}
          </span>

          <button
            type="button"
            onClick={triggerDemoFlight}
            title="Preview message airplane transmission"
            className="text-[9px] px-1.5 py-0.5 border border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-black font-bold transition-colors cursor-pointer"
          >
            ✈ TEST FLY
          </button>

          <button
            type="button"
            onClick={requestGpsLocation}
            title="Calibrate exact location via browser GPS"
            className="text-[9px] px-1.5 py-0.5 border border-[var(--border-retro)] bg-[var(--surface-panel)] text-[var(--text-main)] hover:bg-[var(--accent-color)] hover:text-[var(--accent-contrast)] transition-colors cursor-pointer"
          >
            GPS
          </button>
        </div>
      </div>

      {/* Scope Canvas Display with Map Pins & Flight Track */}
      <div className="relative w-full aspect-square max-w-[250px] sm:max-w-[280px] mx-auto flex items-center justify-center my-1">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="w-full h-full object-contain rounded-full border border-[var(--border-retro)] bg-black"
        />

        {/* Transmission Notification HUD */}
        {(flightActive || isTransmitting) && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 bg-black/92 border-2 border-emerald-500 p-2 text-center text-emerald-400 font-mono text-[10px] shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse">
            <span className="font-pixel text-xs block text-white font-bold">
              {flightDelivered ? '● PACKET RECEIVED AT HOST' : '✈ DISPATCHING MESSAGE AIRPLANE'}
            </span>
            <span className="text-[9px] text-[#A5A9AE]">
              {flightDelivered
                ? 'MESSAGE DELIVERED TO NITIN (VADODARA)'
                : 'ORIGIN [YOU] ───✈───> HOST [NITIN]'}
            </span>
          </div>
        )}
      </div>

      {/* Clean Telemetry Grid: User Pin & Host Pin Info */}
      <div className="w-full mt-2 pt-2 border-t border-[var(--border-retro)] grid grid-cols-2 gap-2 text-[10px]">
        <div>
          <span className="text-[var(--text-muted)] block text-[9px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
            USER PIN (YOU):
          </span>
          <strong className="text-[var(--text-main)] truncate block">
            {location.city}, {location.country}
          </strong>
        </div>
        <div className="text-right">
          <span className="text-[var(--text-muted)] block text-[9px] flex items-center justify-end gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffaa]" />
            HOST PIN (NITIN):
          </span>
          <strong className="text-emerald-600 dark:text-emerald-400 block truncate">
            Vadodara, India
          </strong>
        </div>
      </div>

      {/* Flight Vector Status Strip */}
      <div className="w-full mt-1.5 pt-1.5 border-t border-dashed border-[var(--border-retro)] flex items-center justify-between text-[9px] text-[var(--text-muted)]">
        <span>FLIGHT VECTOR:</span>
        <strong className="font-bold text-[var(--text-main)]">
          {distanceKm === 0 ? 'LOCAL AIRSPACE' : `${distanceKm.toLocaleString()} KM • CARRIER READY`}
        </strong>
      </div>
    </div>
  );
}
