'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SiClaude, SiDeepseek, SiGooglegemini, SiOllama } from 'react-icons/si';
import { RiOpenaiFill } from 'react-icons/ri';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeLogoIndex, setActiveLogoIndex] = useState(0);

  const skills: any[] = [
    {
      category: "Languages",
      description: "The core languages I use to build robust, scalable logic and architecture.",
      logos: [
        { name: "TypeScript", src: "/stack/Typescript.svg" },
        { name: "JavaScript", src: "/stack/Javascript.svg" },
        { name: "Java", src: "/stack/java.svg" },
        { name: "C#", src: "/stack/csharp.svg" },
        { name: "Python", src: "/stack/python.svg" },
        { name: "C/C++", src: "/stack/cpp.svg" },
        { name: "HTML/CSS", src: "/stack/HTML.png" }
      ]
    },
    {
      category: "Frameworks & Stacks",
      description: "Modern frameworks that allow me to craft seamless user experiences and powerful backends.",
      logos: [
        { name: "Next.js", src: "/stack/Next.svg" },
        { name: "React.js", src: "/stack/React.png" },
        { name: "Node.js", src: "/stack/NodeJs.svg" },
        { name: "Express", src: "/stack/Express.png" },
        { name: "Spring Boot", src: "/stack/spring.svg" },
        { name: ".NET", src: "/stack/dotnet.svg" },
        { name: "Django", src: "/stack/django.svg" }
      ]
    },
    {
      category: "Databases & Tools",
      description: "The infrastructure and databases that keep data secure, organized, and instantly accessible.",
      logos: [
        { name: "MongoDB", src: "/stack/mongodb_devicon.svg" },
        { name: "PostgreSQL", src: "/stack/postgresql.svg" },
        { name: "MySQL", src: "/stack/mysql.svg" },
        { name: "Oracle", src: "/stack/oracle.svg" },
        { name: "Git/GitHub", src: "/stack/Github.svg" },
        { name: "Postman", src: "/stack/postman.svg" },
        { name: "Docker", src: "/stack/Docker.svg" }
      ]
    },
    {
      category: "AI Models & Agents",
      description: "Generative AI models and tools I use to augment development, automate workflows, and build intelligent features.",
      logos: [
        { name: "Ollama", icon: SiOllama, color: "#FFFFFF" },
        { name: "Claude", icon: SiClaude, color: "#D97757" },
        { name: "Gemini", icon: SiGooglegemini, color: "#8E75B2" },
        { name: "DeepSeek", icon: SiDeepseek, color: "#4D7DF5" },
        { name: "Codex", icon: RiOpenaiFill, color: "#10A37F" }
      ]
    }
  ];

  // Auto-play interval effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLogoIndex((prev) => {
        const currentCategoryLength = skills[activeCategory].logos.length;
        if (prev + 1 >= currentCategoryLength) {
          // Move to next category securely without callback race conditions
          setActiveCategory((activeCategory + 1) % skills.length);
          return 0; // Reset logo index for the new category
        }
        return prev + 1; // Move to next logo
      });
    }, 2000); // 2 seconds delay to make it move much slower and give time to read

    return () => clearInterval(timer);
  }, [activeCategory, skills.length]);

  return (
    <section id="skills" className="py-32 px-6 max-w-7xl mx-auto min-h-screen relative z-10 flex flex-col justify-center">
      
      {/* Minimalist Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        {/* Left Column: Typography & Navigation */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.3em] text-gray-400 uppercase mb-4 font-space"
          >
            Technical Expertise
          </motion.h2>
          
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight leading-tight"
          >
            The tools <br/><span className="text-gray-500">I build with.</span>
          </motion.h3>

          <div className="flex flex-col gap-2">
            {skills.map((skill, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                onClick={() => {
                  setActiveCategory(index);
                  setActiveLogoIndex(0);
                }}
                className={`text-left group relative py-4 px-6 border-l-2 transition-all duration-300 ${
                  activeCategory === index 
                    ? "border-white bg-white/[0.03]" 
                    : "border-white/10 hover:border-white/30 hover:bg-white/[0.01]"
                }`}
              >
                <h4 className={`text-xl md:text-2xl font-space font-semibold transition-colors duration-300 ${
                  activeCategory === index ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                }`}>
                  {skill.category}
                </h4>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Column: The Display Stage */}
        <div className="lg:col-span-7 flex items-center justify-center min-h-[400px]">
          <div className="w-full relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                  {skills[activeCategory].description}
                </p>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-6 gap-y-12 justify-items-center">
                  {skills[activeCategory].logos.map((logo: any, i: number) => {
                    const isHighlighted = i === activeLogoIndex;

                    return (
                      <motion.div 
                        key={logo.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="flex flex-col items-center gap-4 group/icon w-full cursor-pointer"
                        onMouseEnter={() => setActiveLogoIndex(i)}
                      >
                        {logo.icon ? (
                          <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center" title={logo.name}>
                            <div className={`absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 transition-opacity duration-300 ${isHighlighted ? 'opacity-100' : 'opacity-0 group-hover/icon:opacity-100'}`} />
                            <logo.icon 
                              className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-500 transform ${isHighlighted ? 'opacity-100 scale-110 -translate-y-1' : 'opacity-70 text-gray-500 group-hover/icon:opacity-100 group-hover/icon:scale-110 group-hover/icon:-translate-y-1'}`} 
                              style={isHighlighted ? { color: logo.color } : undefined}
                            />
                          </div>
                        ) : (
                          logo.src && (
                            <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0" title={logo.name}>
                              <div className={`absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 transition-opacity duration-300 ${isHighlighted ? 'opacity-100' : 'opacity-0 group-hover/icon:opacity-100'}`} />
                              <Image 
                                src={logo.src}
                                alt={logo.name}
                                fill
                                className={`object-contain transition-all duration-500 transform ${isHighlighted ? 'grayscale-0 opacity-100 scale-110 -translate-y-1' : 'grayscale opacity-50 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 group-hover/icon:scale-110 group-hover/icon:-translate-y-1'}`}
                              />
                            </div>
                          )
                        )}
                        <span className={`text-xs font-space font-medium transition-colors duration-300 tracking-wide text-center ${isHighlighted ? 'text-white' : 'text-gray-500 group-hover/icon:text-white'}`}>
                          {logo.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
            
          </div>
        </div>

      </div>
    </section>
  );
}
