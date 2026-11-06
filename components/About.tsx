'use client';

import React from 'react';
import Image from 'next/image';
import RetroWindow from './RetroWindow';
import { GraduationCap, Award, Code2, Server, CheckCircle2 } from 'lucide-react';
import { getAcademicProgress } from '@/lib/academicProgress';

export default function About() {
  const academic = getAcademicProgress();
  return (
    <section
      id="about"
      className="w-full py-2 sm:py-4 px-2 sm:px-4 md:px-8 max-w-[1440px] mx-auto"
    >
      <RetroWindow
        title="01_ABOUT_ME.TXT"
        badge="SYS_PROFILE"
        statusText="STUDENT PROFILE • DHARMSINH DESAI UNIVERSITY"
        pathText="DIR: /NITIN_KANOJIYA/ABOUT.TXT"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 pb-4 border-b-2 border-[var(--border-retro)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-widest font-bold">
                ABOUT &amp; BACKGROUND
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-pixel font-bold text-[var(--text-main)] tracking-tight">
              BACKGROUND &amp; SUMMARY
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono max-w-md">
            Backend Developer | AI Engineering • Computer Engineering student at Dharmsinh Desai University.
          </p>
        </div>

        {/* Full-Scale Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Background & Engineering Summary (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Core Resume Summary Box */}
            <div className="p-4 sm:p-5 border-2 border-[var(--border-retro)] bg-[var(--surface-panel)] shadow-[var(--shadow-hard-sm)]">
              <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-wider block mb-1.5 font-bold">
                SUMMARY
              </span>
              <p className="text-xs sm:text-sm font-sans text-[var(--text-main)] leading-relaxed">
                Computer Engineering student at <strong>Dharmsinh Desai University</strong> with strong Data Structures and Algorithms fundamentals and hands-on experience building backend systems using <strong>Java, Spring Boot, Node.js, and Express.js</strong>. Experienced in designing REST APIs, integrating AI services, implementing asynchronous job processing, and working with relational and NoSQL databases. Built projects involving distributed processing, Docker-based code execution, Redis caching, and AI-powered code review using RAG. Seeking a Backend Development / Software Engineering Internship.
              </p>
            </div>

            {/* Factual Skill Focus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm text-[var(--text-muted)] font-sans leading-relaxed">
              <div className="p-3.5 border border-[var(--border-retro)] bg-[var(--surface-window)]">
                <strong className="text-[var(--text-main)] font-mono block mb-1 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Server size={14} className="text-[var(--accent-color)]" />
                  Backend &amp; Databases
                </strong>
                <p>
                  Experienced with Java (Spring Boot, Spring Security, JPA/Hibernate) and Node.js (Express, Socket.IO, BullMQ, Redis, PostgreSQL, MongoDB, MySQL, Docker sandbox).
                </p>
              </div>

              <div className="p-3.5 border border-[var(--border-retro)] bg-[var(--surface-window)]">
                <strong className="text-[var(--text-main)] font-mono block mb-1 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 size={14} className="text-emerald-400" />
                  CS Fundamentals &amp; DSA
                </strong>
                <p>
                  Solid foundations in Data Structures, Algorithms, DBMS, and OOP. Solved 895+ algorithmic problems (802 on LeetCode: 449 Medium / 317 Easy / 36 Hard, 93 on Codeforces).
                </p>
              </div>
            </div>

            {/* 2 Core Metric Gauges (Core Program & Real DSA Count) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="border border-[var(--border-retro)] bg-[var(--surface-panel)] p-3">
                <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                  <span className="text-[var(--text-muted)]">CORE PROGRAM</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-pixel text-sm">B.TECH CE</strong>
                </div>
                <div className="w-full bg-[var(--surface-titlebar)] border border-[var(--border-retro)] h-2.5 p-0.5">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${academic.pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mt-1">
                  <span>DDU Nadiad</span>
                  <span>{academic.semester} ({academic.pct}%)</span>
                </div>
              </div>

              <div className="border border-[var(--border-retro)] bg-[var(--surface-panel)] p-3">
                <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                  <span className="text-[var(--text-muted)]">DSA PROBLEMS</span>
                  <strong className="text-blue-600 dark:text-blue-400 font-pixel text-sm font-bold">895+ SOLVED</strong>
                </div>
                <div className="w-full bg-[var(--surface-titlebar)] border border-[var(--border-retro)] h-2.5 p-0.5">
                  <div className="bg-blue-600 dark:bg-blue-400 h-full w-[95%] transition-all duration-500 shadow-sm" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mt-1">
                  <span>LeetCode (802)</span>
                  <span>Codeforces (93)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 1-Bit Dither Photo Frame (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center w-full">
            <div className="retro-window w-full max-w-[300px] p-2.5 bg-[var(--surface-panel)] border-2 border-[var(--border-retro)] shadow-[var(--shadow-hard-md)]">
              {/* Photo Titlebar */}
              <div className="retro-titlebar px-2.5 py-1 mb-2 flex items-center justify-between text-[10px] font-pixel bg-[var(--surface-titlebar)]">
                <span>PORTRAIT.RAW</span>
                <span className="text-emerald-400 font-bold">● ONLINE</span>
              </div>
              
              {/* Photo Canvas */}
              <div className="relative aspect-[3/4] w-full bg-black border border-[var(--border-retro)] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                <Image
                  src="/myphoto_transparent.png"
                  alt="Nitin Kanojiya"
                  fill
                  className="object-contain object-bottom filter contrast-125"
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority
                />
                <div className="absolute inset-0 dither-pattern pointer-events-none opacity-20" />
                <div className="absolute inset-0 crt-screen-overlay pointer-events-none opacity-30" />

                <div className="absolute bottom-1.5 left-1.5 right-1.5 px-2 py-0.5 bg-black/90 border border-[var(--border-retro)] text-[var(--neutral-eggshell)] text-[9px] font-mono flex justify-between font-bold">
                  <span>VADODARA (IN)</span>
                  <span>NITIN KANOJIYA</span>
                </div>
              </div>

              {/* Photo Footer Metadata */}
              <div className="mt-2 text-center text-[10px] font-mono text-[var(--text-muted)] border-t border-[var(--border-retro)] pt-1.5 flex justify-between items-center">
                <strong className="text-[var(--text-main)] font-pixel text-xs">NITIN KANOJIYA</strong>
                <span className="text-[var(--accent-color)] font-bold text-[9px]">ENGINEER</span>
              </div>
            </div>
          </div>

        </div>
      </RetroWindow>
    </section>
  );
}
