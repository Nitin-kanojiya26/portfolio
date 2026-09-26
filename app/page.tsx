import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BlackHoleWrapper from '@/components/BlackHoleWrapper';

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-accent selection:text-white">
      <BlackHoleWrapper>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </BlackHoleWrapper>
    </main>
  )
}
