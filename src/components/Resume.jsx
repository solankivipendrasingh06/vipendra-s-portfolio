import { useEffect, useRef, useState } from 'react';
import { Download, GraduationCap, Award } from 'lucide-react';

const education = [
  {
    year: '2023 — Present',
    degree: 'Bachelor of Technology — Computer Science',
    institution: 'Acropolis Institute of Technology And Research',
    details: 'Pursuing B.Tech with focus on Data Structures, Algorithms, OOP, and Web Technologies. CGPA: 6.7',
  },
  {
    year: '2022 — 2023',
    degree: 'Higher Secondary Certificate',
    institution: 'Ananya Jyoti Hr. Sec. School',
    details: 'Completed 12th with Physics, Chemistry, Mathematics and Computer Science. Score: 77.2%',
  },
  {
    year: '2020 — 2021',
    degree: 'Senior Secondary Certificate',
    institution: 'Ananya Jyoti Hr. Sec. School',
    details: 'Completed 10th.        Score: 82%',
  },
];

const certifications = [
  { name: 'The Complete Node.js Developer Course', issuer: 'OneRoadMap', year: '2025' },
  { name: 'MERN Stack Development', issuer: 'OneRoadMap', year: '2025' },
  { name: 'Java Programming Masterclass', issuer: 'Great Learning', year: '2024' },
];

export default function Resume() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="resume" ref={ref} className="py-28 grid-bg" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16" style={{ opacity: visible ? 1 : 0, transition: 'all 0.7s ease' }}>
          <p className="section-label mb-3">04 — Resume</p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
            My <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>background</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.1s' }}>
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap size={16} style={{ color: 'var(--accent)' }} />
              <h3 className="font-mono-custom text-xs tracking-widest uppercase" style={{ color: 'var(--text)' }}>Education</h3>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-2 bottom-0 w-px"
                style={{ background: 'linear-gradient(180deg, var(--accent) 0%, var(--border) 100%)' }} />

              <div className="space-y-10">
                {education.map((item, i) => (
                  <div key={i} className="pl-8 relative">
                    {/* Dot */}
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full -translate-x-[3px]"
                      style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)' }} />

                    <p className="font-mono-custom text-xs mb-1" style={{ color: 'var(--accent)' }}>{item.year}</p>
                    <h4 className="text-base font-semibold mb-1" style={{ color: 'var(--text)' }}>{item.degree}</h4>
                    <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>{item.institution}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications + Download */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.2s' }}>
            <div className="flex items-center gap-2 mb-8">
              <Award size={16} style={{ color: 'var(--accent)' }} />
              <h3 className="font-mono-custom text-xs tracking-widest uppercase" style={{ color: 'var(--text)' }}>Certifications</h3>
            </div>

            <div className="space-y-3 mb-12">
              {certifications.map((cert, i) => (
                <div key={i} className="glow-border p-4 flex items-center justify-between"
                  style={{ borderRadius: '4px', background: 'var(--bg-3)' }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{cert.name}</p>
                    <p className="font-mono-custom text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                </div>
              ))}
            </div>

            {/* Download CTA */}
            <div className="glow-border p-6 text-center" style={{ borderRadius: '4px', background: 'var(--bg-3)' }}>
              <p className="text-sm mb-1" style={{ color: 'var(--text)' }}>Looking for my full resume?</p>
              <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Get the PDF with complete details</p>
              <a href="https://github.com/solankivipendrasingh06/My-resume/blob/main/VipendraResume.pdf" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-all duration-300"
                style={{ background: 'var(--accent)', color: '#080808', borderRadius: '2px' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                <Download size={15} />
                Download Resume PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
