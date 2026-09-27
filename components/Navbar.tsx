'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = navLinks.map(link => link.name.toLowerCase());
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-40 flex justify-center pointer-events-none w-full px-2 sm:px-4">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`pointer-events-auto transition-all duration-500 rounded-full border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex items-center justify-between ${
          isScrolled 
            ? 'w-[98%] md:w-[90%] max-w-3xl bg-black/60 py-3 px-4 md:px-8' 
            : 'w-[98%] md:w-full max-w-5xl bg-black/20 py-4 px-4 md:px-12'
        }`}
      >
        {/* Logo - Hide or condense on very small screens to fit links */}
        <a href="#home" className="hidden sm:block text-xl font-bold tracking-tighter font-space z-10 hover:opacity-80 transition-opacity">
          Developer<span className="text-white">.</span>
        </a>
        <a href="#home" className="sm:hidden text-base font-bold tracking-tighter font-space z-10 hover:opacity-80 transition-opacity">
          Dev<span className="text-white">.</span>
        </a>
        
        {/* Universal Horizontal Nav - Scaled for Mobile */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 absolute left-[55%] sm:left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[10px] sm:text-xs md:text-sm font-medium transition-all hover:text-white relative group ${
                activeSection === link.name.toLowerCase() ? 'text-white' : 'text-gray-400'
              }`}
            >
              {link.name}
              {activeSection === link.name.toLowerCase() && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                />
              )}
            </a>
          ))}
        </div>

        {/* Empty Placeholder to balance flex layout */}
        <div className="z-10 w-4 sm:w-16"></div>
      </motion.nav>
    </div>
  );
}
