import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = ['about', 'skills', 'projects', 'resume', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const id of links) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) { setActive(id); break; }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #1c1c1c' : '1px solid transparent',
      }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono-custom text-sm tracking-[0.2em]"
          style={{ color: 'var(--accent)' }}>
          &lt;VS /&gt;
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              className="font-mono-custom text-xs tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: active === link ? 'var(--accent)' : 'var(--text-muted)' }}>
              {link}
            </button>
          ))}
          <button onClick={() => scrollTo('contact')}
            className="font-mono-custom text-xs tracking-widest uppercase px-5 py-2 transition-all duration-300"
            style={{ border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '2px' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#080808'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}>
            Hire Me
          </button>
        </div>

        <button className="md:hidden" style={{ color: 'var(--text)' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-5"
          style={{ background: 'rgba(8,8,8,0.98)', borderBottom: '1px solid var(--border)' }}>
          {links.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              className="font-mono-custom text-xs tracking-widest uppercase text-left"
              style={{ color: 'var(--text-muted)' }}>
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
