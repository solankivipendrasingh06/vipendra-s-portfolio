import { useEffect, useRef, useState } from 'react';
import { Code2, Server, Layers, Zap } from 'lucide-react';

const stats = [
  { value: '3+', label: 'Projects Built' },
  { value: '2+', label: 'Years Coding' },
  { value: '5+', label: 'Technologies' },
  { value: '100%', label: 'Passion' },
];

const traits = [
  { icon: <Code2 size={18} />, title: 'Clean Code', desc: 'I write readable, maintainable code with clear structure and proper documentation.' },
  { icon: <Server size={18} />, title: 'Backend Focused', desc: 'Deeply passionate about server-side architecture, APIs, and database design.' },
  { icon: <Layers size={18} />, title: 'Full Stack', desc: 'Comfortable building end-to-end applications from database to user interface.' },
  { icon: <Zap size={18} />, title: 'Performance', desc: 'Always optimizing for speed, scalability, and efficient resource usage.' },
];

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-28" style={{ background: 'var(--bg-2)' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <p className="section-label mb-3">01 — About</p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
            Who I <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>am</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.1s' }}>
            <div className="space-y-5 mb-10" style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <p>
                I'm a <span style={{ color: 'var(--text)' }}>Computer Science student</span> and aspiring
                software developer with a deep passion for building things on the web. My journey into
                programming started with curiosity and evolved into a genuine love for problem-solving.
              </p>
              <p>
                My primary interest lies in <span style={{ color: 'var(--accent)' }}>backend development</span> —
                designing robust APIs, solving data structure problems, and building the systems that power modern
                applications. I enjoy the challenge of making complex systems work seamlessly together.
              </p>
              <p>
                When I'm not coding, I'm studying data structures and algorithms, contributing to open-source
                projects, or exploring new technologies in the Node.js and Java ecosystems.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="glow-border p-4" style={{ borderRadius: '4px' }}>
                  <p className="font-display text-3xl mb-1" style={{ color: 'var(--accent)' }}>{value}</p>
                  <p className="font-mono-custom text-xs tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Traits */}
          <div className="grid grid-cols-1 gap-4"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.2s' }}>
            {traits.map(({ icon, title, desc }, i) => (
              <div key={title} className="glow-border p-5 flex gap-4"
                style={{ borderRadius: '4px', background: 'var(--bg-3)', transitionDelay: `${i * 0.05}s` }}>
                <div className="flex-shrink-0 w-9 h-9 rounded flex items-center justify-center"
                  style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(200,184,154,0.2)' }}>
                  {icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
