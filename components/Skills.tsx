'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import RetroWindow from './RetroWindow';
import { SiClaude, SiDeepseek, SiGooglegemini, SiOllama, SiRedis, SiPostgresql, SiMongodb, SiMysql, SiDocker, SiSocketdotio } from 'react-icons/si';
import { RiOpenaiFill } from 'react-icons/ri';
import { Terminal, Cpu, Database, Wrench, Sparkles, Layers } from 'lucide-react';

interface SkillItem {
  name: string;
  src?: string;
  icon?: any;
  color?: string;
  level?: string;
}

interface SkillCategory {
  category: string;
  code: string;
  icon: any;
  description: string;
  logos: SkillItem[];
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  const skills: SkillCategory[] = [
    {
      category: "Languages",
      code: "01. LANGUAGES",
      icon: Terminal,
      description: "Programming languages used for backend services, APIs, and algorithmic problem solving.",
      logos: [
        { name: "Java", src: "/stack/java.svg", level: "CORE • BACKEND" },
        { name: "C++", src: "/stack/cpp.svg", level: "DSA • SYSTEMS" },
        { name: "C", src: "/stack/cpp.svg", level: "LOW-LEVEL" },
        { name: "Python", src: "/stack/python.svg", level: "DJANGO • AI" },
        { name: "JavaScript", src: "/stack/Javascript.svg", level: "NODE.JS • ES6+" },
        { name: "HTML / CSS", src: "/stack/HTML.png", level: "SEMANTIC UI" },
        { name: "PHP", src: "/stack/Typescript.svg", level: "WEB BACKEND" },
      ],
    },
    {
      category: "Frameworks & Runtimes",
      code: "02. FRAMEWORKS",
      icon: Layers,
      description: "Backend frameworks, REST API design, JWT authentication, and WebSockets.",
      logos: [
        { name: "Spring Boot", src: "/stack/spring.svg", level: "PRIMARY REST API" },
        { name: "Node.js", src: "/stack/NodeJs.svg", level: "EVENT-DRIVEN RUNTIME" },
        { name: "Express.js", src: "/stack/Express.png", level: "REST MICROSERVICES" },
        { name: "Django", src: "/stack/django.svg", level: "PYTHON FRAMEWORK" },
        { name: "Socket.IO", icon: SiSocketdotio, color: "currentColor", level: "REAL-TIME WEBSOCKETS" },
        { name: "REST APIs", icon: Terminal, color: "#00e5ff", level: "API SPECIFICATION" },
        { name: "JWT Auth", icon: Terminal, color: "#00ff66", level: "STATELESS SECURITY" },
      ],
    },
    {
      category: "Databases & Cache",
      code: "03. DATABASES",
      icon: Database,
      description: "Relational ACID databases, NoSQL stores, and in-memory caching systems.",
      logos: [
        { name: "PostgreSQL", src: "/stack/postgresql.svg", level: "RELATIONAL ACID" },
        { name: "MySQL", src: "/stack/mysql.svg", level: "ENTERPRISE RDBMS" },
        { name: "MongoDB", src: "/stack/mongodb_devicon.svg", level: "DOCUMENT NO-SQL" },
        { name: "Redis", icon: SiRedis, color: "#DC382D", level: "IN-MEMORY CACHE & QUEUE" },
      ],
    },
    {
      category: "Tools & Execution Engines",
      code: "04. TOOLS & QUEUES",
      icon: Wrench,
      description: "Container sandboxing, background queue processing, and automated execution engines.",
      logos: [
        { name: "Docker", src: "/stack/Docker.svg", level: "CONTAINER SANDBOX" },
        { name: "BullMQ", icon: Layers, color: "#ffb000", level: "ASYNC JOB QUEUE" },
        { name: "Judge0", icon: Terminal, color: "#00e5ff", level: "ONLINE JUDGE ENGINE" },
        { name: "Git / GitHub", src: "/stack/Github.svg", level: "VERSION CONTROL" },
        { name: "Postman", src: "/stack/postman.svg", level: "API TESTING" },
      ],
    },
    {
      category: "AI Models & APIs",
      code: "05. AI APIS",
      icon: Sparkles,
      description: "Generative AI APIs and embeddings integrated into backend applications.",
      logos: [
        { name: "Gemini API", icon: SiGooglegemini, color: "#8E75B2", level: "EXPENSE • RAG API" },
        { name: "Claude", icon: SiClaude, color: "#D97757", level: "CODE REVIEW ASSIST" },
        { name: "OpenAI API", icon: RiOpenaiFill, color: "#10A37F", level: "API INTEGRATION" },
        { name: "DeepSeek", icon: SiDeepseek, color: "#4D7DF5", level: "REASONING API" },
        { name: "Ollama Local", icon: SiOllama, color: "currentColor", level: "LOCAL INFERENCE" },
      ],
    },
  ];

