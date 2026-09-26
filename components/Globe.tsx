'use client';
import createGlobe from 'cobe';

import { useEffect, useRef } from 'react';

type GlobeProps = {
  userLocation: { lat: number; lng: number; city?: string } | null;
};

export default function Globe({ userLocation }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use refs to hold the latest location so we don't recreate the WebGL context!
  const locationRef = useRef<{ lat: number; lng: number } | null>(null);

  // Update ref when state changes
  useEffect(() => {
    locationRef.current = userLocation ? { lat: userLocation.lat, lng: userLocation.lng } : null;
  }, [userLocation]);

  // Pointer Interaction State
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  // Cobe Globe Initialization (v2 Support)
  useEffect(() => {
    if (!canvasRef.current) return;

    let currentPhi = 0;
    let currentTheta = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1200,
      height: 1200,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 60000, // Maximum density for ultra-detailed continents
      mapBrightness: 12,
      baseColor: [1, 1, 1], // Standard V2 contrast color
      markerColor: [0.1, 0.8, 1], // Cyan marker
      glowColor: [1, 1, 1],
      markers: [
        { location: [0, 0], size: 0 }
      ]
    });

    let animationFrameId: number;

    const render = () => {
      const loc = locationRef.current;
      
      let targetPhi = 0;
      let targetTheta = 0;
      let newMarkers: any[] = [];

      if (loc) {
        // EXACT cobe coordinate mapping to center the location perfectly facing the camera
        // In cobe, phi is horizontal rotation (longitude), theta is vertical rotation (latitude)
        targetPhi = Math.PI - ((loc.lng * Math.PI) / 180 - Math.PI / 2);
        targetTheta = (loc.lat * Math.PI) / 180;
        newMarkers = [{ location: [loc.lat, loc.lng], size: 0.05 }];
      }

      // If user is dragging, override horizontal rotation with their drag movement
      if (pointerInteracting.current !== null) {
        const delta = pointerInteracting.current - pointerInteractionMovement.current;
        currentPhi += delta * 0.005; // Dragging changes horizontal rotation (phi)
        pointerInteractionMovement.current = pointerInteracting.current;
      } else if (loc) {
        // Smoothly pan to the exact front-facing angle for this specific location
        currentPhi += (targetPhi - currentPhi) * 0.05;
        currentTheta += (targetTheta - currentTheta) * 0.05;
      } else {
        // Just idle spin slowly when we don't have focus
        currentPhi += 0.002;
      }

      // Dynamically fade out the label if the globe is not centered!
      if (labelRef.current) {
        const isCentered = Math.abs(currentPhi - targetPhi) < 0.1 && Math.abs(currentTheta - targetTheta) < 0.1;
        labelRef.current.style.opacity = isCentered ? '1' : '0';
      }

      globe.update({
        phi: currentPhi,
        theta: currentTheta,
        markers: newMarkers
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
    };
  }, []);

  // Ref to directly control label opacity without React re-renders
  const labelRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full max-w-[600px] aspect-square flex flex-col items-center justify-center mt-12 mx-auto">
      <div className="w-full h-full opacity-90 cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', maxWidth: '600px', aspectRatio: 1 }}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX;
            pointerInteractionMovement.current = e.clientX;
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
          }}
          onPointerMove={(e) => {
            if (pointerInteracting.current !== null) {
              pointerInteracting.current = e.clientX;
            }
          }}
        />
      </div>

      {/* UI Overlay - Styled as a small map pin pointing to the 3D dot */}
      {userLocation && (
        <div 
          ref={labelRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40px] z-10 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-md border border-cyan-500/50 shadow-[0_0_15px_rgba(0,255,255,0.2)] flex items-center justify-center pointer-events-none transition-opacity duration-300"
        >
          <div className="flex flex-col items-center">
            <span className="text-gray-400 font-space text-[8px] tracking-[0.2em] uppercase mb-0.5">Connecting From</span>
            <span className="text-cyan-400 font-space text-[10px] tracking-widest uppercase font-bold">
              {userLocation.city}
            </span>
          </div>
          {/* Downward pointing triangle (the pin tail) */}
          <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-cyan-500/50 drop-shadow-[0_2px_2px_rgba(0,255,255,0.5)]" />
        </div>
      )}
    </div>
  );
}
