import { useEffect, useRef, useState } from 'react';

const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Java', level: 80 },
      { name: 'JavaScript', level: 60 },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js', level: 85 },
      { name: 'HTML & CSS', level: 70 },
      { name: 'Tailwind CSS', level: 82 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 83 },
      { name: 'Express.js', level: 80 },
      { name: 'REST APIs', level: 86 },
    ],
  },
  {
    category: 'Database & Tools',
    skills: [
      { name: 'MongoDB', level: 78 },
      { name: 'Git & GitHub', level: 85 },
      { name: 'VS Code', level: 90 },
    ],
  },
];

const concepts = ['Data Structures', 'Algorithms', 'JWT', 'REST APIs', 'MVC Pattern', 'Bcrypt', 'Problem Solving'];

function SkillBar({ name, level, visible, delay }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-sm" style={{ color: 'var(--text)' }}>{name}</span>
        <span className="font-mono-custom text-xs" style={{ color: 'var(--text-muted)' }}>{level}%</span>
      </div>
      <div className="h-px w-full overflow-hidden" style={{ background: 'var(--border)' }}>
        <div className="h-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${level}%` : '0%',
            background: 'linear-gradient(90deg, var(--accent), var(--blue))',
            transitionDelay: `${delay}ms`,
            boxShadow: '0 0 8px var(--accent-glow)',
          }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="py-28 grid-bg" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16" style={{ opacity: visible ? 1 : 0, transition: 'all 0.7s ease' }}>
          <p className="section-label mb-3">02 — Skills</p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
            What I <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>work with</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {skillGroups.map((group, gi) => (
            <div key={group.category} className="glow-border p-6"
              style={{
                borderRadius: '4px', background: 'var(--bg-2)',
                opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${gi * 0.1}s`,
              }}>
              <p className="section-label mb-5">{group.category}</p>
              {group.skills.map((skill, si) => (
                <SkillBar key={skill.name} {...skill} visible={visible} delay={gi * 100 + si * 150} />
              ))}
            </div>
          ))}
        </div>

        {/* Concepts tags */}
        <div style={{ opacity: visible ? 1 : 0, transition: 'all 0.7s ease 0.4s' }}>
          <p className="section-label mb-5">Concepts & Paradigms</p>
          <div className="flex flex-wrap gap-3">
            {concepts.map((c) => (
              <span key={c} className="tag cursor-default transition-all duration-200"
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-dim)'; }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
