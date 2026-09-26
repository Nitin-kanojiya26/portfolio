'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 rounded-full border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex items-center justify-between ${
        isScrolled 
          ? 'w-[90%] max-w-3xl bg-black/60 py-3 px-6 md:px-8' 
          : 'w-[95%] max-w-5xl bg-black/20 py-4 px-8 md:px-12'
      }`}
    >
      {/* Logo */}
      <a href="#home" className="text-xl font-bold tracking-tighter font-space z-10 hover:opacity-80 transition-opacity">
        Developer<span className="text-white">.</span>
      </a>
      
      {/* Desktop Nav - Perfectly Centered */}
      <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`text-sm font-medium transition-all hover:text-white relative group ${
              activeSection === link.name.toLowerCase() ? 'text-white' : 'text-gray-400'
            }`}
          >
            {link.name}
            {activeSection === link.name.toLowerCase() && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
              />
            )}
          </a>
        ))}
      </div>

      {/* Placeholder for right side to balance flex, or mobile toggle */}
      <div className="z-10 flex items-center justify-end w-16">
        <button 
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 glass-card mt-2 mx-0 p-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium p-2 rounded-md ${
                  activeSection === link.name.toLowerCase() ? 'bg-accent/10 text-accent' : 'text-gray-400'
                }`}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
