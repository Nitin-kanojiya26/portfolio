'use client';

import React, { useState } from 'react';
import RetroWindow from './RetroWindow';
import { Download, ExternalLink, Phone, Mail, MapPin, GraduationCap, CheckCircle2, Award, FileCode } from 'lucide-react';
import { getAcademicProgress } from '@/lib/academicProgress';

export default function ResumeDossier() {
  const [activeTab, setActiveTab] = useState<'all' | 'skills' | 'education' | 'achievements'>('all');
  const academic = getAcademicProgress();

  return (
    <section id="resume" className="w-full py-2 sm:py-4 px-2 sm:px-4 md:px-8 max-w-[1440px] mx-auto">
      <RetroWindow
        title="02_RESUME.DOC"
        badge="ATS_OPTIMIZED"
        statusText="ACTIVE • ATS COMPLIANT"
        pathText="DIR: /NITIN_KANOJIYA/RESUME.PDF"
      >
        {/* Header Ribbon */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 mb-6 border-b-2 border-[var(--border-retro)]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-widest font-bold">
                OFFICIAL RESUME
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-pixel font-bold text-[var(--text-main)]">
              NITIN KANOJIYA
            </h2>
            <p className="text-xs sm:text-sm font-mono text-emerald-600 dark:text-emerald-400 mt-1 font-bold">
              Backend Developer | AI Engineering
            </p>
          </div>

          {/* Contact Details & PDF Download Action */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/Nitin_Kanojiya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn px-5 py-3 font-pixel text-xs sm:text-sm font-bold flex items-center gap-2 bg-[var(--accent-color)] text-[var(--accent-contrast)] hover:opacity-95 shadow-[0_0_15px_var(--accent-glow)]"
            >
              <Download size={16} />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>

            <a
              href="mailto:kanojiyanitin870@gmail.com"
              className="retro-btn px-4 py-3 font-pixel text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <Mail size={16} />
              <span>EMAIL CANDIDATE</span>
            </a>
          </div>
        </div>

        {/* Contact Info Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8 text-xs font-mono">
          <div className="p-3 border border-[var(--border-retro)] bg-[var(--surface-panel)] flex items-center gap-2.5">
            <Phone size={14} className="text-[var(--accent-color)] shrink-0" />
            <div>
              <span className="text-[9px] text-[var(--text-muted)] block">PHONE</span>
              <strong className="text-[var(--text-main)]">+91 6355 678 578</strong>
            </div>
          </div>

          <div className="p-3 border border-[var(--border-retro)] bg-[var(--surface-panel)] flex items-center gap-2.5">
            <Mail size={14} className="text-[var(--accent-color)] shrink-0" />
            <div className="truncate">
              <span className="text-[9px] text-[var(--text-muted)] block">EMAIL</span>
              <strong className="text-[var(--text-main)] truncate">kanojiyanitin870@gmail.com</strong>
            </div>
          </div>

          <div className="p-3 border border-[var(--border-retro)] bg-[var(--surface-panel)] flex items-center gap-2.5">
            <MapPin size={14} className="text-[var(--accent-color)] shrink-0" />
            <div>
              <span className="text-[9px] text-[var(--text-muted)] block">LOCATION</span>
              <strong className="text-[var(--text-main)]">Vadodara, Gujarat, India</strong>
            </div>
          </div>

          <div className="p-3 border border-[var(--border-retro)] bg-[var(--surface-panel)] flex items-center gap-2.5">
            <GraduationCap size={14} className="text-[var(--accent-color)] shrink-0" />
            <div>
              <span className="text-[9px] text-[var(--text-muted)] block">AVAILABILITY</span>
              <strong className="text-emerald-600 dark:text-emerald-400">Open to Opportunities</strong>
            </div>
          </div>
        </div>

        {/* Main Resume Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Summary, Education & Achievements (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Executive Summary */}
            <div className="p-4 sm:p-5 border-2 border-[var(--border-retro)] bg-[var(--surface-panel)] shadow-[var(--shadow-hard-sm)]">
              <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-wider block mb-2 font-bold">
                PROFESSIONAL SUMMARY
              </span>
              <p className="text-xs sm:text-sm font-sans text-[var(--text-main)] leading-relaxed">
                Computer Engineering student at <strong>Dharmsinh Desai University</strong> with strong Data Structures and Algorithms fundamentals and hands-on experience building backend systems using <strong>Java, Spring Boot, Node.js, and Express.js</strong>. Experienced in designing REST APIs, integrating AI services, implementing asynchronous job processing, and working with relational and NoSQL databases. Built projects involving distributed processing, Docker-based code execution, Redis caching, and AI-powered code review using RAG. Seeking a Backend Development / Software Engineering Internship.
              </p>
            </div>

            {/* Education Box */}
            <div className="p-4 sm:p-5 border-2 border-[var(--border-retro)] bg-[var(--surface-panel)] shadow-[var(--shadow-hard-sm)]">
              <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-wider block mb-2 font-bold">
                EDUCATION &amp; INSTITUTION
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h4 className="text-base sm:text-lg font-pixel font-bold text-[var(--text-main)]">
                  B.Tech, Computer Engineering
                </h4>
                <span className="text-xs font-mono text-[var(--accent-color)] font-bold">
                  Expected May 2028
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-[var(--text-muted)] mb-3">
                Dharmsinh Desai University, Nadiad, Gujarat
              </p>

              <div className="space-y-2 bg-[var(--surface-window)] p-3 border border-[var(--border-retro)]">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-main)] font-bold">Currently in {academic.semester}</span>
                  <span className="text-[var(--accent-color)] font-bold">{academic.pct}% ACADEMIC PROGRESS</span>
                </div>
                <div className="w-full bg-[var(--surface-titlebar)] border border-[var(--border-retro)] h-2.5 p-0.5">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${academic.pct}%` }}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">CGPA: 8.6 / 10.0 (through Semester 4)</span>
                  <span>COURSEWORK: DSA, DBMS, OS, Networks, OOP</span>
                </div>
              </div>
            </div>

            {/* Achievements & Engineering Strengths */}
            <div className="p-4 sm:p-5 border-2 border-[var(--border-retro)] bg-[var(--surface-panel)] shadow-[var(--shadow-hard-sm)]">
              <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-wider block mb-2 font-bold">
                KEY ACHIEVEMENTS &amp; COMPETENCIES
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[var(--text-muted)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--text-main)]">End-to-End Application Development:</strong> Independently designed and developed full-stack applications, covering database design, backend development, REST API integration, and frontend implementation.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--text-main)]">Algorithmic Problem Solving:</strong> Applied Data Structures and Algorithms, OOP, and problem-solving techniques to develop efficient and scalable software solutions.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--text-main)]">Competitive Programming:</strong> 895+ algorithmic problems solved across competitive programming platforms (802 on LeetCode: 449 Medium, 317 Easy, 36 Hard; 93 on Codeforces).
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Complete Verified Skills Matrix from Resume (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-4 sm:p-6 border-2 border-[var(--border-retro)] bg-[var(--surface-panel)] shadow-[var(--shadow-hard-lg)]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-retro)]">
                <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-wider font-bold">
                  TECHNICAL SKILLS
                </span>
                <span className="text-[10px] font-mono text-emerald-500 font-bold">FROM RESUME</span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                {/* Languages */}
                <div>
                  <strong className="text-[var(--accent-color)] text-xs uppercase block mb-1.5 font-bold">
                    LANGUAGES:
                  </strong>
                  <div className="flex flex-wrap gap-1.5">
                    {['Java', 'C', 'C++', 'HTML', 'CSS', 'Python', 'JavaScript', 'PHP'].map((s) => (
                      <span key={s} className="px-2 py-0.5 border border-[var(--border-retro)] bg-[var(--surface-window)] text-[var(--text-main)] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div className="border-t border-[var(--border-retro)] pt-3">
                  <strong className="text-[var(--accent-color)] text-xs uppercase block mb-1.5 font-bold">
                    FRAMEWORKS:
                  </strong>
                  <div className="flex flex-wrap gap-1.5">
                    {['Spring Boot', 'Node.js', 'Express.js', 'Django', 'REST APIs', 'JWT Authentication', 'WebSockets (Socket.IO)'].map((s) => (
                      <span key={s} className="px-2 py-0.5 border border-[var(--border-retro)] bg-[var(--surface-window)] text-[var(--text-main)] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Databases */}
                <div className="border-t border-[var(--border-retro)] pt-3">
                  <strong className="text-[var(--accent-color)] text-xs uppercase block mb-1.5 font-bold">
                    DATABASES:
                  </strong>
                  <div className="flex flex-wrap gap-1.5">
                    {['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'].map((s) => (
                      <span key={s} className="px-2 py-0.5 border border-[var(--border-retro)] bg-[var(--surface-window)] text-[var(--text-main)] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="border-t border-[var(--border-retro)] pt-3">
                  <strong className="text-[var(--accent-color)] text-xs uppercase block mb-1.5 font-bold">
                    TOOLS:
                  </strong>
                  <div className="flex flex-wrap gap-1.5">
                    {['Docker', 'Git', 'GitHub', 'Postman', 'BullMQ', 'Judge0'].map((s) => (
                      <span key={s} className="px-2 py-0.5 border border-[var(--border-retro)] bg-[var(--surface-window)] text-[var(--text-main)] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Concepts */}
                <div className="border-t border-[var(--border-retro)] pt-3">
                  <strong className="text-[var(--accent-color)] text-xs uppercase block mb-1.5 font-bold">
                    CONCEPTS:
                  </strong>
                  <div className="flex flex-wrap gap-1.5">
                    {['REST API Design', 'JPA/Hibernate', 'OOP', 'JWT-based Authentication'].map((s) => (
                      <span key={s} className="px-2 py-0.5 border border-[var(--border-retro)] bg-[var(--surface-window)] text-[var(--text-main)] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CS Fundamentals */}
                <div className="border-t border-[var(--border-retro)] pt-3">
                  <strong className="text-[var(--accent-color)] text-xs uppercase block mb-1.5 font-bold">
                    CS FUNDAMENTALS:
                  </strong>
                  <div className="flex flex-wrap gap-1.5">
                    {['Data Structures & Algorithms', 'DBMS'].map((s) => (
                      <span key={s} className="px-2 py-0.5 border border-[var(--border-retro)] bg-[var(--surface-window)] text-emerald-600 dark:text-emerald-400 font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </RetroWindow>
    </section>
  );
}

