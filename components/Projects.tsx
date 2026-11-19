'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import RetroWindow from './RetroWindow';
import { Terminal, Wallet, FileText, Bot, Globe, Compass, GraduationCap } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface BenchmarkMetric {
  label: string;
  value: string;
  detail: string;
}

interface ProjectCaseStudy {
  id: string;
  name: string;
  title: string;
  badge: string;
  isLive: boolean;
  category: string;
  tagline: string;
  oneLiner: string;
  tech: string[];
  problem: string;
  built: string;
  hardProblem: string;
  solution: string;
  results: string;
  githubUrl: string;
  liveUrl?: string;
  icon: any;
  img?: string;
  logoBg?: string;
  iconColor?: string;
  metrics: string;
  benchmarks?: BenchmarkMetric[];
}

export default function Projects() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const projects: ProjectCaseStudy[] = [
    {
      id: 'codexium',
      name: 'Codexium',
      title: 'Codexium — Coding Platform with Backend Build Mode',
      badge: '● LIVE IN PRODUCTION',
      isLive: true,
      category: 'DISTRIBUTED SYSTEMS & CONTAINER RUNTIME',
      tagline: 'Online compilation environment with Docker Build Mode for live Express APIs & async queues',
      oneLiner: 'Full-stack online judge (React, Node.js, MongoDB) featuring Monaco editor, live contests, real-time leaderboards, and isolated Docker Build Mode for Express.js microservices.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'BullMQ', 'Socket.IO', 'Docker', 'Judge0', 'k6'],
      problem: 'Traditional online judges (LeetCode, Codeforces) strictly evaluate single-file algorithmic functions using stdin/stdout. They completely fail to evaluate how backend engineers build production software: multi-route REST APIs, database schemas, validation middleware, and HTTP status codes. Furthermore, during live contest spikes, unindexed queries caused catastrophic DB lock contention (12.6s P95 leaderboard latency) and synchronous compilation blocked the Node.js event loop (>20s latency, 40% HTTP drops, ~200 req/sec polling storms).',
      built: 'Built a full-stack online judge (React, Node.js, MongoDB) with a Monaco editor, dual execution engines (self-hosted Judge0 with automatic zero-downtime failover to OnlineCompiler.io), and live contest leaderboards. Engineered "Docker Build Mode": user-submitted Express.js REST APIs run inside isolated, hardened Docker containers (128MB RAM, 0.5 CPU, read-only root FS, non-root user, network disabled) and are evaluated by an automated HTTP test harness over an isolated Docker bridge network. Implemented a hybrid cloud-to-local worker daemon polling BullMQ outbound to execute sandboxed builds without opening public ports.',
      hardProblem: 'Eliminating the "Thundering Herd" cache stampede on leaderboards during contest bursts and stopping synchronous compilation from freezing Node.js event loops.',
      solution: 'Replaced synchronous execution with asynchronous BullMQ/Redis worker queues and bidirectional Socket.IO live verdict streaming, eliminating 85% of redundant HTTP polling. Neutralized cache stampedes using a multi-tiered architecture: a 2-second Redis micro-cache (contest:${id}:leaderboard), an in-memory process mutex (contestSyncLocks) ensuring only one DB query executes during a cache miss, and background synchronization into Redis Sorted Sets (ZADD/ZREVRANGE) for O(log(N)) rank recalculation.',
      results: 'Benchmarked with 100 concurrent virtual users via k6: slashed P95 leaderboard latency from 12,637 ms to 271 ms (46.6x speedup, 97.8% latency reduction) and reduced database reads by 99.9%. Dropped P95 submission ingestion from >20,000 ms to 665 ms, cutting burst HTTP error rate from 40.0% to 0.00% (zero dropped requests; 500/500 requests OK).',
      githubUrl: 'https://github.com/Nitin-kanojiya26/Coding-platform',
      liveUrl: 'https://coding-platform-frontend.vercel.app',
      icon: Terminal,
      logoBg: 'bg-[#111111] border-2 border-white/20',
      iconColor: 'text-white',
      metrics: 'P95: 20s → 665ms • 46.6x Leaderboard (-99.9% DB reads) • 0.00% Error Rate',
      benchmarks: [
        { label: 'LEADERBOARD P95', value: '271 ms', detail: '46.6x faster (was 12,637 ms uncached)' },
        { label: 'DATABASE READS', value: '-99.9%', detail: 'Redis Sorted Sets + Stampede Mutex' },
        { label: 'SUBMISSION P95', value: '665 ms', detail: 'Async BullMQ workers (was >20,000 ms)' },
        { label: 'BURST ERROR RATE', value: '0.00%', detail: 'Zero dropped requests @ 100 concurrent VUs' },
      ],
    },
    {
      id: 'vigilentia',
      name: 'Vigilentia (GitPR Bot)',
      title: 'Vigilentia – AI-Powered GitHub PR Reviewer',
      badge: '● LIVE IN PRODUCTION',
      isLive: true,
      category: 'AI INFRASTRUCTURE & DEVELOPER TOOLING',
      tagline: 'Autonomous GitHub App enforcing engineering guidelines via pgvector RAG & Gemini',
      oneLiner: 'Autonomous GitHub App and review analytics dashboard that intercepts PR diffs, retrieves vector-embedded style guide rules via pgvector, and writes line-accurate review feedback.',
      tech: ['Node.js', 'TypeScript', 'Probot', 'Google Gemini', 'PostgreSQL', 'pgvector', 'Redis', 'BullMQ', 'AES-256-GCM'],
      problem: 'Engineering teams suffer from code review fatigue and forgotten style guides. Generic AI review bots timeout on GitHub 10s webhooks and hallucinate invalid line numbers, triggering HTTP 422 errors.',
      built: 'Built an AI-powered GitHub App that automatically reviews Pull Requests and identifies potential bugs, security vulnerabilities, and coding-standard violations.',
      hardProblem: 'Large PR diffs exceed LLM context windows, and hallucinations on line numbers cause webhook failures.',
      solution: 'Implemented RAG using Gemini embeddings and PostgreSQL pgvector to retrieve repository-specific coding guidelines for context-aware reviews. Designed asynchronous review processing with BullMQ and Redis, implementing atomic idempotency locks and retry mechanisms to prevent duplicate processing. Integrated AI-generated inline comments with changed-line validation and AES-256-GCM encryption for user-provided Gemini API keys.',
      results: 'Engineered sub-15ms webhook ingestion responding with HTTP 200 OK while offloading analysis to BullMQ workers with atomic Redis idempotency locks. Filtered files via parse-diff to build legal line sets (dropping out-of-diff comments) and embedded diffs with 768-D vectors in PostgreSQL 16 (126 automated Vitest tests).',
      githubUrl: 'https://github.com/Nitin-kanojiya26/vigilentia',
      liveUrl: 'https://gitpr-bot.onrender.com',
      icon: Bot,
      img: '/projects/vigilentia-logo.png',
      logoBg: 'bg-transparent border-0 shadow-none',
      iconColor: 'text-white',
      metrics: 'pgvector RAG • Sub-15ms Webhook Ingestion • AES-256-GCM',
      benchmarks: [
        { label: 'WEBHOOK INGESTION', value: '< 15 ms', detail: 'Immediate 200 OK via BullMQ event queue' },
        { label: 'EMBEDDING VECTORS', value: '768-D', detail: 'Google Gemini + pgvector HNSW indexing' },
        { label: 'AUTOMATED TESTS', value: '126 Tests', detail: 'Vitest suite across webhook & parsing' },
        { label: 'SECRET SECURITY', value: 'AES-256', detail: 'GCM authenticated encryption for API keys' },
      ],
    },
    {
      id: 'ai-expense-tracker',
      name: 'AI Expense Tracker',
      title: 'AI Expense Tracker — SpentAi',
      badge: '● LIVE IN PRODUCTION',
      isLive: true,
      category: 'FINTECH & FULL-STACK BACKEND',
      tagline: 'Adaptive finance platform with Java Spring Boot, PostgreSQL & Gemini AI',
      oneLiner: 'Full-stack financial management platform with decoupled React frontend and Java Spring Boot REST API, featuring adaptive dynamic category creation powered by Google Gemini AI.',
      tech: ['Java', 'Spring Boot', 'React.js', 'PostgreSQL', 'Google Gemini AI', 'Spring Security', 'JWT', 'REST APIs'],
      problem: 'Manual expense logging causes entry fatigue, while traditional rigid apps force spending into an inflexible list of pre-defined categories.',
      built: 'Designed a decoupled architecture with a React.js frontend and a Spring Boot REST API backed by PostgreSQL, and built a responsive dashboard that visualizes live transactions by category.',
      hardProblem: 'Handling unstructured, novel expense types without failing validation or falling back to a generic "Other" bucket.',
      solution: 'Integrated the Google Gemini API to parse raw transaction text, auto-categorize expenses, and generate personalized budget predictions. Added dynamic category creation: when an expense matches no existing category, Gemini generates and saves a new one, so categorization adapts instead of relying on a fixed list. Secured the API with stateless JWT authentication and password hashing using Spring Security.',
      results: 'Deployed live on Vercel with stateless JWT authentication, password hashing, and a responsive React financial dashboard with deterministic palette visualization.',
      githubUrl: 'https://github.com/Nitin-kanojiya26/expense-tracker-ai',
      liveUrl: 'https://expense-tracker-ai-theta.vercel.app/',
      icon: Wallet,
      logoBg: 'bg-[#3b82f6] shadow-lg shadow-blue-500/20',
      iconColor: 'text-white',
      metrics: 'Gemini Dynamic Semantic Categories • Spring Security JWT',
      benchmarks: [
        { label: 'CLASSIFICATION', value: 'Dynamic', detail: 'Zero hardcoded fallback buckets via Gemini' },
        { label: 'AUTH LATENCY', value: '< 25 ms', detail: 'Stateless Spring Security JWT tokens' },
        { label: 'DATABASE', value: 'PostgreSQL', detail: 'Normalized relational ledger schema' },
        { label: 'ARCHITECTURE', value: 'Decoupled', detail: 'Spring Boot REST + React SPA on Vercel' },
      ],
    },
    {
      id: 'smartdoc',
      name: 'SmartDoc',
      title: 'SmartDoc — AI Document Intelligence Mobile App',
      badge: 'CROSS-PLATFORM • SQLITE & GEMINI',
      isLive: false,
      category: 'MOBILE APPLICATION & DOCUMENT AI',
      tagline: 'PDF management and interactive AI question-answering powered by Flutter & Gemini',
      oneLiner: 'Mobile application built in Flutter and Dart that ingests dense PDFs, indexes documents on-device with SQLite, and uses Google Gemini AI for instant summarization and contextual Q&A.',
      tech: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'SQLite (sqflite)', 'Google Gemini API', 'Syncfusion PDF'],
      problem: 'Navigating dense, multi-page PDFs on mobile screens is slow and inefficient for students and researchers.',
      built: 'Developed a cross-platform Flutter application with on-device SQLite indexing, cloud-synced progress via Firebase, and Gemini AI for instant document summarization and Q&A.',
      hardProblem: 'Balancing fast offline document management with cloud synchronization and streaming AI responses on mobile.',
      solution: 'Combined local SQLite caching for fast document indexing with Firebase Firestore for cross-device state and Gemini API for natural language extraction.',
      results: 'Smooth Syncfusion PDF reading with integrated text-to-speech (TTS), dynamic light/dark theming, and real-time AI document queries.',
      githubUrl: 'https://github.com/Nitin-kanojiya26/SmartDoc',
      icon: FileText,
      img: '/projects/smartdoc-logo.jpg',
      logoBg: 'bg-black/90 border-2 border-white/20',
      iconColor: 'text-white',
      metrics: '',
    },
    {
      id: 'college-recommender',
      name: 'College Recommender',
      title: 'College Recommendation System',
      badge: 'ALGORITHMS • WEIGHTED RANKING',
      isLive: false,
      category: 'WEB PLATFORM & SEARCH ALGORITHMS',
      tagline: 'Weighted recommendation engine with Python, Django & MySQL',
      oneLiner: 'Algorithmic search and recommendation platform that ranks academic institutions based on multi-parameter student preference matching.',
      tech: ['Python', 'Django', 'MySQL', 'REST APIs', 'Bootstrap'],
      problem: 'Prospective students struggle to find suitable colleges matching their combined preferences for tuition, placement metrics, geographic location, and institutional ratings.',
      built: 'Designed a weighted ranking algorithm in Python/Django that scores and ranks colleges based on placement rate, tuition, ratings, and location, matched against student preferences. Built a student-facing bookmarking feature allowing users to search colleges, save favorites, and browse by category.',
      hardProblem: 'Ensuring fast search response times and ranking consistency across complex multi-attribute database queries.',
      solution: 'Structured a normalized MySQL database schema with indexed ranking weights and an admin-managed interface for maintaining listings and ensuring sub-100ms search.',
      results: 'Delivered intuitive college comparison workflows with persistent student bookmarking and zero-friction admin management.',
      githubUrl: 'https://github.com/Nitin-kanojiya26/College_Recommendation_and_Ranking_System',
      icon: Compass,
      logoBg: 'bg-[#0d9488] shadow-lg shadow-teal-500/20',
      iconColor: 'text-white',
      metrics: '',
    },
    {
      id: 'classpluse',
      name: 'ClassPluse',
      title: 'ClassPluse — Face Recognition Attendance & Classroom Portal',
      badge: 'C# • ASP.NET CORE • DLIB',
      isLive: false,
      category: 'BIOMETRIC ATTENDANCE & LMS',
      tagline: 'Attendance system using C#, Dlib face recognition & 15-second dynamic QR codes',
      oneLiner: 'Automated attendance platform combining C# Dlib face recognition with 15-second rotating dynamic QR codes to eliminate proxy attendance.',
      tech: ['C#', 'ASP.NET Core', 'FaceRecognitionDotNet', 'Dlib', 'ResNet', 'Entity Framework Core'],
      problem: 'Traditional roll calls waste lecture time, and static QR codes are vulnerable to proxy attendance via screenshot sharing.',
      built: 'Built an attendance platform where teachers project dynamic QR codes that refresh every 15 seconds. Students verify their identity via C# face recognition with single-face validation. Includes automated @classpluse email provisioning via SMTP, Excel attendance export for teachers, and dashboard alerts for attendance < 75%.',
      hardProblem: 'Preventing proxy attendance from static QR screenshots while ensuring biometric accuracy as student appearance changes over time.',
      solution: 'Combined a 15-second rotating QR code loop with dynamic face embedding updates in C#, replacing the stored face vector upon each successful verification.',
      results: 'Eliminates proxy attendance, enables one-click Excel attendance exports, and triggers automatic alerts for attendance below 75%.',
      githubUrl: 'https://github.com/Nitin-kanojiya26/ClassPluse',
      icon: GraduationCap,
      logoBg: 'bg-[#1f2328] border-2 border-white/20',
      iconColor: 'text-white',
      metrics: '15s Rotating QR • Dlib Face Recognition • <75% Warning Alert',
    },
  ];

  const activeProject = projects[activeProjectIndex];

  // Dedicated wheel scrolling specifically on the CRT Monitor Image Viewport
  const handleMonitorWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 18) {
      if (e.deltaY > 0) {
        setActiveProjectIndex((prev) => (prev + 1) % projects.length);
      } else {
        setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        setActiveProjectIndex((prev) => (prev + 1) % projects.length);
      } else {
        setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    }
    setTouchStartY(null);
  };

  return (
    <section
      id="projects"
      className="w-full py-2 sm:py-4 px-2 sm:px-4 md:px-8 max-w-[1440px] mx-auto"
    >
      <div className="w-full">
        <RetroWindow
          title="03_PROJECTS.SH"
          badge="FLAGSHIP_WORKS"
          statusText={`SELECTED: [0${activeProjectIndex + 1}] ${activeProject.name.toUpperCase()} • ${activeProject.isLive ? 'LIVE IN PRODUCTION' : 'ACTIVE REPO'}`}
          pathText={`DIR: /PROJECTS/${activeProject.id.toUpperCase()}`}
        >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5 pb-3 border-b-2 border-[var(--border-retro)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-widest font-bold">
                PROJECTS (FROM RESUME)
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-pixel font-bold text-[var(--text-main)] tracking-tight">
              FEATURED PROJECTS
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono max-w-md">
            Click any project to view architecture, tech stack, and GitHub / live links.
          </p>
        </div>

        {/* 🌟 1. LARGER QUICK-SELECTOR PROJECT DOCK (High-Visibility, Generous Padding) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 mb-10">
          {projects.map((p, idx) => {
            const isActive = activeProjectIndex === idx;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProjectIndex(idx)}
                className={`retro-btn p-3.5 sm:p-4 text-left flex flex-col justify-between border-2 transition-all cursor-pointer min-h-[90px] sm:min-h-[105px] relative group ${
                  isActive
                    ? 'border-[var(--accent-color)] bg-[var(--surface-window)] shadow-[var(--shadow-hard)] ring-2 ring-[var(--accent-color)]/30 -translate-y-1'
                    : 'border-[var(--border-retro)] bg-[var(--surface-panel)] opacity-85 hover:opacity-100 hover:border-[var(--accent-quiet)]'
                }`}
              >
                {/* Subtle Sage Corner Accent on Hover */}
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-transparent group-hover:border-[var(--accent-quiet)] transition-colors pointer-events-none" />

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[var(--accent-quiet-text)] font-bold">
                    [0{idx + 1}]
                  </span>
                  {p.isLive ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-500 px-2 py-0.5 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      LIVE
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono border border-[var(--accent-quiet)]/50 bg-[var(--accent-quiet-bg)]/40 text-[var(--accent-quiet-text)] px-1.5 py-0.5 font-bold">
                      REPO
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <p.icon size={18} className={isActive ? 'text-[var(--accent-color)]' : 'text-[var(--text-main)]'} />
                  <span className="text-xs sm:text-sm font-pixel font-bold text-[var(--text-main)] truncate">
                    {p.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 🌟 2. BIG SCREEN-FILLING WORKSTATION DISPLAY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Big Retro CRT Monitor Screen & DIRECT ACTION BUTTONS */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Monitor Screen Frame */}
            <div className="retro-window p-3 sm:p-4 bg-[var(--surface-panel)] border-2 border-[var(--border-retro)] shadow-[var(--shadow-hard-lg)]">
              {/* Monitor Titlebar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-retro)] text-[11px] font-pixel bg-[var(--surface-titlebar)] px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>CRT_PREVIEW_CH_0{activeProjectIndex + 1}.RAW</span>
                </div>
                <span className="text-[var(--accent-color)] font-mono font-bold">
                  {activeProject.id.toUpperCase()}
                </span>
              </div>

              {/* CRT Inner Screen (Scrollable only when hovering/touching inside this monitor) */}
              <div
                onWheel={handleMonitorWheel}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                title="Scroll inside screen or click tabs above to switch projects"
                className="relative aspect-[4/3] w-full bg-black border border-[var(--border-retro)] p-5 flex flex-col justify-between overflow-hidden text-[var(--neutral-eggshell)] font-pixel shadow-[inset_0_0_30px_rgba(0,0,0,0.85)] cursor-ns-resize select-none"
              >
                {/* CRT Scanline & Phosphor Overlay */}
                <div className="absolute inset-0 dither-pattern opacity-25 pointer-events-none" />
                <div className="absolute inset-0 crt-screen-overlay pointer-events-none" />

                {/* Top Channel Telemetry */}
                <div className="relative z-10 flex items-center justify-between text-xs border-b border-[var(--border-retro)] pb-2">
                  <span>CHANNEL: [0{activeProjectIndex + 1}]</span>
                  <span className="text-emerald-400 font-mono text-[10px]">
                    {activeProject.isLive ? '● BROADCAST LIVE' : 'SOURCE CODE READY'}
                  </span>
                </div>

                {/* Central Dynamic Project Graphic (Original Logo + Crisp Pure White Name) */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center p-4 w-full h-full min-h-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject.id}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center justify-center gap-3 text-center"
                    >
                      {/* Original Project Logo Box */}
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl ${activeProject.logoBg || 'bg-[#111111] border border-white/20'}`}>
                        {activeProject.img ? (
                          <Image
                            src={activeProject.img}
                            alt={activeProject.title}
                            fill
                            className="object-contain p-2"
                            priority
                          />
                        ) : (
                          <activeProject.icon size={44} strokeWidth={2.2} className={activeProject.iconColor || "text-white"} />
                        )}
                      </div>

                      {/* Project Name in Bold Pure White */}
                      <div className="text-2xl sm:text-3xl font-pixel font-bold tracking-wider text-white text-center drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)]">
                        {activeProject.id === 'codexium' ? (
                          <>Code<span className="text-[#3b82f6]">xium</span></>
                        ) : activeProject.id === 'ai-expense-tracker' ? (
                          <>Spent<span className="text-white">AI</span></>
                        ) : activeProject.id === 'vigilentia' ? (
                          <>Vigilentia <span className="text-white/90 text-lg sm:text-xl font-mono">(GitPR)</span></>
                        ) : (
                          <span className="text-white">{activeProject.name}</span>
                        )}
                      </div>

                      {/* Clean Subtitle in Legible Light Gray */}
                      <p className="text-xs font-mono text-[#D1D5DB] text-center max-w-xs leading-relaxed">
                        {activeProject.tagline}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Instruction Bar */}
                <div className="relative z-10 text-[10px] font-mono border-t border-[var(--border-retro)] pt-2 flex justify-end text-[var(--text-muted)]">
                  <span className="text-[var(--neutral-eggshell)] font-bold text-[9px]">[SCROLL ON MONITOR TO CYCLE]</span>
                </div>
              </div>
            </div>

            {/* 🌟 BIG UNMISSABLE ACTION BUTTONS (LIVE LINK + GITHUB REPO) */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {activeProject.isLive && activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn flex-1 py-4 px-4 font-pixel text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-2 border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-950/80 dark:text-emerald-300 dark:hover:bg-emerald-400 dark:hover:text-black transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <Globe size={18} className="text-white dark:text-emerald-400 animate-pulse" />
                  <span>[▶] LAUNCH LIVE APP</span>
                </a>
              )}

              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn flex-1 py-4 px-4 font-pixel text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-2 border-[var(--border-retro)] bg-[var(--surface-panel)] text-[var(--text-main)] hover:bg-[var(--accent-color)] hover:text-[var(--accent-contrast)]"
              >
                <FaGithub size={18} />
                <span>GITHUB REPO</span>
              </a>
            </div>

          </div>

          {/* Right Column: In-Depth Technical Dossier & Case Study */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="retro-window p-6 sm:p-8 bg-[var(--surface-window)] border-2 border-[var(--border-retro)] shadow-[var(--shadow-hard-lg)]"
              >
              
              {/* Category & Live Status Banner */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-retro)] pb-3 mb-4">
                <span className="px-3 py-1 text-xs font-mono border border-[var(--border-retro)] bg-[var(--surface-panel)] text-[var(--accent-color)] font-bold">
                  {activeProject.badge}
                </span>

                <span className="text-xs font-mono text-[var(--text-muted)]">
                  CATEGORY: {activeProject.category}
                </span>
              </div>

              {/* Title & 1-Liner Summary */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-pixel font-bold text-[var(--text-main)] mb-2">
                {activeProject.title}
              </h3>

              {/* 5-Second Comprehension Line */}
              <div className="p-4 border-l-4 border-[var(--accent-quiet)] bg-[var(--accent-quiet-bg)]/35 text-sm sm:text-base font-sans text-[var(--text-main)] mb-6 leading-relaxed">
                <strong className="font-mono text-xs text-[var(--accent-quiet-text)] uppercase tracking-wider block mb-1 font-bold">
                  EXECUTIVE SUMMARY
                </strong>
                {activeProject.oneLiner}
              </div>

              {/* Tech Stack Matrix */}
              <div className="mb-6">
                <strong className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-2 font-bold">
                  TECHNOLOGY STACK
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-mono border border-[var(--accent-quiet)]/50 bg-[var(--accent-quiet-bg)]/30 text-[var(--accent-quiet-text)] font-medium hover:border-[var(--accent-quiet)] hover:bg-[var(--accent-quiet-bg)]/60 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detailed 4-Point Engineering Breakdown */}
              <div className="space-y-4 text-xs sm:text-sm font-sans border-t border-[var(--border-retro)] pt-5">
                
                {/* 1. Problem */}
                <div>
                  <strong className="font-mono text-xs text-[var(--accent-color)] uppercase tracking-wider block mb-1">
                    1. The Real-World Engineering Problem
                  </strong>
                  <p className="text-[var(--text-muted)] leading-relaxed font-sans">{activeProject.problem}</p>
                </div>

                {/* 2. What I Built */}
                <div>
                  <strong className="font-mono text-xs text-[var(--accent-color)] uppercase tracking-wider block mb-1">
                    2. Architecture &amp; System Implementation
                  </strong>
                  <p className="text-[var(--text-muted)] leading-relaxed font-sans">{activeProject.built}</p>
                </div>

                {/* 3. Hard Problem & Solution */}
                <div className="p-4 border border-[var(--border-retro)] bg-[var(--surface-panel)] shadow-[var(--shadow-hard-sm)]">
                  <strong className="font-mono text-xs text-[var(--text-main)] uppercase tracking-wider block mb-1.5">
                    3. Hard Technical Challenge &amp; Solution
                  </strong>
                  <p className="text-[var(--text-muted)] text-xs sm:text-sm mb-2 font-sans">
                    <strong className="text-[var(--text-main)] font-mono">CHALLENGE: </strong>
                    {activeProject.hardProblem}
                  </p>
                  <p className="text-[var(--text-main)] text-xs sm:text-sm font-sans">
                    <strong className="text-[var(--accent-quiet-text)] font-mono">SOLUTION: </strong>
                    {activeProject.solution}
                  </p>
                </div>

                {/* 4. Results */}
                <div>
                  <strong className="font-mono text-xs text-[var(--accent-color)] uppercase tracking-wider block mb-1">
                    4. Results &amp; Key Impact
                  </strong>
                  <p className="text-[var(--text-muted)] leading-relaxed font-mono text-xs sm:text-sm">
                    {activeProject.results}
                  </p>
                </div>

                {/* 5. Empirical Benchmarks & Concurrency Audit */}
                {activeProject.benchmarks && activeProject.benchmarks.length > 0 && (
                  <div className="p-3.5 sm:p-4 border-2 border-[var(--border-retro)] bg-[var(--surface-panel)] shadow-[var(--shadow-hard-sm)]">
                    <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[var(--border-retro)]">
                      <span className="font-mono text-xs text-[var(--accent-color)] uppercase tracking-wider font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Empirical Benchmarks &amp; Concurrency Audit
                      </span>
                      <span className="text-[10px] font-mono text-[var(--accent-quiet-text)] font-bold">
                        VERIFIED AUDIT
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {activeProject.benchmarks.map((b, bIdx) => (
                        <div key={bIdx} className="p-2 border border-[var(--border-retro)] bg-[var(--surface-window)] flex flex-col justify-between">
                          <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-0.5">{b.label}</span>
                          <strong className="text-xs sm:text-sm font-pixel font-bold text-[var(--accent-quiet-text)] dark:text-[var(--accent-quiet)] block">{b.value}</strong>
                          <span className="text-[10px] font-mono text-[var(--text-muted)] mt-1 leading-tight">{b.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </RetroWindow>
      </div>
    </section>
  );
}
