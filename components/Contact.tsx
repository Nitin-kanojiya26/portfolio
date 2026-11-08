'use client';

import React, { useState, useEffect } from 'react';
import RetroWindow from './RetroWindow';
import RetroRadar from './RetroRadar';
import { Mail, Copy, Check, ExternalLink, Play, Terminal, Phone, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('--:--');
  
  // Interactive Code Editor Form State
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Connecting with Nitin / Role Inquiry');
  const [messageBody, setMessageBody] = useState(
    'Hi Nitin, I reviewed your portfolio and would like to discuss a software engineering opportunity with you.'
  );
  const [consoleLog, setConsoleLog] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  // Live ticking Vadodara (IST) clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeStr);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRunCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsExecuting(true);
    setConsoleLog([
      '[CARRIER UPLINK INITIALIZED]',
      '> ENCODING PAYLOAD: TypeScript payload object...',
      `> SENDER: ${senderName || 'Visitor'} <${senderEmail || 'visitor@company.com'}>`,
      '> RADAR BEACON: PACKET PREPARED FOR kanojiyanitin870@gmail.com',
    ]);

    const formattedPayload = `To: kanojiyanitin870@gmail.com\nSubject: ${subject || 'Portfolio Inquiry'}\nFrom: ${senderName || 'Anonymous'} <${senderEmail || 'Not provided'}>\n\n${messageBody}`;

    // Safely copy payload to clipboard as an instant reliable backup
    try {
      navigator.clipboard.writeText(formattedPayload);
    } catch {}

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=kanojiyanitin870@gmail.com&su=${encodeURIComponent(
      subject || 'Connecting with Nitin Kanojiya'
    )}&body=${encodeURIComponent(
      `From: ${senderName || 'Anonymous'}\nEmail: ${senderEmail || 'Not provided'}\n\n${messageBody}`
    )}`;

    setTimeout(() => {
      setConsoleLog((prev) => [
        ...prev,
        '> ✈ MESSAGE AIRPLANE LAUNCHED FROM USER PIN...',
        '> IN-FLIGHT TRAJECTORY: HEADING TO VADODARA (HOST PIN)...',
      ]);
    }, 500);

    setTimeout(() => {
      setConsoleLog((prev) => [
        ...prev,
        '> ✈ AIRPLANE ARRIVED AT HOST PIN (NITIN @ VADODARA)',
        '> LAUNCHING GMAIL WEB COMPOSE DIRECTLY IN BROWSER...',
        '> PAYLOAD COPIED TO CLIPBOARD FOR SAFETY',
        '> STATUS: 200 OK — TAB LAUNCHED!',
      ]);

      // Open Gmail Web Compose in new tab (never fails on missing desktop apps)
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      setIsExecuting(false);
    }, 1600);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('kanojiyanitin870@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: 'GitHub',
      handle: '@Nitin-kanojiya26',
      url: 'https://github.com/Nitin-kanojiya26',
      icon: FaGithub,
      hoverText: 'group-hover:text-white',
      hoverBorder: 'hover:border-white/80',
    },
    {
      name: 'LinkedIn',
      handle: 'in/nitinkanojiya',
      url: 'https://www.linkedin.com/in/nitinkanojiya/',
      icon: FaLinkedin,
      hoverText: 'group-hover:text-[#0a66c2]',
      hoverBorder: 'hover:border-[#0a66c2]',
    },
    {
      name: 'LeetCode',
      handle: 'u/Nitin__26',
      url: 'https://leetcode.com/u/Nitin__26/',
      icon: SiLeetcode,
      hoverText: 'group-hover:text-[#FFA116]',
      hoverBorder: 'hover:border-[#FFA116]',
    },
    {
      name: 'Codeforces',
      handle: 'profile/Nitin__26',
      url: 'https://codeforces.com/profile/Nitin__26',
      icon: SiCodeforces,
      hoverText: 'group-hover:text-[#3b82f6]',
      hoverBorder: 'hover:border-[#3b82f6]',
    },
  ];

  return (
    <section id="contact" className="w-full py-2 sm:py-4 px-2 sm:px-4 md:px-8 max-w-[1440px] mx-auto">
      <RetroWindow
        title="05_CONTACT_AND_RADAR.EXE"
        badge="ONLINE • PORT 8080"
        statusText="COMM CHANNEL: READY • RADAR TRACKING"
        pathText="DIR: /COMMUNICATION/SEND_MESSAGE.TS"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5 pb-3 border-b-2 border-[var(--border-retro)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-[var(--accent-color)] uppercase tracking-widest font-bold">
                CONNECT &amp; TRANSMIT
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-pixel font-bold text-[var(--text-main)] tracking-tight">
              GET IN TOUCH
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono max-w-md">
            Type your message in the code editor and run it to beam an email directly to Nitin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 🌟 Left Column: THE INTERACTIVE CODE EDITOR (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            
            <div className="bg-black border-2 border-[var(--border-retro)] shadow-[var(--shadow-hard-md)] overflow-hidden font-mono text-xs sm:text-sm">
              
              {/* Code Editor Tab Bar */}
              <div className="flex items-center justify-between border-b border-[var(--border-retro)] bg-[#0a0a0a] px-3 py-1.5 select-none text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1 bg-black border-t-2 border-t-white border-l border-r border-[var(--border-retro)] text-white font-bold text-xs">
                    <span className="text-white font-pixel text-xs font-bold">[TS]</span>
                    <span>send_message.ts</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-[#A5A9AE]">
                  <span>TypeScript</span>
                  <span className="text-emerald-400 font-bold">● READY</span>
                </div>
              </div>

              {/* Code Editor Body */}
              <form onSubmit={handleRunCode} className="p-3 sm:p-5 text-[#F2EFE8] leading-relaxed overflow-x-auto bg-black">
                
                {/* Code Comments */}
                <div className="text-[#5F6266] italic text-[11px] mb-2.5 select-none">
                  <span className="text-[#5F6266] mr-3 font-mono not-italic inline-block w-5 text-right">02</span><span className="text-white not-italic font-bold">import</span> &#123; <span className="text-[#A5A9AE] not-italic">sendEmail</span> &#125; <span className="text-white not-italic font-bold">from</span> <span className="text-emerald-400 not-italic">&apos;@nitin/contact&apos;</span>;<br />
                  <span className="text-[#5F6266] mr-3 font-mono not-italic inline-block w-5 text-right">03</span>
                </div>

                {/* Object declaration */}
                <div className="text-xs sm:text-sm">
                  <span className="text-[#5F6266] mr-3 font-mono select-none inline-block w-5 text-right">04</span>
                  <span className="text-white font-bold">const</span> <span className="text-[#A5A9AE]">payload</span> = &#123;
                </div>

                {/* Field 1: Sender Name */}
                <div className="flex items-center my-1 pl-4 sm:pl-5">
                  <span className="text-[#5F6266] mr-3 font-mono select-none text-xs inline-block w-5 text-right">05</span>
                  <span className="text-white font-bold mr-1.5">name:</span>
                  <span className="text-emerald-400">&quot;</span>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Name / Company"
                    className="bg-black border border-[var(--border-retro)] focus:border-white focus:ring-1 focus:ring-white outline-none text-white placeholder:text-[#5F6266] font-mono text-xs sm:text-sm px-2.5 py-1 rounded-none mx-1 flex-1 max-w-sm transition-colors"
                  />
                  <span className="text-emerald-400">&quot;</span>,
                </div>

                {/* Field 2: Sender Email */}
                <div className="flex items-center my-1 pl-4 sm:pl-5">
                  <span className="text-[#5F6266] mr-3 font-mono select-none text-xs inline-block w-5 text-right">06</span>
                  <span className="text-white font-bold mr-1.5">email:</span>
                  <span className="text-emerald-400">&quot;</span>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    className="bg-black border border-[var(--border-retro)] focus:border-white focus:ring-1 focus:ring-white outline-none text-white placeholder:text-[#5F6266] font-mono text-xs sm:text-sm px-2.5 py-1 rounded-none mx-1 flex-1 max-w-sm transition-colors"
                  />
                  <span className="text-emerald-400">&quot;</span>,
                </div>

                {/* Field 3: Subject */}
                <div className="flex items-center my-1 pl-4 sm:pl-5">
                  <span className="text-[#5F6266] mr-3 font-mono select-none text-xs inline-block w-5 text-right">07</span>
                  <span className="text-white font-bold mr-1.5">subject:</span>
                  <span className="text-emerald-400">&quot;</span>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-black border border-[var(--border-retro)] focus:border-white focus:ring-1 focus:ring-white outline-none text-white placeholder:text-[#5F6266] font-mono text-xs sm:text-sm px-2.5 py-1 rounded-none mx-1 flex-1 max-w-sm transition-colors"
                  />
                  <span className="text-emerald-400">&quot;</span>,
                </div>

                {/* Field 4: Message Textarea */}
                <div className="my-1.5 pl-4 sm:pl-5">
                  <div className="flex items-center">
                    <span className="text-[#5F6266] mr-3 font-mono select-none text-xs inline-block w-5 text-right">08</span>
                    <span className="text-white font-bold mr-1.5">message:</span>
                    <span className="text-emerald-400">&grave;</span>
                  </div>
                  <div className="pl-8 my-1.5">
                    <textarea
                      rows={2}
                      required
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      placeholder="Write your message here..."
                      className="w-full bg-black border border-[var(--border-retro)] focus:border-white focus:ring-1 focus:ring-white outline-none text-emerald-400 placeholder:text-[#5F6266] font-mono text-xs p-2.5 rounded-none resize-y transition-colors"
                    />
                  </div>
                  <div className="pl-8">
                    <span className="text-emerald-400">&grave;</span>,
                  </div>
                </div>

                {/* Closing curly */}
                <div className="text-xs sm:text-sm">
                  <span className="text-[#5F6266] mr-3 font-mono select-none inline-block w-5 text-right">09</span>
                  &#125;;
                </div>

                {/* Function Execution Call */}
                <div className="text-xs mt-2 pl-0 text-white">
                  <span className="text-[#5F6266] mr-3 font-mono select-none inline-block w-5 text-right">10</span>
                  <span className="text-white font-bold">await</span> <span className="text-[#A5A9AE]">sendEmail</span>(payload, &#123; to: <span className="text-emerald-400">&quot;kanojiyanitin870@gmail.com&quot;</span> &#125;);
                </div>

                {/* Execution Button Bar */}
                <div className="mt-4 pt-3.5 border-t border-[var(--border-retro)] flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    type="submit"
                    disabled={isExecuting}
                    className="px-5 py-2.5 font-pixel text-xs sm:text-sm font-bold flex items-center gap-2 bg-black hover:bg-white hover:text-black text-white border-2 border-white shadow-[var(--shadow-hard-sm)] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <Play size={14} fill="currentColor" />
                    <span>{isExecuting ? 'TRANSMITTING VIA RADAR...' : '[▶] RUN CODE & SEND EMAIL'}</span>
                  </button>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="px-3.5 py-2 font-pixel text-xs font-bold flex items-center gap-1.5 bg-black hover:bg-[#1a1a1a] text-white border border-[var(--border-retro)] rounded-none cursor-pointer transition-colors"
                    >
                      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copied ? 'COPIED!' : 'COPY EMAIL'}</span>
                    </button>

                    <a
                      href={`mailto:kanojiyanitin870@gmail.com?subject=${encodeURIComponent(
                        subject || 'Connecting with Nitin Kanojiya'
                      )}&body=${encodeURIComponent(
                        `From: ${senderName || 'Anonymous'}\nEmail: ${senderEmail || 'Not provided'}\n\n${messageBody}`
                      )}`}
                      className="px-3 py-2 font-pixel text-xs font-bold flex items-center gap-1.5 bg-black hover:bg-[#1a1a1a] text-[#A5A9AE] hover:text-white border border-[var(--border-retro)] rounded-none cursor-pointer transition-colors"
                      title="Open with Outlook or default desktop mail app"
                    >
                      <ExternalLink size={12} />
                      <span>MAILTO CLIENT</span>
                    </a>
                  </div>
                </div>

              </form>

              {/* Terminal Execution Console Output */}
              {consoleLog.length > 0 && (
                <div className="border-t border-[var(--border-retro)] bg-black p-3 font-mono text-xs text-emerald-400 select-none">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#A5A9AE] mb-1.5 border-b border-[var(--border-retro)] pb-1">
                    <Terminal size={12} />
                    <span>TERMINAL OUTPUT</span>
                  </div>
                  {consoleLog.map((log, i) => (
                    <div key={i} className="leading-tight text-[11px] font-mono text-emerald-400">{log}</div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* 🌟 Right Column: RETRO RADAR + DIRECT CHANNELS (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            
            {/* The Restored Retro Radar with Real-Time Transmission Link */}
            <RetroRadar isTransmitting={isExecuting} />

            {/* Direct Verification Box */}
            <div className="retro-window p-3.5 bg-[var(--surface-panel)] border-2 border-[var(--border-retro)] shadow-[var(--shadow-hard-sm)] font-mono text-xs">
              <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b border-[var(--border-retro)] font-pixel text-xs">
                <span>DIRECT_CONTACT</span>
                <span className="text-emerald-400">● AVAILABLE</span>
              </div>

              <div className="space-y-2">
                <div className="p-2 border border-[var(--border-retro)] bg-[var(--surface-window)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">EMAIL</span>
                  <a href="mailto:kanojiyanitin870@gmail.com" className="font-bold text-[var(--text-main)] hover:text-[var(--accent-color)] text-xs break-all">
                    kanojiyanitin870@gmail.com
                  </a>
                </div>

                <div className="p-2 border border-[var(--border-retro)] bg-[var(--surface-window)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">PHONE</span>
                  <a href="tel:+916355678578" className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                    +91 6355 678 578
                  </a>
                </div>

                <div className="p-2 border border-[var(--border-retro)] bg-[var(--surface-window)] flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-[var(--text-muted)] block uppercase">LOCATION</span>
                    <strong className="text-[var(--text-main)] text-xs block">
                      Vadodara, Gujarat, India
                    </strong>
                  </div>
                  <span className="text-[10px] text-[var(--accent-color)] font-mono font-bold">{currentTime} (IST)</span>
                </div>
              </div>
            </div>

            {/* Social Channels Network */}
            <div className="grid grid-cols-2 gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 border border-[var(--border-retro)] bg-[var(--surface-panel)] flex items-center justify-between group transition-all duration-150 hover:bg-[var(--surface-window)] ${social.hoverBorder} hover:shadow-[var(--shadow-hard-sm)] hover:-translate-y-0.5 cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    <social.icon size={16} className={`text-[var(--text-muted)] ${social.hoverText} transition-colors`} />
                    <span className="text-[11px] font-pixel font-bold text-[var(--text-muted)] group-hover:text-white transition-colors">
                      {social.name}
                    </span>
                  </div>
                  <ExternalLink size={12} className="text-[var(--text-dim)] group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>

          </div>

        </div>
      </RetroWindow>
    </section>
  );
}
