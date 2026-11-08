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

// Vadodara Station Coordinates (Nitin's Node)
const VADODARA = {
  lat: 22.3072,
  lng: 73.1812,
  name: 'Vadodara, India',
};

// Great-circle distance using Haversine formula
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

  // Fetch location via IP fallback services
  const fetchIpLocation = useCallback(async () => {
    try {
      // Primary IP service: ipwho.is (fast, generous free limits)
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
      // Fallback IP service: ipapi.co
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
        // Safe default
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

  // Request High-Accuracy Browser GPS Geolocation
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
          // Free reverse geocoding to resolve exact city / locality from GPS coordinates
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
          // Keep GPS coordinates even if reverse lookup times out
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
        // User denied or GPS timed out -> use IP geolocation seamlessly
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

  // Clean Minimalist Radar Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    let packetT = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) - 14;

      // Deep clean dark canvas fade
      ctx.fillStyle = 'rgba(10, 12, 14, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // 1. Concentric Range Rings (Minimal & Fine)
      const ringScales = [0.33, 0.66, 1.0];
      ringScales.forEach((s) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * s, 0, Math.PI * 2);
        ctx.strokeStyle = isTransmitting
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

      // 3. Station Position Coordinates
      // Vadodara Target
      const vOffsetX = ((VADODARA.lng - 70) / 40) * (radius * 0.45);
      const vOffsetY = -((VADODARA.lat - 20) / 30) * (radius * 0.45);
      const vadodaraX = Math.max(centerX - radius + 15, Math.min(centerX + radius - 15, centerX + vOffsetX));
      const vadodaraY = Math.max(centerY - radius + 15, Math.min(centerY + radius - 15, centerY + vOffsetY));

      // Visitor Origin
      const visOffsetX = ((location.lng - 70) / 40) * (radius * 0.45);
      const visOffsetY = -((location.lat - 20) / 30) * (radius * 0.45);
      const visitorX = Math.max(centerX - radius + 15, Math.min(centerX + radius - 15, centerX + visOffsetX));
      const visitorY = Math.max(centerY - radius + 15, Math.min(centerY + radius - 15, centerY + visOffsetY));

      // 4. Subtle Dotted Baseline Vector between Visitor & Vadodara
      ctx.beginPath();
      ctx.moveTo(visitorX, visitorY);
      ctx.lineTo(vadodaraX, vadodaraY);
      ctx.strokeStyle = isTransmitting ? 'rgba(0, 255, 170, 0.6)' : 'rgba(0, 229, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 5. Minimalist Sweeping Beam
      const sweepSpeed = isTransmitting ? 0.07 : 0.022;
      angle += shouldReduceMotion ? 0 : sweepSpeed;
      if (angle >= Math.PI * 2) angle -= Math.PI * 2;

      // Soft sweeping gradient
      const segments = 12;
      for (let i = 0; i < segments; i++) {
        const segAngle = angle - (i * 0.025);
        const alpha = (1 - i / segments) * (isTransmitting ? 0.35 : 0.12);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, segAngle - 0.025, segAngle);
        ctx.fillStyle = isTransmitting
          ? `rgba(0, 255, 170, ${alpha})`
          : `rgba(0, 229, 255, ${alpha})`;
        ctx.fill();
      }

      // Leading beam edge
      const edgeX = centerX + Math.cos(angle) * radius;
      const edgeY = centerY + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(edgeX, edgeY);
      ctx.strokeStyle = isTransmitting ? '#00ffaa' : 'rgba(0, 229, 255, 0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 6. Vadodara Target Station (Pulsing Emerald Beacon)
      ctx.beginPath();
      ctx.arc(vadodaraX, vadodaraY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00ffaa';
      ctx.shadowColor = '#00ffaa';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Faint pulse ring around Vadodara
      const pulsePhase = (Date.now() / 900) % 1;
      ctx.beginPath();
      ctx.arc(vadodaraX, vadodaraY, 3.5 + pulsePhase * 10, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 255, 170, ${1 - pulsePhase})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // 7. Visitor Origin Station (Clean Cyan Beacon)
      ctx.beginPath();
      ctx.arc(visitorX, visitorY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00e5ff';
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 8. Transmission Packet Signal Animation
      if (isTransmitting) {
        packetT = (packetT + 0.04) % 1;
        const curX = visitorX + (vadodaraX - visitorX) * packetT;
        const curY = visitorY + (vadodaraY - visitorY) * packetT;

        ctx.beginPath();
        ctx.arc(curX, curY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00ffaa';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

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

        <div className="flex items-center gap-2">
          <span
            className={`text-[9px] px-1.5 py-0.5 border font-bold ${
              location.source === 'GPS'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                : 'border-[var(--border-retro)] text-[var(--text-muted)]'
            }`}
          >
            {isLocating ? 'LOCATING...' : location.source === 'GPS' ? '● GPS ACCURATE' : 'IP ESTIMATE'}
          </span>
          <button
            type="button"
            onClick={requestGpsLocation}
            title="Calibrate exact location via browser GPS"
            className="text-[9px] px-1.5 py-0.5 border border-[var(--border-retro)] bg-[var(--surface-panel)] text-[var(--text-main)] hover:bg-[var(--accent-color)] hover:text-[var(--accent-contrast)] transition-colors cursor-pointer"
          >
            REFRESH
          </button>
        </div>
      </div>

      {/* Scope Canvas Display */}
      <div className="relative w-full aspect-square max-w-[240px] sm:max-w-[270px] mx-auto flex items-center justify-center my-1">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          className="w-full h-full object-contain rounded-full border border-[var(--border-retro)] bg-black"
        />

        {/* Transmission Notification Overlay */}
        {isTransmitting && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 bg-black/90 border border-emerald-500 p-2 text-center text-emerald-400 font-mono text-[10px] shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse">
            <span className="font-pixel text-xs block text-white">
              ● TRANSMITTING UPLINK
            </span>
            <span>ROUTING TO VADODARA STATION</span>
          </div>
        )}
      </div>

      {/* Clean Minimalist Telemetry Grid */}
      <div className="w-full mt-2 pt-2 border-t border-[var(--border-retro)] grid grid-cols-2 gap-2 text-[10px]">
        <div>
          <span className="text-[var(--text-muted)] block text-[9px]">ORIGIN (YOU):</span>
          <strong className="text-[var(--text-main)] truncate block">
            {location.city}, {location.country}
          </strong>
        </div>
        <div className="text-right">
          <span className="text-[var(--text-muted)] block text-[9px]">TARGET:</span>
          <strong className="text-emerald-600 dark:text-emerald-400 block truncate">
            Vadodara, India
          </strong>
        </div>
      </div>

      {/* Distance Status Strip */}
      <div className="w-full mt-1.5 pt-1.5 border-t border-dashed border-[var(--border-retro)] flex items-center justify-between text-[9px] text-[var(--text-muted)]">
        <span>VECTOR RANGE:</span>
        <strong className="font-bold text-[var(--text-main)]">
          {distanceKm === 0 ? 'SAME LOCAL NODE' : `${distanceKm.toLocaleString()} KM`}
        </strong>
      </div>
    </div>
  );
}