  const currentCategory = skills[activeCategory];

  return (
    <section id="skills" className="w-full py-2 sm:py-4 px-2 sm:px-4 md:px-8 max-w-[1440px] mx-auto">
      <RetroWindow
        title="04_SYS_CAPABILITIES.CFG"
        badge="TECH_STACK"
        statusText={`ACTIVE RACK: ${currentCategory.code} • READY`}
        pathText="DIR: /HARDWARE/DRIVERS/SYS_CAPABILITIES.CFG"
      >
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-widest font-bold">
                TECHNICAL STACK (FROM RESUME)
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-pixel font-bold text-[var(--text-main)]">
              TECHNICAL SKILLS
            </h2>
          </div>

          {/* 🌟 LARGER TABS MENU (Generous Padding & Big Font) */}
          <div className="flex items-center gap-2 border-b-2 border-[var(--border-retro)] pb-px overflow-x-auto no-scrollbar">
            {skills.map((item, idx) => {
              const isActive = activeCategory === idx;
              return (
                <button
                  key={item.category}
                  type="button"
                  onClick={() => setActiveCategory(idx)}
                  className={`px-5 py-3 font-pixel text-xs sm:text-sm whitespace-nowrap border-t-2 border-l border-r border-[var(--border-retro)] transition-all cursor-pointer font-bold ${
                    isActive
                      ? 'bg-[var(--surface-window)] text-[var(--accent-color)] border-t-[var(--accent-color)] border-b-2 border-b-[var(--surface-window)] -mb-px z-10 shadow-[var(--shadow-hard-sm)]'
                      : 'bg-[var(--surface-panel)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--surface-titlebar)]'
                  }`}
                >
                  [{item.code}]
                </button>
              );
            })}
          </div>

          {/* Category Description Banner */}
          <div className="p-4 sm:p-5 border-2 border-[var(--border-retro)] bg-[var(--surface-panel)] flex items-start gap-3 shadow-[var(--shadow-hard-sm)]">
            <span className="text-[var(--accent-color)] font-mono text-lg">&gt;</span>
            <p className="text-xs sm:text-sm font-mono text-[var(--text-muted)] leading-relaxed">
              <strong className="text-[var(--text-main)] uppercase tracking-wider text-sm">{currentCategory.category}: </strong>
              {currentCategory.description}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {currentCategory.logos.map((skill, i) => (
              <div
                key={i}
                className="retro-btn p-4 flex flex-col justify-between border-2 border-[var(--border-retro)] bg-[var(--surface-panel)] hover:border-[var(--accent-color)] transition-all group min-h-[90px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none border border-[var(--border-retro)] bg-[var(--surface-window)] flex items-center justify-center p-2 relative shrink-0">
                    {skill.src ? (
                      <Image
                        src={skill.src}
                        alt={skill.name}
                        width={26}
                        height={26}
                        className="object-contain filter contrast-125"
                      />
                    ) : (
                      skill.icon && <skill.icon size={22} style={{ color: skill.color }} />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-mono font-bold text-[var(--text-main)] group-hover:text-white truncate">
                      {skill.name}
                    </span>
                    {skill.level && (
                      <span className="text-[10px] font-mono text-[var(--text-muted)] group-hover:text-[var(--text-main)]">
                        {skill.level}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </RetroWindow>
    </section>
  );
}
