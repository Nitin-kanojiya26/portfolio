'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('./Globe'), {
  ssr: false,
  loading: () => <div className="w-[600px] h-[600px] max-w-full opacity-0" />
});

export default function Contact() {
  const socials = [
    { name: "GitHub", url: "https://github.com/Nitin-kanojiya26", icon: <FaGithub size={24} /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/nitinkanojiya/", icon: <FaLinkedin size={24} /> },
    { name: "LeetCode", url: "https://leetcode.com/u/Nitin__26/", icon: <SiLeetcode size={24} /> },
    { name: "Codeforces", url: "https://codeforces.com/profile/Nitin__26", icon: <SiCodeforces size={24} /> }
  ];
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; city?: string } | null>(null);

  const [currentTime, setCurrentTime] = useState<string>("Vadodara, India (GMT+5:30)");

  useEffect(() => {
    // Clock tick
    const timer = setInterval(() => {
      const timeStr = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit'
      });
      setCurrentTime(`Vadodara, India (${timeStr})`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data.latitude && data.longitude) {
          setUserLocation({
            lat: data.latitude,
            lng: data.longitude,
            city: data.city || 'Vadodara'
          });
        }
      })
      .catch(() => { });
  }, []);

  return (
    <section id="contact" className="py-32 px-6 md:px-20 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center relative z-10">
      
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-12 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <span className="text-sm tracking-[0.3em] text-gray-500 uppercase font-space">02 / Contact</span>
          <h2 className="text-5xl md:text-8xl font-space font-bold text-white tracking-tighter leading-[0.9]">
            Let's build <br/><span className="text-gray-600">together.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 md:mt-0 flex flex-col gap-2 text-right"
        >
          <span className="text-gray-500 font-space text-sm tracking-widest uppercase">Local Time</span>
          <span className="text-white font-space font-medium text-xl w-64">{currentTime}</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Email Link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start gap-8"
        >
          <p className="text-gray-400 font-light text-lg max-w-sm">
            I am actively seeking Software Engineering internships. If you have an opportunity or just want to chat, feel free to reach out.
          </p>
          
          <a 
            href="mailto:kanojiyanitin870@gmail.com"
            className="group flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-90 transition-transform duration-500 ease-[0.16,1,0.3,1]">
              <Mail size={24} />
            </div>
            <span className="text-[5vw] sm:text-2xl md:text-3xl font-space text-white group-hover:text-gray-400 transition-colors duration-500 break-words">
              kanojiyanitin870@gmail.com
            </span>
          </a>
        </motion.div>

        {/* Social Links Grid */}
        <div className="flex flex-col gap-4 md:items-end">
          {socials.map((social, i) => (
            <motion.a 
              key={social.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              href={social.url}
              target="_blank"
              className="flex items-center gap-6 group py-4 border-b border-transparent hover:border-white/10 transition-colors"
            >
              <span className="text-2xl font-space font-light text-gray-500 group-hover:text-white transition-colors">
                {social.name}
              </span>
              <div className="w-10 h-10 flex items-center justify-center text-gray-500 group-hover:text-white transition-colors">
                {social.icon && social.icon}
              </div>
            </motion.a>
          ))}
        </div>

      </div>

      {/* 3D Earth IP Tracking & Viewing Info */}
      <div className="relative w-full flex items-center justify-center mt-12">
        {/* Left Side Text */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute left-0 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 z-20"
        >
          <span className="text-gray-500 font-space text-sm tracking-[0.2em] uppercase">Viewing From</span>
          <span className="text-white font-space font-bold text-2xl md:text-3xl tracking-tight">
            {userLocation ? userLocation.city : 'Earth'}
          </span>
        </motion.div>

        <Globe userLocation={userLocation} />
      </div>

    </section>
  );
}
