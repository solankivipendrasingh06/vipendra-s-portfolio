import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Play } from 'lucide-react';

const projects = [
  {
    num: '01',
    title: 'BookNGo — Movie Ticket Booking',
    description: 'A full-featured movie ticket booking platform with real-time seat selection, payment integration, and booking management. Features JWT authentication and responsive design.',
    stack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/solankivipendrasingh06/BookNGo',
    live: '#',
    featured: true,
  },
  {
    num: '02',
    title: 'CRUD App',
    description: 'A robust RESTful API built with Express.js and MongoDB. Implements full CRUD operations, middleware auth, rate limiting, and comprehensive Postman documentation.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST'],
    github: 'https://github.com/solankivipendrasingh06/express-crud-app',
  },

  {
    num: '03',
    title: 'Personal Portfolio',
    description: 'My previous portfolio website built with ReactJS and TailWind CSS. Clean, fast, and fully responsive with custom animations.',
    stack: ['ReactJS','Tailwind CSS'],
    github: 'https://github.com/solankivipendrasingh06/vipendra-s-portfolio',
  
  },
];

function ProjectCard({ project, visible, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="glow-border group cursor-default"
      style={{
        borderRadius: '4px', background: 'var(--bg-3)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.6s ease ${delay}ms`,
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top bar */}
      <div className="px-6 pt-6 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono-custom text-xs" style={{ color: 'var(--border)' }}>{project.num}</span>
          <div className="flex gap-3">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <Github size={16} />
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl mb-3" style={{ color: 'var(--text)', lineHeight: 1.2 }}>
          {project.title}
        </h3>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map(tech => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 h-px transition-all duration-500"
        style={{ width: hovered ? '100%' : '0%', background: 'linear-gradient(90deg, var(--accent), var(--blue))' }} />
    </div>
  );
}

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-28" style={{ background: 'var(--bg-2)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16" style={{ opacity: visible ? 1 : 0, transition: 'all 0.7s ease' }}>
          <p className="section-label mb-3">03 — Projects</p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
            Things I've <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>built</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.num} project={p} visible={visible} delay={i * 100} />
          ))}
        </div>

        <div className="mt-10 text-center" style={{ opacity: visible ? 1 : 0, transition: 'all 0.7s ease 0.5s' }}>
          <a href="https://github.com/solankivipendrasingh06/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono-custom text-xs tracking-wider transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <Github size={14} />
            View all projects on GitHub
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
