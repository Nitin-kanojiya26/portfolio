'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
 *  PRODUCTION SYSTEM DESIGN ARCHITECTURE
 *  A real-world distributed system design tracking:
 *  1. Client Ingestion Layer (Web Monaco IDE, Flutter, Webhooks)
 *  2. API Gateway & Security (Spring Security, JWT, Route Proxies)
 *  3. Async Broker & Cache (BullMQ FIFO, Redis Mutex, Sorted Sets)
 *  4. Sandbox Runtime & Data Layer (Docker Cgroups, Postgres, pgvector)
 * ═══════════════════════════════════════════════════════════════ */

interface SystemDesignTier {
  id: string;
  code: string;
  title: string;
  category: string;
  protocol: string;
  hex: string;
  stack: string[];
  role: string;
  rationale: string;
  metric: string;
}

const TIERS: SystemDesignTier[] = [
  {
    id: 'client-ingestion',
    code: '01_CLIENT_INGESTION',
    title: 'CLIENT INGESTION TIER',
    category: 'Web, Mobile & Webhooks',
    protocol: 'HTTPS • WSS • GITHUB WEBHOOKS',
    hex: '#10B981',
    stack: ['React SPA', 'Monaco Code Editor', 'Flutter Mobile', 'GitHub Webhooks', 'Socket.IO Client'],
    role: 'High-throughput ingress tier. Accepts Monaco code submissions, ingests GitHub PR webhook payloads, and maintains bidirectional Socket.IO streams for sub-second terminal verdict streaming.',
    rationale: 'Decouples client submission from heavy execution, returning instant HTTP 200/202 responses while offloading work downstream.',
    metric: '< 15ms Webhook Ingestion ACK',
  },
  {
    id: 'api-gateway',
    code: '02_API_GATEWAY',
    title: 'API GATEWAY & SECURITY',
    category: 'Reverse Proxy & Stateless Auth',
    protocol: 'SPRING SECURITY • STATELESS JWT',
    hex: '#3B82F6',
    stack: ['Java Spring Boot', 'Node.js / Express', 'Spring Security', 'JWT Auth Filter', 'Rate Limiting'],
    role: 'Central ingress controller and security perimeter. Enforces stateless JWT validation, applies rate limiting to throttle burst spam, and routes requests to appropriate microservices.',
    rationale: 'Isolates authentication verification at the edge so downstream worker services remain decoupled, stateless, and protected from unauthorized traffic.',
    metric: '< 25ms Token Verification Latency',
  },
  {
    id: 'async-broker',
    code: '03_ASYNC_BROKER',
    title: 'ASYNC BROKER & CACHE LAYER',
    category: 'Queue Decoupling & Mutex Locking',
    protocol: 'REDIS BULLMQ FIFO • ZSET CACHE',
    hex: '#F59E0B',
    stack: ['Redis BullMQ', 'Redis Sorted Sets', 'In-Memory Mutex Locks', 'Atomic Idempotency'],
    role: 'Asynchronous decoupling broker and high-concurrency micro-cache. Enqueues compilation jobs and AI review tasks into FIFO queues, and caches contest ranks in Redis Sorted Sets.',
    rationale: 'Eliminates the "Thundering Herd" cache stampede during contest spikes using in-memory process mutexes (contestSyncLocks), reducing database reads by 99.9%.',
    metric: 'P95: 20s → 665ms (0.00% Error Rate)',
  },
  {
    id: 'workers-storage',
    code: '04_WORKERS_&_DATA',
    title: 'SANDBOX RUNTIME & DATA LAYER',
    category: 'Docker Sandboxing & Vector AI',
    protocol: 'DOCKER CGROUPS • 768-D PGVECTOR',
    hex: '#8B5CF6',
    stack: ['Docker Sandbox', 'PostgreSQL 16', 'pgvector RAG', 'Google Gemini AI', 'AES-256-GCM'],
    role: 'Isolated execution environment and intelligent vector persistence. Spawns ephemeral Docker containers with cgroup resource limits to execute user code, and queries 768-D vector embeddings for Gemini AI code review.',
    rationale: 'Hardened container sandboxing (128MB RAM, 0.5 CPU, no external network) ensures zero security breaches or host takeover when executing arbitrary code.',
    metric: 'Zero Security Breach • 128MB Cgroup Limit',
  },
];

