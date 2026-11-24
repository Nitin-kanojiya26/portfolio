'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink, ArrowRight } from 'lucide-react';
import RetroWindow from './RetroWindow';
import CalmPageBackground from './CalmPageBackground';

/* ═══════════════════════════════════════════════════════════════
 *  PROFESSIONAL SYSTEM DESIGN ARCHITECTURES (MINIMAL & ZERO OVERFLOW)
 *  - Text is guaranteed to stay strictly inside boxes (max 14 chars)
 *  - Consistent typography & layout across all 4 projects
 *  - Continuous animated data packet traveling across the pipeline
 *  - Authentic topology unique to each project
 *  - Light & Dark mode native compatibility
 * ═══════════════════════════════════════════════════════════════ */

interface ArchitectureNode {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  category: string;
  protocol: string;
  description: string;
  specs: string[];
}

interface ProjectArchitecture {
  id: string;
  num: string;
  tabLabel: string;
  title: string;
  statusBadge: string;
  hex: string;
  githubUrl: string;
  liveUrl?: string;
  flowStages: { label: string; nodeId: string }[];
  bottleneck: string;
  solution: string;
  benchmarks: { label: string; value: string; detail: string }[];
  techStack: string[];
  nodes: ArchitectureNode[];
}

const PROJECTS_DATA: ProjectArchitecture[] = [
  {
    id: 'codexium',
    num: '01',
    tabLabel: '01. CODEXIUM',
    title: 'Codexium — Online Judge & Isolated Docker Build Mode',
    statusBadge: 'LIVE IN PRODUCTION',
    hex: '#8FB89B',
    githubUrl: 'https://github.com/Nitin-kanojiya26/Coding-platform',
    liveUrl: 'https://coding-platform-frontend.vercel.app',
    flowStages: [
      { label: '1. Monaco IDE', nodeId: 'client' },
      { label: '2. Express Gateway', nodeId: 'gateway' },
      { label: '3. BullMQ Queue', nodeId: 'queue' },
      { label: '4. Docker Sandbox', nodeId: 'docker' },
      { label: '5. Socket.IO & DB', nodeId: 'socket' },
    ],
    bottleneck:
      'Synchronous code compilation froze the Node.js event loop during contest bursts (>20s latency, 40% HTTP drops). Leaderboard queries caused severe lock contention (12.6s P95 latency).',
    solution:
      'Decoupled compilation with async BullMQ/Redis worker queues and bidirectional Socket.IO verdict streaming. Prevented cache stampedes via a 2-second Redis micro-cache, in-memory mutexes, and background Redis Sorted Sets (ZADD/ZREVRANGE). In "Build Mode", student Express APIs run inside hardened Docker containers (256MB RAM, 0.5 CPU, read-only root, no network) tested via an automated HTTP test harness.',
    benchmarks: [
      { label: 'LEADERBOARD P95', value: '271 ms', detail: '46.6x faster (was 12.6s uncached)' },
      { label: 'SUBMISSION P95', value: '665 ms', detail: 'Decoupled BullMQ workers (was >20s)' },
      { label: 'DATABASE READS', value: '-99.9%', detail: 'Redis Sorted Sets + in-process mutex' },
      { label: 'BURST ERROR RATE', value: '0.00%', detail: 'Zero dropped requests @ 100 VUs' },
    ],
    techStack: ['Node.js', 'Express', 'React', 'BullMQ', 'Redis', 'Docker', 'Judge0', 'MongoDB', 'Socket.IO'],
    nodes: [
      {
        id: 'client',
        badge: 'CLIENT',
        title: 'MONACO IDE',
        subtitle: 'Browser Studio',
        category: 'WEB IDE',
        protocol: 'HTTP POST /run',
        description: 'React client code studio where students write and submit single-file algorithmic code or multi-file Express REST API projects.',
        specs: ['Monaco Editor Core', 'Multi-File Workspace', 'Instant Templates'],
      },
      {
        id: 'gateway',
        badge: 'INGRESS',
        title: 'EXPRESS API',
        subtitle: 'Port 5000 • JWT',
        category: 'API GATEWAY',
        protocol: 'HTTP 200 (Job ID)',
        description: 'Terminates client traffic, validates user JWT tokens with bcrypt, enforces per-user rate limits, and enqueues jobs without blocking.',
        specs: ['Port: 5000', 'JWT Authentication', 'Rate Limit: 60 req/min', 'Zero Synchronous Delay'],
      },
      {
        id: 'queue',
        badge: 'QUEUE',
        title: 'BULLMQ REDIS',
        subtitle: 'FIFO Queue',
        category: 'TASK QUEUE',
        protocol: 'Redis TCP / Port 6379',
        description: 'Captures submission bursts into an in-memory buffer. Releases jobs sequentially (FIFO) to worker containers, preventing event loop starvation.',
        specs: ['FIFO Order (First In, First Out)', 'Redis Key: bull:api-judge', 'Worker Concurrency Limiting', 'Eliminates Server Freezes'],
      },
      {
        id: 'docker',
        badge: 'SANDBOX',
        title: 'DOCKER RUNTIME',
        subtitle: '256MB • ro-root',
        category: 'ISOLATED CONTAINER',
        protocol: 'Docker Bridge Network',
        description: 'Runs student Express REST servers inside ephemeral, hardened containers evaluated by an automated HTTP test harness over an isolated bridge.',
        specs: ['256MB RAM • 0.5 CPU', '--read-only root + tmpfs', 'Network: --internal (No WAN)', 'Judge0 + Failover for DSA'],
      },
      {
        id: 'socket',
        badge: 'STREAM',
        title: 'SOCKET.IO & DB',
        subtitle: '271ms P95 ZSET',
        category: 'REAL-TIME DELIVERY',
        protocol: 'WebSocket / WSS Push',
        description: 'Saves verdicts to MongoDB Atlas. Updates Redis Sorted Sets in O(log N) time and broadcasts live results directly to client browsers.',
        specs: ['Redis Mutex (contestSyncLocks)', '2s Micro-cache TTL', '-85% Polling Traffic', 'Room-based Broadcasting'],
      },
    ],
  },
  {
    id: 'gitpr',
    num: '02',
    tabLabel: '02. GITPR (VIGILENTIA)',
    title: 'Vigilentia — AI GitHub PR Reviewer & Style RAG Engine',
    statusBadge: 'LIVE IN PRODUCTION',
    hex: '#3B82F6',
    githubUrl: 'https://github.com/Nitin-kanojiya26/vigilentia',
    liveUrl: 'https://gitpr-bot.onrender.com',
    flowStages: [
      { label: '1. PR Webhook', nodeId: 'webhook' },
      { label: '2. Probot Ingress', nodeId: 'probot' },
      { label: '3. Redis Dedup Lock', nodeId: 'idempotency' },
      { label: '4. pgvector RAG', nodeId: 'pgvector' },
      { label: '5. Gemini Review', nodeId: 'gemini' },
    ],
    bottleneck:
      'GitHub webhooks timeout after 10s if LLM processing is slow. Generic review bots hallucinate invalid line numbers (triggering GitHub HTTP 422 errors) and lack knowledge of repository style guides.',
    solution:
      'Built sub-15ms webhook ingestion returning HTTP 200 OK while enqueuing tasks onto BullMQ with atomic Redis idempotency locks. Parsed diffs with parse-diff to construct strict legal line sets. Embedded style rules as 768-D vectors in PostgreSQL 16 pgvector (HNSW cosine distance) to retrieve top 3 rules before prompting Gemini 2.5 Flash with typed Zod validation. Encrypted user API keys via AES-256-GCM.',
    benchmarks: [
      { label: 'WEBHOOK INGESTION', value: '< 15 ms', detail: 'Instant HTTP 200 OK via BullMQ' },
      { label: 'VECTOR RETRIEVAL', value: '768-D HNSW', detail: 'Cosine distance (<=>) in pgvector' },
      { label: 'LINE ACCURACY', value: '100% Legal', detail: 'Zero GitHub HTTP 422 line mismatches' },
      { label: 'AUTOMATED TESTS', value: '126 Tests', detail: 'Complete Vitest coverage across parser & queue' },
    ],
    techStack: ['TypeScript', 'Probot', 'PostgreSQL 16', 'pgvector', 'Google Gemini', 'Redis', 'BullMQ', 'AES-256-GCM'],
    nodes: [
      {
        id: 'webhook',
        badge: 'TRIGGER',
        title: 'GITHUB PR',
        subtitle: 'Signed Webhook',
        category: 'EVENT SOURCE',
        protocol: 'HTTPS POST Webhook',
        description: 'GitHub delivers an HMAC-signed webhook payload whenever a developer opens a Pull Request or pushes new commits.',
        specs: ['HMAC SHA-256 Signature', 'Octokit Event Listener', 'Multi-tenant Repositories'],
      },
      {
        id: 'probot',
        badge: 'INGRESS',
        title: 'PROBOT APP',
        subtitle: '< 15ms ACK 200',
        category: 'INGRESS DISPATCHER',
        protocol: 'HTTP 200 OK (< 15ms)',
        description: 'Immediately validates the signature and returns HTTP 200 OK in under 15ms so GitHub never times out, handing the review job to BullMQ.',
        specs: ['< 15ms Response Time', 'Immediate HTTP 200 OK', 'Zero Webhook Timeout Retries'],
      },
      {
        id: 'idempotency',
        badge: 'LOCK',
        title: 'REDIS DEDUP',
        subtitle: 'SETNX EX 300',
        category: 'CONCURRENCY CONTROL',
        protocol: 'Redis Key Lock',
        description: 'Acquires an atomic lock on the PR commit SHA. Prevents duplicate review runs during rapid commits or repeated webhook deliveries.',
        specs: ['Key: pr-review-lock:{sha}', 'TTL: 300 Seconds', 'Worker Concurrency: 2'],
      },
      {
        id: 'pgvector',
        badge: 'RAG',
        title: 'PGVECTOR 16',
        subtitle: '768-D Cosine',
        category: 'SEMANTIC RETRIEVAL',
        protocol: 'SQL Cosine Distance (<=>)',
        description: 'Filters diff with parse-diff and executes an in-database cosine distance query against chunked repository style guides stored as 768-D vectors.',
        specs: ['gemini-embedding-001', '768 Dimensions', 'HNSW Cosine Distance (<=>)', 'parse-diff Legal Lines'],
      },
      {
        id: 'gemini',
        badge: 'REVIEW',
        title: 'GEMINI & OCTOKIT',
        subtitle: 'Inline PR Review',
        category: 'AI REASONING',
        protocol: 'GitHub REST API',
        description: 'Evaluates the diff grounded by the retrieved style rules. Validates output with a typed Zod schema, drops out-of-diff lines, and posts inline comments.',
        specs: ['Google Gemini 2.5 Flash', 'Typed Zod Schema Defense', 'AES-256-GCM Key Security', 'Zero 422 Errors'],
      },
    ],
  },
  {
    id: 'spentai',
    num: '03',
    tabLabel: '03. SPENTAI',
    title: 'SpentAi — Dynamic Categorization & Financial Backend',
    statusBadge: 'LIVE IN PRODUCTION',
    hex: '#F59E0B',
    githubUrl: 'https://github.com/Nitin-kanojiya26/expense-tracker-ai',
    liveUrl: 'https://expense-tracker-ai-theta.vercel.app/',
    flowStages: [
      { label: '1. React Client', nodeId: 'client' },
      { label: '2. JWT Filter', nodeId: 'auth' },
      { label: '3. Spring Boot', nodeId: 'controller' },
      { label: '4. Gemini NLP', nodeId: 'gemini_parser' },
      { label: '5. PostgreSQL', nodeId: 'postgres' },
    ],
    bottleneck:
      'Manual expense logging causes entry fatigue, while traditional finance apps force novel expenses into rigid predefined categories or a generic "Other" fallback bucket.',
    solution:
      'Engineered a decoupled backend using Java Spring Boot and PostgreSQL. Secured endpoints with stateless JWT authentication filter chains (<25ms) and bcrypt hashing. Integrated Google Gemini API to parse natural language transaction strings and dynamically generate semantic Category entities on-the-fly when no match exists, keeping categorization adaptive.',
    benchmarks: [
      { label: 'AUTH LATENCY', value: '< 25 ms', detail: 'Stateless Spring Security JWT token verification' },
      { label: 'CATEGORIZATION', value: 'Dynamic', detail: 'Zero hardcoded fallback buckets via Gemini' },
      { label: 'DATABASE', value: 'PostgreSQL', detail: 'Normalized relational ledger schema' },
      { label: 'ARCHITECTURE', value: 'Decoupled', detail: 'Spring Boot REST + React SPA on Vercel' },
    ],
    techStack: ['Java', 'Spring Boot 3', 'Spring Security', 'JWT', 'PostgreSQL', 'Google Gemini AI', 'React.js'],
    nodes: [
      {
        id: 'client',
        badge: 'CLIENT',
        title: 'REACT SPA',
        subtitle: 'Vercel Dashboard',
        category: 'PRESENTATION LAYER',
        protocol: 'HTTPS REST / JSON',
        description: 'Single-page application featuring fast expense inputs, deterministic category color palette rendering, and live budget charts.',
        specs: ['Vercel Hosted', 'Deterministic Palette Generator', 'Real-time Category Analytics'],
      },
      {
        id: 'auth',
        badge: 'SECURITY',
        title: 'JWT FILTER',
        subtitle: '< 25ms Auth',
        category: 'SECURITY GATEWAY',
        protocol: 'Authorization: Bearer',
        description: 'Stateless filter chain verifying Bearer JWT signatures and enforcing user tenant isolation in under 25ms.',
        specs: ['< 25ms Verification', 'BCrypt Password Hashing', 'Stateless Session Policy'],
      },
      {
        id: 'controller',
        badge: 'BACKEND',
        title: 'SPRING BOOT 3',
        subtitle: 'REST Controller',
        category: 'APPLICATION LOGIC',
        protocol: 'Spring Data JPA',
        description: 'Handles transaction creation, input validation via Jakarta @Valid, and coordinates with the Gemini natural language extraction service.',
        specs: ['Spring Boot 3.x', 'Jakarta Validation', 'Transactional Service Layer'],
      },
      {
        id: 'gemini_parser',
        badge: 'AI MODEL',
        title: 'GEMINI NLP',
        subtitle: 'Dynamic Category',
        category: 'AI EXTRACTION',
        protocol: 'REST / JSON API',
        description: 'Parses unformatted transaction text. If an expense matches no existing category, dynamically generates a new semantic category entity on-the-fly.',
        specs: ['Google Gemini API', 'Zero "Other" Fallback Buckets', 'Dynamic Category Creation'],
      },
      {
        id: 'postgres',
        badge: 'LEDGER',
        title: 'POSTGRESQL',
        subtitle: 'ACID Relational',
        category: 'PERSISTENCE LAYER',
        protocol: 'JDBC / PostgreSQL Wire',
        description: 'Stores normalized users, categories, transactions, and budgets with ACID guarantees, foreign key constraints, and indexed lookups.',
        specs: ['PostgreSQL Relational Schema', 'Indexed Foreign Keys', 'ACID Read Committed'],
      },
    ],
  },
  {
    id: 'classpluse',
    num: '04',
    tabLabel: '04. CLASSPLUSE',
    title: 'ClassPluse — Dynamic QR & Biometric Attendance System',
    statusBadge: 'BIOMETRIC LMS',
    hex: '#8B5CF6',
    githubUrl: 'https://github.com/Nitin-kanojiya26/ClassPluse',
    flowStages: [
      { label: '1. Hall Screen', nodeId: 'projector' },
      { label: '2. Dynamic QR', nodeId: 'rotating_qr' },
      { label: '3. Mobile Camera', nodeId: 'mobile_client' },
      { label: '4. Dlib ResNet', nodeId: 'dlib_engine' },
      { label: '5. SQL & SMTP', nodeId: 'db_and_smtp' },
    ],
    bottleneck:
      'Manual roll calls waste 15 minutes of lecture time. Static QR codes get forwarded over chat apps for proxy attendance. Facial appearance also drifts naturally over academic semesters.',
    solution:
      'Built an anti-proxy attendance platform with a 15-second rotating dynamic QR code loop on hall screens: tokens expire in 15 seconds, rendering forwarded screenshots useless. Students scan and undergo biometric verification via C# FaceRecognitionDotNet (Dlib + ResNet). Updated face embeddings on every verified scan to adapt as appearance changes, and triggered automated SMTP alerts when attendance drops below 75%.',
    benchmarks: [
      { label: 'ROTATING QR LOOP', value: '15s Expiry', detail: 'Prevents screenshot forwarding for proxy attendance' },
      { label: 'BIOMETRIC ENGINE', value: 'C# Dlib ResNet', detail: 'Single-face constraint & 128-D vector matching' },
      { label: 'ATTENDANCE ALERT', value: 'SMTP < 75%', detail: 'Automated email warning trigger for low attendance' },
      { label: 'REPORTS', value: 'Excel Export', detail: 'One-click consolidated student attendance records' },
    ],
    techStack: ['C#', 'ASP.NET Core', 'FaceRecognitionDotNet', 'Dlib', 'ResNet', 'EF Core', 'SQL Server', 'SMTP'],
    nodes: [
      {
        id: 'projector',
        badge: 'DISPLAY',
        title: 'HALL SCREEN',
        subtitle: 'Teacher Session',
        category: 'PRESENTATION PORTAL',
        protocol: 'ASP.NET Core Web',
        description: 'Professor starts the lecture from the teacher portal; the classroom screen projects the live session and starts the dynamic token generator.',
        specs: ['Teacher Authentication', 'Lecture Session Binding', 'Full-Screen Projection'],
      },
      {
        id: 'rotating_qr',
        badge: 'SECURITY',
        title: 'DYNAMIC QR',
        subtitle: '15s Expiry Loop',
        category: 'ANTI-PROXY PROTOCOL',
        protocol: 'HMAC Signature',
        description: 'Generates timestamped QR tokens refreshing every 15 seconds. Tokens expire immediately, making forwarded screenshots useless for proxy attendance.',
        specs: ['15-Second Validity Window', 'Cryptographic HMAC Hash', 'Prevents Remote Screenshot Proxying'],
      },
      {
        id: 'mobile_client',
        badge: 'CLIENT',
        title: 'MOBILE SCAN',
        subtitle: 'Frame Ingress',
        category: 'CLIENT SENSOR',
        protocol: 'HTTPS POST /verify',
        description: 'Student scans the projected QR token and takes a camera capture within the active 15-second lecture window with a single-face frame constraint.',
        specs: ['Timestamp Validation < 15s', 'Single-Face Viewfinder Constraint', 'Frame Resolution Normalization'],
      },
      {
        id: 'dlib_engine',
        badge: 'VISION',
        title: 'DLIB RESNET',
        subtitle: '128-D Vector',
        category: 'BIOMETRIC MATCHING',
        protocol: 'FaceRecognitionDotNet',
        description: 'C# engine detects facial landmarks, computes a 128-dimensional facial embedding vector, and updates embedding on successful match to adapt across semesters.',
        specs: ['C# Dlib ResNet Backbone', '128-D Facial Embedding', 'Dynamic Vector Re-indexing'],
      },
      {
        id: 'db_and_smtp',
        badge: 'LEDGER',
        title: 'SQL & SMTP',
        subtitle: 'EF Core • < 75%',
        category: 'PERSISTENCE & ALERTS',
        protocol: 'EF Core + SMTP',
        description: 'Entity Framework Core commits verified attendance. If a student drops below 75%, background SMTP workers trigger automated warning emails.',
        specs: ['SQL Server Ledger', 'Automated SMTP Warnings (<75%)', 'One-Click Excel (.xlsx) Export'],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
 *  CLEAN MINIMAL SVG SCHEMATIC (ZERO TEXT OVERFLOW)
 * ═══════════════════════════════════════════════════════════════ */

interface SchematicProps {
  project: ProjectArchitecture;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  onSelectNode: (id: string) => void;
  onHoverNode: (id: string | null) => void;
  shouldReduceMotion: boolean | null;
}

function MinimalSchematic({
  project,
  selectedNodeId,
  hoveredNodeId,
  onSelectNode,
  onHoverNode,
  shouldReduceMotion,
}: SchematicProps) {
  const hex = project.hex;
  const nodes = project.nodes;
  const isCodexium = project.id === 'codexium';

  // 5 nodes, each exactly width=145, height=68. Center Y = 68.
  // Perfectly spaced across 940 width:
  // Node 1: 20 -> 165
  // Gap 1: 165 -> 210 (45px)
  // Node 2: 210 -> 355
  // Gap 2: 355 -> 400 (45px)
  // Node 3: 400 -> 545
  // Gap 3: 545 -> 590 (45px)
  // Node 4: 590 -> 735
  // Gap 4: 735 -> 775 (40px)
  // Node 5: 775 -> 920
  const n = [
    { x: 20, y: 34, w: 145, h: 68 },
    { x: 210, y: 34, w: 145, h: 68 },
    { x: 400, y: 34, w: 145, h: 68 },
    { x: 590, y: 34, w: 145, h: 68 },
    { x: 775, y: 34, w: 145, h: 68 },
  ];

  const cy = 68;
  const pathId = `flow-${project.id}`;
  const wireData = `
    M ${n[0].x + n[0].w / 2} ${cy}
    L ${n[1].x} ${cy}
    L ${n[1].x + n[1].w} ${cy}
    L ${n[2].x} ${cy}
    L ${n[2].x + n[2].w} ${cy}
    L ${n[3].x} ${cy}
    L ${n[3].x + n[3].w} ${cy}
    L ${n[4].x} ${cy}
    L ${n[4].x + n[4].w / 2} ${cy}
  `;

  return (
    <svg viewBox="0 0 940 136" className="w-full h-auto max-h-[155px] overflow-visible" fill="none">
      <defs>
        <filter id={`schematic-glow-${project.id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <path id={pathId} d={wireData} />
      </defs>

      {/* 4 Connection Cables */}
      {[0, 1, 2, 3].map((i) => {
        const x1 = n[i].x + n[i].w;
        const x2 = n[i + 1].x;
        return (
          <g key={i}>
            <line x1={x1} y1={cy} x2={x2} y2={cy} stroke={hex} strokeWidth={1.5} strokeDasharray="3 3" opacity={0.65} />
            <polygon points={`${x2 - 1},${cy} ${x2 - 5},${cy - 3} ${x2 - 5},${cy + 3}`} fill={hex} />
          </g>
        );
      })}

      {/* Continuous Traveling Data Pulse */}
      {!shouldReduceMotion && (
        <>
          <circle r={4} fill={hex} filter={`url(#schematic-glow-${project.id})`}>
            <animateMotion dur="4.2s" repeatCount="indefinite">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
          <circle r={2} fill="#ffffff">
            <animateMotion dur="4.2s" repeatCount="indefinite">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>

          {/* Staggered second packet */}
          <circle r={4} fill={hex} filter={`url(#schematic-glow-${project.id})`}>
            <animateMotion dur="4.2s" begin="2.1s" repeatCount="indefinite">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
          <circle r={2} fill="#ffffff">
            <animateMotion dur="4.2s" begin="2.1s" repeatCount="indefinite">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        </>
      )}

      {/* 5 Distinct Architectural Boxes */}
      {nodes.slice(0, 5).map((node, idx) => {
        const box = n[idx];
        const isSelected = selectedNodeId === node.id;
        const isHovered = hoveredNodeId === node.id;
        const active = isSelected || isHovered;
        const isBullMQ = isCodexium && node.id === 'queue';

        return (
          <g
            key={node.id}
            className="cursor-pointer group select-none"
            onClick={() => onSelectNode(node.id)}
            onMouseEnter={() => onHoverNode(node.id)}
            onMouseLeave={() => onHoverNode(null)}
          >
            {/* Box Body */}
            <rect
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              rx={4}
              fill="var(--surface-panel)"
              stroke={active ? hex : 'var(--border-retro)'}
              strokeWidth={active ? 2 : 1.2}
              className="transition-colors"
            />

            {/* Top Category Strip */}
            <rect
              x={box.x}
              y={box.y}
              width={box.w}
              height={16}
              rx={4}
              fill="var(--surface-window)"
              stroke="var(--border-retro)"
              strokeWidth={0.6}
            />
            <text
              x={box.x + box.w / 2}
              y={box.y + 11}
              textAnchor="middle"
              className="text-[7.5px] font-mono font-bold tracking-wider"
              fill={active ? hex : 'var(--text-muted)'}
            >
              {node.badge}
            </text>

            {/* Component Title (Guaranteed Zero Overflow) */}
            <text
              x={box.x + box.w / 2}
              y={box.y + 32}
              textAnchor="middle"
              className="text-[10px] font-mono font-bold tracking-wide"
              fill="var(--text-main)"
            >
              {node.title}
            </text>

            {/* Sub-Badge / FIFO Visual (Guaranteed Zero Overflow) */}
            {isBullMQ ? (
              <g>
                {/* Clean, compact FIFO slot rail */}
                <rect
                  x={box.x + 22}
                  y={box.y + 41}
                  width={box.w - 44}
                  height={17}
                  rx={2}
                  fill="var(--surface-window)"
                  stroke={hex}
                  strokeWidth={0.8}
                />
                <rect x={box.x + 26} y={box.y + 44} width={18} height={11} rx={1} fill={`${hex}25`} stroke={hex} strokeWidth={0.6} />
                <text x={box.x + 35} y={box.y + 52.5} textAnchor="middle" className="text-[6.5px] font-mono font-bold" fill="var(--text-main)">
                  J3
                </text>
                <rect x={box.x + 48} y={box.y + 44} width={18} height={11} rx={1} fill={`${hex}40`} stroke={hex} strokeWidth={0.6} />
                <text x={box.x + 57} y={box.y + 52.5} textAnchor="middle" className="text-[6.5px] font-mono font-bold" fill="var(--text-main)">
                  J2
                </text>
                <rect x={box.x + 70} y={box.y + 44} width={18} height={11} rx={1} fill={`${hex}65`} stroke={hex} strokeWidth={0.8} />
                <text x={box.x + 79} y={box.y + 52.5} textAnchor="middle" className="text-[6.5px] font-mono font-bold" fill="var(--text-main)">
                  J1
                </text>
                <text x={box.x + 104} y={box.y + 52.5} textAnchor="middle" className="text-[6.5px] font-mono font-bold" fill={hex}>
                  OUT&rarr;
                </text>
              </g>
            ) : (
              <g>
                <rect
                  x={box.x + 18}
                  y={box.y + 42}
                  width={box.w - 36}
                  height={15}
                  rx={2}
                  fill="var(--surface-window)"
                  stroke="var(--border-retro)"
                  strokeWidth={0.6}
                />
                <text
                  x={box.x + box.w / 2}
                  y={box.y + 52.5}
                  textAnchor="middle"
                  className="text-[7.5px] font-mono"
                  fill={active ? hex : 'var(--text-muted)'}
                >
                  {node.subtitle}
                </text>
              </g>
            )}

            {/* Input Port (Left) */}
            <circle
              cx={box.x}
              cy={cy}
              r={3}
              fill="var(--surface-panel)"
              stroke={active ? hex : 'var(--border-retro)'}
              strokeWidth={1.2}
            />
            {/* Output Port (Right) */}
            <circle
              cx={box.x + box.w}
              cy={cy}
              r={3}
              fill={active ? hex : 'var(--surface-panel)'}
              stroke={active ? hex : 'var(--border-retro)'}
              strokeWidth={1.2}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
 *  MAIN STANDALONE ARCHITECTURE SECTION
 * ═══════════════════════════════════════════════════════════════ */
export default function EngineeringPathVisual() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const activeProject = PROJECTS_DATA[activeProjectIdx];

  const handleSelectProject = (idx: number) => {
    setActiveProjectIdx(idx);
    setSelectedNodeId(null);
    setHoveredNodeId(null);
  };

  const activeNode = selectedNodeId
    ? activeProject.nodes.find((n) => n.id === selectedNodeId) ?? activeProject.nodes[0]
    : activeProject.nodes[0];

  return (
    <section
      id="architecture"
      className="w-full py-4 sm:py-8 px-2 sm:px-4 md:px-8 max-w-[1440px] mx-auto select-none"
    >
      <RetroWindow
        title="03_SYSTEM_ARCHITECTURE_TOPOLOGY.SYS"
        badge="DISTRIBUTED_SYS"
        statusText="VERIFIED ARCHITECTURAL TOPOLOGY • PRODUCTION SCHEMATICS"
        pathText="DIR: /SYS/BLUEPRINTS/ARCHITECTURE.SPEC"
      >
        <CalmPageBackground variant="default" />

        <div className="flex flex-col gap-4">
          {/* Header & Project Switcher Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-retro)] pb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeProject.hex }} />
                <span className="text-xs font-mono text-[var(--accent-quiet-text)] font-bold tracking-widest uppercase">
                  SYSTEM DESIGN &amp; RUNTIME TOPOLOGY
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-pixel font-bold text-[var(--text-main)]">
                ARCHITECTURE SCHEMATICS
              </h2>
            </div>

            {/* 4 Clean Project Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {PROJECTS_DATA.map((p, idx) => {
                const isSelected = idx === activeProjectIdx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectProject(idx)}
                    className={`px-3 py-1.5 font-mono text-[11px] transition-all border flex items-center gap-2 cursor-pointer rounded-xs whitespace-nowrap ${
                      isSelected
                        ? 'bg-[var(--surface-panel)] text-[var(--text-main)] border-[var(--border-retro)] shadow-[var(--shadow-hard-sm)] font-bold'
                        : 'bg-transparent text-[var(--text-muted)] border-transparent hover:text-[var(--text-main)] hover:bg-[var(--surface-titlebar)]'
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: isSelected ? p.hex : 'var(--text-dim)' }}
                    />
                    <span>{p.tabLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Schematic SVG Canvas with Continuous Flow & Zero Text Overflow */}
          <div className="relative w-full overflow-x-auto py-3 px-3 bg-[var(--surface-panel)] border border-[var(--border-retro)] rounded-xs shadow-[var(--shadow-hard-sm)]">
            <div className="min-w-[840px] w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-full flex items-center justify-center"
                >
                  <MinimalSchematic
                    project={activeProject}
                    selectedNodeId={selectedNodeId}
                    hoveredNodeId={hoveredNodeId}
                    onSelectNode={setSelectedNodeId}
                    onHoverNode={setHoveredNodeId}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Clean Technical Inspector Strip */}
          {activeNode && (
            <div className="p-3 bg-[var(--surface-panel)] border border-[var(--border-retro)] font-mono text-[11px] rounded-xs shadow-[var(--shadow-hard-sm)]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 pb-2 mb-2 border-b border-[var(--border-retro)]">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeProject.hex }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs text-[var(--text-main)]">{activeNode.title}</strong>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-xs border border-[var(--border-retro)] bg-[var(--surface-window)] text-[var(--text-muted)] font-bold">
                        {activeNode.category}
                      </span>
                      <span className="text-[9px] font-mono font-bold" style={{ color: activeProject.hex }}>
                        [{activeNode.protocol}]
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {activeNode.specs.map((s) => (
                    <span
                      key={s}
                      className="text-[9px] font-mono px-2 py-0.5 border border-[var(--border-retro)] bg-[var(--surface-window)] text-[var(--text-main)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[10.5px] text-[var(--text-muted)] leading-relaxed">
                {activeNode.description}
              </p>
            </div>
          )}

          {/* Interactive Flow Stage Pipeline Navigation */}
          <div className="bg-[var(--surface-window)] border border-[var(--border-retro)] p-2.5 shadow-[var(--shadow-hard-sm)]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9.5px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-bold">
                DATA FLOW PIPELINE (CLICK TO INSPECT):
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] font-mono text-[var(--text-main)] hover:underline"
                >
                  <FaGithub size={10} />
                  <span>GITHUB</span>
                </a>
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] font-mono text-[var(--accent-quiet-text)] hover:underline font-bold"
                  >
                    <ExternalLink size={9} />
                    <span>LIVE</span>
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]">
              {activeProject.flowStages.map((stage, idx) => {
                const isNodeActive = selectedNodeId === stage.nodeId || hoveredNodeId === stage.nodeId;
                return (
                  <React.Fragment key={stage.label}>
                    <button
                      type="button"
                      onClick={() => setSelectedNodeId(stage.nodeId)}
                      onMouseEnter={() => setHoveredNodeId(stage.nodeId)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      className={`px-2 py-0.5 border font-mono rounded-xs transition-all cursor-pointer ${
                        isNodeActive
                          ? 'border-[var(--text-main)] bg-[var(--surface-panel)] text-[var(--text-main)] font-bold shadow-[var(--shadow-hard-sm)]'
                          : 'border-[var(--border-retro)] bg-[var(--surface-panel)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      {stage.label}
                    </button>
                    {idx < activeProject.flowStages.length - 1 && (
                      <ArrowRight size={10} className="text-[var(--text-muted)] opacity-50" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Bottleneck vs Architecture Fix (Clean Minimal) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-mono leading-relaxed">
            <div className="p-3 bg-[var(--surface-panel)] border border-red-500/30 rounded-xs shadow-[var(--shadow-hard-sm)]">
              <strong className="text-red-500 dark:text-red-400 text-[10px] uppercase tracking-wider block mb-1 font-bold">
                THE BOTTLENECK:
              </strong>
              <p className="text-[var(--text-muted)]">{activeProject.bottleneck}</p>
            </div>

            <div className="p-3 bg-[var(--surface-panel)] border border-[var(--accent-quiet)]/40 rounded-xs shadow-[var(--shadow-hard-sm)]">
              <strong className="text-[var(--accent-quiet-text)] text-[10px] uppercase tracking-wider block mb-1 font-bold">
                SYSTEM DESIGN FIX:
              </strong>
              <p className="text-[var(--text-main)]">{activeProject.solution}</p>
            </div>
          </div>

          {/* Benchmarks & Tech Chips */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[var(--border-retro)]">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[9px] font-mono text-[var(--text-muted)] mr-1 uppercase font-bold">
                METRICS:
              </span>
              {activeProject.benchmarks.map((bm) => (
                <div
                  key={bm.label}
                  className="px-2 py-0.5 bg-[var(--surface-panel)] border border-[var(--border-retro)] flex items-center gap-1 text-[9.5px] font-mono shadow-[var(--shadow-hard-sm)]"
                  title={bm.detail}
                >
                  <span className="text-[var(--text-muted)]">{bm.label}:</span>
                  <strong style={{ color: activeProject.hex }}>{bm.value}</strong>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[9px] font-mono text-[var(--text-muted)] mr-1">TECH:</span>
              {activeProject.techStack.map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-mono px-1.5 py-0.2 bg-[var(--surface-panel)] border border-[var(--border-retro)] text-[var(--text-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}
