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
          <ResumeDossier />
          <Projects />
          <Skills />
          <Contact />
        </div>
        <Footer />
      </LayoutWrapper>
    </main>
  );
}
