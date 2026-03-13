import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const links = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Resume', id: 'resume' },
  { label: 'Contact', id: 'contact' },
];

const socials = [
  { icon: <Github size={16} />, href: 'https://github.com/solankivipendrasingh06', label: 'GitHub' },
  { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/vipendra-singh-solanki-811684307/', label: 'LinkedIn' },
  { icon: <Mail size={16} />, href: 'mailto:solankivipendrasingh06@gmail.com', label: 'Email' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="font-mono-custom text-sm tracking-[0.2em] mb-3" style={{ color: 'var(--accent)' }}>&lt;VIP /&gt;</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              MERN Stack Developer & CS Student.<br />
              Building for the web, learning every day.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono-custom text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--text-muted)' }}>Navigation</p>
            <div className="flex flex-col gap-3">
              {links.map(({ label, id }) => (
                <button key={id} onClick={() => scrollTo(id)}
                  className="text-sm text-left hover-line w-fit transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="font-mono-custom text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--text-muted)' }}>Connect</p>
            <div className="flex flex-col gap-3">
              {socials.map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {icon} {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}>
          <p className="font-mono-custom text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Vipendra Singh Solanki — Designed & Built with ❤️
          </p>
          <button onClick={scrollTop}
            className="flex items-center gap-2 font-mono-custom text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            Back to top <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
