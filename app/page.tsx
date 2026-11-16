import RetroMenuBar from '@/components/RetroMenuBar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ResumeDossier from '@/components/ResumeDossier';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LayoutWrapper from '@/components/LayoutWrapper';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--bg-canvas)] text-[var(--text-main)] selection:bg-[var(--accent-color)] selection:text-[var(--accent-contrast)]">
      {/* Keyboard Accessibility: Skip to Content Anchor */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-[var(--accent-color)] focus:text-[var(--accent-contrast)] focus:font-pixel focus:text-xs focus:border-2 focus:border-[var(--border-highlight)] focus:shadow-[var(--shadow-hard)]"
      >
        [TAB] SKIP TO MAIN CONTENT →
      </a>

      <LayoutWrapper>
        <RetroMenuBar />
        <Hero />
        <div id="main-content">
          <About />
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-center gap-3 select-none pointer-events-none" aria-hidden="true">
            <div className="flex-1 h-px bg-[var(--accent-quiet)]/40" />
            <span className="text-[9px] font-mono font-bold text-[var(--accent-quiet-text)] bg-[var(--accent-quiet-bg)] border border-[var(--accent-quiet)]/50 px-2 py-0.5 tracking-widest shadow-xs">
              SECTION_BREAK // 0x2A
            </span>
            <div className="flex-1 h-px bg-[var(--accent-quiet)]/40" />
          </div>
          <ResumeDossier />
          <Projects />
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-center gap-3 select-none pointer-events-none" aria-hidden="true">
            <div className="flex-1 h-px bg-[var(--accent-quiet)]/40" />
            <span className="text-[9px] font-mono font-bold text-[var(--accent-quiet-text)] bg-[var(--accent-quiet-bg)] border border-[var(--accent-quiet)]/50 px-2 py-0.5 tracking-widest shadow-xs">
              MODULE_INDEX // 0x3B
            </span>
            <div className="flex-1 h-px bg-[var(--accent-quiet)]/40" />
          </div>
          <Skills />
          <Contact />
        </div>
        <Footer />
      </LayoutWrapper>
    </main>
  );
}
