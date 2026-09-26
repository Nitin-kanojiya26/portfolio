'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { floatAnimationDelayed } from '@/lib/animationConfig';
import { Wallet, Terminal, FileText, GraduationCap } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: "SpentAi",
      icon: Wallet,
      logoBg: "bg-[#3b82f6]", // Solid Blue
      iconColor: "text-white",
      tech: ["Java", "Spring Boot", "React", "MySQL", "Gemini AI"],
      link: "https://github.com/Nitin-kanojiya26/Expense-tracker-backend",
      desc: "An AI-driven financial architecture built on a robust Java Spring Boot backend. Engineered to eliminate manual expense tracking by seamlessly integrating Google Gemini AI for automated transaction categorization and intelligent pattern analysis."
    },
    {
      title: "Codexium",
      icon: Terminal, // >_ terminal icon
      logoBg: "bg-[#111111] border border-white/10", // Dark Mac Terminal look
      iconColor: "text-white",
      tech: ["React", "Node.js", "Express", "JavaScript"],
      link: "https://github.com/Nitin-kanojiya26/Coding-platform",
      desc: "A robust online compilation environment engineered to provide a seamless, zero-setup coding experience. Features a real-time code editor, syntax highlighting, and secure server-side execution capabilities directly within the browser."
    },
    {
      title: "SmartDoc",
      img: "/projects/smartdoc-logo.jpg", // Using the uploaded custom image logo
      tech: ["Flutter", "Firebase", "Dart", "Gemini API"],
      link: "https://github.com/Nitin-kanojiya26/SmartDoc",
      desc: "An AI-powered document intelligence mobile application built with Flutter and Firebase. Leverages the Gemini API to rapidly process, summarize, and extract actionable insights from massive, high-density PDF documents."
    },
    {
      title: "ClassPluse",
      icon: GraduationCap,
      logoBg: "bg-[#1f2328]", // Dark rounded square from their image
      iconColor: "text-white",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://github.com/Nitin-kanojiya26/ClassPluse",
      desc: "A modern, high-performance educational platform designed to streamline digital classroom management. Engineered with Next.js and TypeScript to provide a centralized, real-time hub for resource distribution and student-teacher interactions."
    }
  ];

  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto min-h-screen relative z-10 flex flex-col justify-center">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <span className="text-sm tracking-[0.3em] text-gray-500 uppercase font-space block mb-4">02 / Work</span>
        <h2 className="text-4xl md:text-6xl font-bold font-space text-white tracking-tight">
          Selected <span className="text-gray-600">Projects.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={floatAnimationDelayed(index * 0.1)}
            animate="animate"
            whileHover={{ y: -8 }}
            className="group flex flex-col bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
          >
            {/* The Image Block / Logo Block */}
            <div 
              className="relative h-64 md:h-72 w-full bg-[#0a0a0a] border-b border-white/5 flex items-center justify-center overflow-hidden"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83v58.34h-58.34v-.83l57.51-58.34h.01zM0 0v58.34h58.34v-.83l-57.51-57.51z' fill='%231f1f1f' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`
              }}
            >
              
              {/* Central Logo matching exactly to user's screenshots */}
              <div className="flex flex-row items-center gap-4 group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1] z-10">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden ${project.logoBg || 'bg-transparent'}`}>
                  {project.img ? (
                    <Image src={project.img} alt={project.title} fill className="object-contain" />
                  ) : (
                    project.icon && <project.icon className={project.iconColor} strokeWidth={2} size={32} />
                  )}
                </div>
                <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {project.title === "SpentAi" ? (
                    <>Spent<span className="text-white">AI</span></>
                  ) : project.title === "Codexium" ? (
                    <>Code<span className="text-[#3b82f6]">xium</span></>
                  ) : project.title}
                </span>
              </div>
              
              {/* LIVE Badge for SpentAi */}
              {project.title === "SpentAi" && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-green-500/30">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-space text-green-400 font-bold uppercase tracking-widest">Live</span>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-[2px]">
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-black text-sm uppercase tracking-widest font-space font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 rounded-sm hover:bg-gray-200"
                >
                  View Project
                </a>
              </div>
            </div>
            
            {/* Project Metadata */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl md:text-3xl font-bold font-space text-white mb-3 tracking-tight group-hover:text-gray-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-widest font-space text-gray-400 bg-white/5 px-3 py-1.5 rounded border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
