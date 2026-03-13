import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Loading animation
    setTimeout(() => setLoaded(true), 300);

    // Scroll progress
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Loading screen */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700"
        style={{ background: 'var(--bg)', opacity: loaded ? 0 : 1, pointerEvents: loaded ? 'none' : 'all' }}>
        <p className="font-mono-custom text-sm tracking-[0.3em]" style={{ color: 'var(--accent)' }}>
          &lt;VS /&gt;
        </p>
      </div>

      {/* Scroll progress bar */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 0.3s' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
