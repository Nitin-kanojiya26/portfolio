'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-20 max-w-[1400px] mx-auto min-h-screen relative z-10 flex flex-col justify-center">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
        
        {/* Left: The Massive Manifesto */}
        <div className="lg:col-span-8 flex flex-col">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.3em] text-gray-500 uppercase font-space mb-12"
          >
            01 / Background
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-space font-medium text-white leading-tight tracking-tight mb-12"
          >
            I specialize in building robust backend systems, integrating AI APIs, and developing complete full-stack applications.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400 font-light leading-relaxed text-lg"
          >
            <p>
              I am a Computer Engineering undergraduate at Dharmsinh Desai University with a strong focus on backend architecture, API design, and data structures. Based in Vadodara, my core expertise revolves around the Java and Spring Boot ecosystem.
            </p>
            <p>
              With a solid foundation in competitive programming and algorithmic problem-solving, I enjoy tackling complex challenges and writing efficient logic. I don't just write code—I design structured databases, secure APIs, and ship complete applications from scratch.
            </p>
          </motion.div>
        </div>
        
        {/* Right: The Minimalist Portrait */}
        <div className="lg:col-span-4 h-full flex items-end justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm aspect-[3/4] bg-white/[0.02] border border-white/5 overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-80" />
             <Image 
               src="/myphoto_transparent.png"
               alt="Nitin Kanojiya"
               fill
               className="object-cover object-bottom grayscale opacity-80 hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
             />
          </motion.div>
        </div>

      </div>

      {/* Minimalist Stats/Divider */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-[1px] bg-white/10 mt-32 origin-left"
      />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
        {[
          { label: "Education", value: "Dharmsinh Desai University" },
          { label: "Academic Standing", value: "8.6 CGPA" },
          { label: "Location", value: "Vadodara, India" },
          { label: "Status", value: "Open for Internships" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="flex flex-col gap-2"
          >
            <span className="text-gray-500 text-xs font-space uppercase tracking-widest">{stat.label}</span>
            <span className="text-white font-space font-medium">{stat.value}</span>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