export default function EngineeringPathVisual() {
  const [activeTierIdx, setActiveTierIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Left-to-right sequential glow wave: 0 -> 1 -> 2 -> 3 -> 0
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveTierIdx((prev) => (prev + 1) % TIERS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const activeTier = TIERS[activeTierIdx];

  return (
    <div className="w-full mt-8 select-none">
      {/* ─── Top Header: System Design Framing & Live Metrics ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-4 border-b border-[var(--border-retro)] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs text-[var(--accent-quiet-text)] font-bold tracking-widest uppercase">
            SYSTEM DESIGN ARCHITECTURE
          </span>
          <span className="hidden md:inline text-[10px] font-mono text-[var(--text-muted)]">
            [EVENT-DRIVEN • ASYNC QUEUES • DOCKER SANDBOX]
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-muted)] self-start sm:self-center">
          <span>LATENCY P95:</span>
          <span className="text-emerald-400 font-bold">665ms</span>
          <span className="opacity-40">•</span>
          <span>BURST ERROR RATE:</span>
          <span className="text-emerald-400 font-bold">0.00%</span>
        </div>
      </div>

      {/* ─── Pure Vector System Design Schematic ─── */}
      <div className="relative w-full overflow-x-auto py-3">
        <div className="min-w-[760px] w-full flex items-center justify-center">
          <svg
            viewBox="0 0 880 175"
            className="w-full h-auto max-h-[195px] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Soft Radial Halos for Glowing Active Objects */}
              <filter id="haloGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ══════════════════════════════════════════════════
             *  DATA STREAM 1: Clients -> Gateway (x: 165 to 275)
             * ══════════════════════════════════════════════════ */}
            <path
              d="M 165,75 L 275,75"
              stroke={activeTierIdx === 0 || activeTierIdx === 1 ? '#10B981' : '#222'}
              strokeWidth={activeTierIdx === 0 ? '2' : '1.5'}
              strokeDasharray="4 4"
              className="transition-colors duration-500"
            />
            {/* Protocol Badge */}
            <text
              x="220"
              y="66"
              textAnchor="middle"
              className="text-[7.5px] font-mono fill-[var(--text-muted)] tracking-wider"
            >
              HTTPS / WSS
            </text>
            {!shouldReduceMotion && (
              <motion.circle
                r={activeTierIdx === 0 ? '4' : '2.5'}
                fill="#10B981"
                style={{
                  filter: activeTierIdx === 0 ? 'drop-shadow(0 0 8px #10B981)' : 'none',
                }}
                cy="75"
                animate={{ cx: [165, 275], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <polygon points="273,72 279,75 273,78" fill="#10B981" />

            {/* ══════════════════════════════════════════════════
             *  DATA STREAM 2: Gateway -> Queue Broker (x: 365 to 495)
             * ══════════════════════════════════════════════════ */}
            <path
              d="M 365,75 L 495,75"
              stroke={activeTierIdx === 1 || activeTierIdx === 2 ? '#3B82F6' : '#222'}
              strokeWidth={activeTierIdx === 1 ? '2' : '1.5'}
              strokeDasharray="4 4"
              className="transition-colors duration-500"
            />
            {/* Protocol Badge */}
            <text
              x="430"
              y="66"
              textAnchor="middle"
              className="text-[7.5px] font-mono fill-[var(--text-muted)] tracking-wider"
            >
              BullMQ Enqueue
            </text>
            {!shouldReduceMotion && (
              <motion.circle
                r={activeTierIdx === 1 ? '4' : '2.5'}
                fill="#3B82F6"
                style={{
                  filter: activeTierIdx === 1 ? 'drop-shadow(0 0 8px #3B82F6)' : 'none',
                }}
                cy="75"
                animate={{ cx: [365, 495], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
              />
            )}
            <polygon points="493,72 499,75 493,78" fill="#3B82F6" />

            {/* ══════════════════════════════════════════════════
             *  DATA STREAM 3: Queue Broker -> Sandbox/Data (x: 585 to 715)
             * ══════════════════════════════════════════════════ */}
            <path
              d="M 585,75 L 715,75"
              stroke={activeTierIdx === 2 || activeTierIdx === 3 ? '#F59E0B' : '#222'}
              strokeWidth={activeTierIdx === 2 ? '2' : '1.5'}
              strokeDasharray="4 4"
              className="transition-colors duration-500"
            />
            {/* Protocol Badge */}
            <text
              x="650"
              y="66"
              textAnchor="middle"
              className="text-[7.5px] font-mono fill-[var(--text-muted)] tracking-wider"
            >
              Docker / pgvector
            </text>
            {!shouldReduceMotion && (
              <motion.circle
                r={activeTierIdx === 2 ? '4' : '2.5'}
                fill="#F59E0B"
                style={{
                  filter: activeTierIdx === 2 ? 'drop-shadow(0 0 8px #F59E0B)' : 'none',
                }}
                cy="75"
                animate={{ cx: [585, 715], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
              />
            )}
            <polygon points="713,72 719,75 713,78" fill="#F59E0B" />

            {/* ══════════════════════════════════════════════════
             *  TIER 01: Client Ingestion (Center at x = 100, y = 75)
             *  Glows Emerald when activeTierIdx === 0
             * ══════════════════════════════════════════════════ */}
            <g
              onClick={() => setActiveTierIdx(0)}
              className="cursor-pointer transition-transform duration-300 hover:scale-105 origin-[100px_75px]"
            >
              {/* Radial Luminous Halo */}
              {activeTierIdx === 0 && (
                <circle cx="100" cy="72" r="44" fill="#10B981" opacity="0.18" filter="url(#haloGlow)" />
              )}

              {/* Web Monitor Screen Frame */}
              <rect
                x="76"
                y="42"
                width="48"
                height="32"
                rx="3"
                className={`transition-all duration-400 ${
                  activeTierIdx === 0
                    ? 'fill-emerald-500/30 stroke-emerald-400 drop-shadow-[0_0_12px_#10B981]'
                    : 'fill-black stroke-[#444]'
                }`}
                strokeWidth={activeTierIdx === 0 ? '2' : '1.5'}
              />
              <line x1="100" y1="74" x2="100" y2="84" stroke={activeTierIdx === 0 ? '#10B981' : '#444'} strokeWidth="1.8" />
              <line x1="88" y1="84" x2="112" y2="84" stroke={activeTierIdx === 0 ? '#10B981' : '#444'} strokeWidth="1.8" />

              {/* Code Brackets in Screen */}
              <text
                x="100"
                y="62"
                textAnchor="middle"
                className={`text-[9px] font-mono font-bold ${
                  activeTierIdx === 0 ? 'fill-emerald-300' : 'fill-[#666]'
                }`}
              >
                &lt;/&gt;
              </text>

              {/* Mobile Device Screen Overlay */}
              <rect
                x="114"
                y="52"
                width="16"
                height="28"
                rx="2"
                className={`transition-all duration-400 ${
                  activeTierIdx === 0
                    ? 'fill-emerald-500/35 stroke-emerald-300 drop-shadow-[0_0_10px_#10B981]'
                    : 'fill-black stroke-[#555]'
                }`}
                strokeWidth={activeTierIdx === 0 ? '1.8' : '1.3'}
              />
              <circle cx="122" cy="76" r="1.5" fill={activeTierIdx === 0 ? '#10B981' : '#666'} />

              {/* Labels */}
              <text
                x="100"
                y="126"
                textAnchor="middle"
                className={`text-[9.5px] font-mono font-bold tracking-wider transition-colors duration-400 ${
                  activeTierIdx === 0 ? 'fill-emerald-400 drop-shadow-[0_0_6px_#10B981]' : 'fill-[var(--text-main)]'
                }`}
              >
                01_CLIENT_INGESTION
              </text>
              <text x="100" y="139" textAnchor="middle" className="text-[8px] font-mono fill-[var(--text-muted)]">
                WEB • MONACO • WEBHOOKS
              </text>
            </g>

            {/* ══════════════════════════════════════════════════
             *  TIER 02: API Gateway & Security (Center at x = 320, y = 75)
             *  Glows Blue when activeTierIdx === 1
             * ══════════════════════════════════════════════════ */}
            <g
              onClick={() => setActiveTierIdx(1)}
              className="cursor-pointer transition-transform duration-300 hover:scale-105 origin-[320px_75px]"
            >
              {/* Radial Luminous Halo */}
              {activeTierIdx === 1 && (
                <circle cx="320" cy="72" r="44" fill="#3B82F6" opacity="0.18" filter="url(#haloGlow)" />
              )}

              {/* Rack Chassis Frame */}
              <rect
                x="294"
                y="40"
                width="52"
                height="46"
                rx="2"
                className={`transition-all duration-400 ${
                  activeTierIdx === 1
                    ? 'fill-blue-500/30 stroke-blue-400 drop-shadow-[0_0_12px_#3B82F6]'
                    : 'fill-black stroke-[#444]'
                }`}
                strokeWidth={activeTierIdx === 1 ? '2' : '1.5'}
              />

              {/* Server Unit 1: Spring Boot */}
              <rect
                x="298"
                y="44"
                width="44"
                height="10"
                rx="1"
                stroke={activeTierIdx === 1 ? '#3B82F6' : '#333'}
                strokeWidth="1.2"
              />
              <circle cx="304" cy="49" r="1.5" fill={activeTierIdx === 1 ? '#60A5FA' : '#555'} />
              <line
                x1="310"
                y1="49"
                x2="336"
                y2="49"
                stroke={activeTierIdx === 1 ? '#60A5FA' : '#333'}
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* Server Unit 2: Express / Node */}
              <rect
                x="298"
                y="58"
                width="44"
                height="10"
                rx="1"
                stroke={activeTierIdx === 1 ? '#3B82F6' : '#333'}
                strokeWidth="1.2"
              />
              <circle cx="304" cy="63" r="1.5" fill={activeTierIdx === 1 ? '#60A5FA' : '#555'} />
              <line
                x1="310"
                y1="63"
                x2="336"
                y2="63"
                stroke={activeTierIdx === 1 ? '#60A5FA' : '#333'}
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* Routing Switch & Shield Unit */}
              <rect
                x="298"
                y="72"
                width="44"
                height="10"
                rx="1"
                stroke={activeTierIdx === 1 ? '#3B82F6' : '#333'}
                strokeWidth="1.2"
              />
              <circle cx="304" cy="77" r="1.5" className={activeTierIdx === 1 ? 'fill-blue-400 animate-ping' : 'fill-[#444]'} />
              <circle cx="312" cy="77" r="1.5" fill={activeTierIdx === 1 ? '#60A5FA' : '#444'} />
              <circle cx="320" cy="77" r="1.5" fill={activeTierIdx === 1 ? '#60A5FA' : '#444'} />

              {/* Labels */}
              <text
                x="320"
                y="126"
                textAnchor="middle"
                className={`text-[9.5px] font-mono font-bold tracking-wider transition-colors duration-400 ${
                  activeTierIdx === 1 ? 'fill-blue-400 drop-shadow-[0_0_6px_#3B82F6]' : 'fill-[var(--text-main)]'
                }`}
              >
                02_API_GATEWAY
              </text>
              <text x="320" y="139" textAnchor="middle" className="text-[8px] font-mono fill-[var(--text-muted)]">
                REVERSE PROXY • JWT AUTH
              </text>
            </g>

            {/* ══════════════════════════════════════════════════
             *  TIER 03: Async Broker & Cache (Center at x = 540, y = 75)
             *  Glows Amber when activeTierIdx === 2
             * ══════════════════════════════════════════════════ */}
            <g
              onClick={() => setActiveTierIdx(2)}
              className="cursor-pointer transition-transform duration-300 hover:scale-105 origin-[540px_75px]"
            >
              {/* Radial Luminous Halo */}
              {activeTierIdx === 2 && (
                <circle cx="540" cy="72" r="44" fill="#F59E0B" opacity="0.18" filter="url(#haloGlow)" />
              )}

              {/* Database Cylinder Side Rails */}
              <line x1="518" y1="46" x2="518" y2="86" stroke={activeTierIdx === 2 ? '#F59E0B' : '#333'} strokeWidth="1.5" />
              <line x1="562" y1="46" x2="562" y2="86" stroke={activeTierIdx === 2 ? '#F59E0B' : '#333'} strokeWidth="1.5" />

              {/* Cylinder Bottom Disc */}
              <ellipse
                cx="540"
                cy="86"
                rx="22"
                ry="7.5"
                className={`transition-all duration-400 ${
                  activeTierIdx === 2
                    ? 'fill-amber-500/25 stroke-amber-400 drop-shadow-[0_0_10px_#F59E0B]'
                    : 'fill-black stroke-[#333]'
                }`}
                strokeWidth={activeTierIdx === 2 ? '1.8' : '1.5'}
              />

              {/* Middle Disc: Redis FIFO Queue Layer */}
              <ellipse
                cx="540"
                cy="66"
                rx="22"
                ry="7.5"
                className={`transition-all duration-400 ${
                  activeTierIdx === 2
                    ? 'fill-amber-500/30 stroke-amber-400 drop-shadow-[0_0_10px_#F59E0B]'
                    : 'fill-black stroke-[#444]'
                }`}
                strokeWidth={activeTierIdx === 2 ? '1.8' : '1.5'}
              />

              {/* Top Disc: Redis Sorted Sets & Mutex Layer */}
              <ellipse
                cx="540"
                cy="46"
                rx="22"
                ry="7.5"
                className={`transition-all duration-400 ${
                  activeTierIdx === 2
                    ? 'fill-amber-500/40 stroke-amber-300 drop-shadow-[0_0_12px_#F59E0B]'
                    : 'fill-black stroke-[#555]'
                }`}
                strokeWidth={activeTierIdx === 2 ? '2' : '1.7'}
              />

              {/* Active Queue Packet Pulse */}
              <circle
                cx="540"
                cy="66"
                r="3"
                className={activeTierIdx === 2 ? 'fill-amber-400 animate-ping' : 'fill-[#444]'}
              />

              {/* Labels */}
              <text
                x="540"
                y="126"
                textAnchor="middle"
                className={`text-[9.5px] font-mono font-bold tracking-wider transition-colors duration-400 ${
                  activeTierIdx === 2 ? 'fill-amber-400 drop-shadow-[0_0_6px_#F59E0B]' : 'fill-[var(--text-main)]'
                }`}
              >
                03_ASYNC_BROKER_&amp;_CACHE
              </text>
              <text x="540" y="139" textAnchor="middle" className="text-[8px] font-mono fill-[var(--text-muted)]">
                REDIS BULLMQ • MUTEX LOCKS
              </text>
            </g>

            {/* ══════════════════════════════════════════════════
             *  TIER 04: Sandbox Runtime & Data Layer (Center at x = 760, y = 75)
             *  Glows Purple when activeTierIdx === 3
             * ══════════════════════════════════════════════════ */}
            <g
              onClick={() => setActiveTierIdx(3)}
              className="cursor-pointer transition-transform duration-300 hover:scale-105 origin-[760px_75px]"
            >
              {/* Radial Luminous Halo */}
              {activeTierIdx === 3 && (
                <circle cx="760" cy="72" r="44" fill="#8B5CF6" opacity="0.18" filter="url(#haloGlow)" />
              )}

              {/* Isometric Sandbox Top Face */}
              <polygon
                points="760,42 788,57 760,72 732,57"
                className={`transition-all duration-400 ${
                  activeTierIdx === 3
                    ? 'fill-purple-500/40 stroke-purple-300 drop-shadow-[0_0_12px_#8B5CF6]'
                    : 'fill-black stroke-[#555]'
                }`}
                strokeWidth={activeTierIdx === 3 ? '2' : '1.5'}
              />

              {/* Left Face */}
              <polygon
                points="732,57 760,72 760,102 732,87"
                className={`transition-all duration-400 ${
                  activeTierIdx === 3
                    ? 'fill-purple-500/25 stroke-purple-400 drop-shadow-[0_0_10px_#8B5CF6]'
                    : 'fill-black stroke-[#444]'
                }`}
                strokeWidth={activeTierIdx === 3 ? '1.8' : '1.5'}
              />

              {/* Right Face */}
              <polygon
                points="760,72 788,57 788,87 760,102"
                className={`transition-all duration-400 ${
                  activeTierIdx === 3
                    ? 'fill-purple-500/30 stroke-purple-400 drop-shadow-[0_0_10px_#8B5CF6]'
                    : 'fill-black stroke-[#333]'
                }`}
                strokeWidth={activeTierIdx === 3 ? '1.8' : '1.5'}
              />

              {/* Core Execution & Vector Intelligence Node */}
              <circle
                cx="760"
                cy="72"
                r="4.5"
                className={activeTierIdx === 3 ? 'fill-purple-300 animate-pulse' : 'fill-[#444]'}
              />

              {/* Labels */}
              <text
                x="760"
                y="126"
                textAnchor="middle"
                className={`text-[9.5px] font-mono font-bold tracking-wider transition-colors duration-400 ${
                  activeTierIdx === 3 ? 'fill-purple-400 drop-shadow-[0_0_6px_#8B5CF6]' : 'fill-[var(--text-main)]'
                }`}
              >
                04_WORKERS_&amp;_DATA_LAYER
              </text>
              <text x="760" y="139" textAnchor="middle" className="text-[8px] font-mono fill-[var(--text-muted)]">
                DOCKER CGROUPS • PGVECTOR
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* ─── System Design Specification & Telemetry Bar ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTier.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
          className="mt-2 pt-3 border-t border-[var(--border-retro)] flex flex-col lg:flex-row lg:items-start justify-between gap-4 font-mono text-[11px]"
        >
          {/* Active Tier System Design Function & Rationale */}
          <div className="flex-1 max-w-2xl space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTier.hex }} />
              <strong className="text-white tracking-wider text-xs">{activeTier.title}</strong>
              <span className="text-[10px] text-[var(--text-muted)]">•</span>
              <span className="text-[10px] font-bold" style={{ color: activeTier.hex }}>
                {activeTier.protocol}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 bg-[var(--surface-window)] border border-[var(--border-retro)] text-[var(--accent-quiet-text)]">
                {activeTier.metric}
              </span>
            </div>

            <p className="text-[11px] font-sans text-[var(--text-main)] leading-relaxed">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mr-1">ROLE:</span>
              {activeTier.role}
            </p>

            <p className="text-[11px] font-sans text-[var(--text-muted)] leading-relaxed">
              <span className="font-mono text-[10px] text-amber-500/90 uppercase tracking-wider mr-1">DESIGN DECISION:</span>
              {activeTier.rationale}
            </p>
          </div>

          {/* Technology Stack Chips for Current Tier */}
          <div className="flex flex-col gap-1.5 self-start lg:items-end">
            <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
              PRODUCTION STACK:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 lg:justify-end">
              {activeTier.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[9.5px] font-mono px-2 py-0.5 bg-[var(--surface-window)] border border-[var(--border-retro)] text-[var(--text-main)] transition-colors hover:border-[var(--accent-quiet)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
