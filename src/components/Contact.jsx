import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // EmailJS Configuration
    const serviceId = 'service_gb8v31q';
    const templateId = 'template_esf3z1x';
    // Use the actual key string or the correct import.meta.env syntax
    const publicKey = 'tQa-i3ZlGNAYc245F'; 

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
      to_name: 'Vipendra Singh', 
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSending(false);
        setSent(true); // This triggers the success UI (CheckCircle)
        setForm({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        setSending(false);
        console.error('EmailJS Error:', error);
        // This will alert the specific error from EmailJS servers
        alert("Failed to send: " + (error.text || "Unknown error"));
      });
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'var(--bg-3)', border: '1px solid var(--border)',
    color: 'var(--text)', borderRadius: '2px', fontSize: '14px',
    fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s ease',
  };

  const handleFocus = (e) => e.target.style.borderColor = 'var(--accent)';
  const handleBlur = (e) => e.target.style.borderColor = 'var(--border)';

  return (
    <section id="contact" ref={ref} className="py-28" style={{ background: 'var(--bg-2)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16" style={{ opacity: visible ? 1 : 0, transition: 'all 0.7s ease' }}>
          <p className="section-label mb-3">05 — Contact</p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
            Let's <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>connect</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.1s' }}>
            <p className="text-base mb-8" style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              I'm actively looking for internship and entry-level opportunities.
              Whether you have a project in mind, a question, or just want to say hi —
              my inbox is always open.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: <Mail size={16} />, label: 'Email', value: 'solankivipendrasingh06@gmail.com', href: 'mailto:solankivipendrasingh06@gmail.com' },
                { icon: <MapPin size={16} />, label: 'Location', value: 'India — Open to Remote', href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: '2px', color: 'var(--accent)' }}>
                    {icon}
                  </div>
                  <div>
                    <p className="font-mono-custom text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    {href
                      ? <a href={href} className="text-sm hover-line" style={{ color: 'var(--text)' }}>{value}</a>
                      : <p className="text-sm" style={{ color: 'var(--text)' }}>{value}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.2s' }}>
            {sent ? (
              <div className="glow-border p-8 text-center" style={{ borderRadius: '4px', background: 'var(--bg-3)' }}>
                <CheckCircle size={40} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
                <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--text)' }}>Message Sent!</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Thanks for reaching out. I'll get back to you soon.</p>
                <button onClick={() => setSent(false)} className="mt-6 font-mono-custom text-xs tracking-wider"
                  style={{ color: 'var(--accent)' }}>
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
                  { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
                ].map(({ label, name, type, placeholder }) => (
                  <div key={name}>
                    <label className="font-mono-custom text-xs tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>
                      {label}
                    </label>
                    <input type={type} name={name} value={form[name]} onChange={handleChange} required
                      placeholder={placeholder} style={inputStyle}
                      onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                ))}
                <div>
                  <label className="font-mono-custom text-xs tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>
                    Message
                  </label>
                  <textarea name="message" value={form.message} onChange={handleChange} required
                    placeholder="Tell me about your project or opportunity..."
                    rows={5} style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium tracking-wide transition-all duration-300"
                  style={{ background: 'var(--accent)', color: '#080808', borderRadius: '2px', opacity: sending ? 0.7 : 1 }}
                  disabled={sending}>
                  {sending ? 'Sending...' : <><Send size={15} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}