import { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

const roles = ['Full Stack Developer', 'MERN Stack Developer', 'Backend Engineer', 'CS Student'];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    const current = roles[roleIdx];
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, roleIdx]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,184,154,0.06) 0%, transparent 70%)',
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
            
            <p className="section-label mb-6">Available for work</p>

            <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 1.05, color: 'var(--text)' }}>
              Vipendra Singh
              <br />
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Solanki</span>
            </h1>

            <div className="flex items-center gap-2 mb-6" style={{ height: '32px' }}>
              <span className="font-mono-custom text-base" style={{ color: 'var(--blue)' }}>
                {displayed}
              </span>
              <span className="cursor-blink font-mono-custom" style={{ color: 'var(--accent)' }}>_</span>
            </div>

            <p className="text-base leading-relaxed mb-10 max-w-md" style={{ color: 'var(--text-muted)' }}>
              CS student passionate about building scalable backend systems and
              elegant full-stack applications. I turn complex problems into clean, maintainable code.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => scrollTo('projects')}
                className="px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300"
                style={{ background: 'var(--accent)', color: '#080808', borderRadius: '2px' }}
              >
                View Projects
              </button>

              <button
                onClick={() => scrollTo('resume')}
                className="px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300"
                style={{ border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '2px' }}
              >
                Download Resume
              </button>
            </div>

            <div className="flex items-center gap-5">
              <a href="https://github.com/solankivipendrasingh06" target="_blank" rel="noopener noreferrer">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/vipendra-singh-solanki-811684307/" target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} />
              </a>
              <a href="mailto:solankivipendrasingh06@gmail.com">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex justify-center md:justify-end"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.3s' }}>
            
            <div className="relative animate-float">

              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden"
                style={{ border: '1px solid var(--border)', background: 'var(--bg-3)' }}>

                <img
                  src="/vipendra.png"
                  alt="Vipendra Singh Solanki"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />

              </div>

              {/* Decorative ring */}
              <div
                className="absolute -inset-3 rounded-full"
                style={{ border: '1px dashed var(--border)', animation: 'spin 20s linear infinite', opacity: 0.4 }}
              />
            </div>
          </div>

        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollTo('about')}
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="font-mono-custom text-xs tracking-widest">scroll</span>
          <ArrowDown size={14} style={{ animation: 'bounce 2s infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
      `}</style>
    </section>
  );
}