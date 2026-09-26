'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden bg-[#0a0a0a]">
      
      {/* Minimalist Grid Lines Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
      />

      <div className="z-10 w-full max-w-7xl mx-auto flex flex-col items-start mt-20">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-gray-400 font-space font-medium">Available for Internship</span>
        </motion.div>
        
        {/* Massive Minimalist Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col gap-2 mb-10"
        >
          <h1 className="text-[12vw] md:text-[120px] font-space font-bold tracking-tighter text-white leading-[0.9] whitespace-nowrap">
            NITIN KANOJIYA.
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-space font-light tracking-tight text-gray-500 leading-tight">
            Backend Developer & <br className="hidden md:block" /> Software Engineer.
          </h2>
        </motion.div>

        {/* Minimalist Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-400 text-lg max-w-xl leading-relaxed mb-16 font-light"
        >
          Computer Engineering undergraduate focused on backend development and full-stack engineering. I build robust APIs, integrate AI capabilities, and write clean, efficient code.
        </motion.p>

        {/* Creative Minimalist Action Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center gap-8"
        >
          <a
            href="#projects"
            className="group flex items-center gap-4 text-white text-lg font-space font-medium"
          >
            <span className="relative overflow-hidden">
              <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1]">Selected Works</span>
              <span className="absolute inset-0 block translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">Selected Works</span>
            </span>
            <div className="w-12 h-[1px] bg-white group-hover:w-20 transition-all duration-500 ease-out" />
          </a>
          
          <a
            href="/Nitin_Kanojiya_Resume.pdf"
            target="_blank"
            className="group flex items-center gap-4 text-gray-500 hover:text-white text-lg font-space transition-colors duration-300"
          >
            Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-20 flex flex-col items-center gap-4 text-gray-600"
      >
        <span className="text-[10px] uppercase tracking-widest font-space -rotate-90 origin-bottom mb-8">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gray-600 to-transparent" />
      </motion.div>

    </section>
  );
}
