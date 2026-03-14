import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── tiny hook: fire once when element enters viewport ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── section fade-up wrapper ── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Section heading helper ── */
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <FadeUp className="text-center mb-14">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, transparent, #d97706)', borderRadius: '1px' }} />
        <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706' }}>{eyebrow}</span>
        <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, #d97706, transparent)', borderRadius: '1px' }} />
      </div>
      <h2 className="font-serif text-stone-900" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 700 }}>{title}</h2>
      <div style={{ width: '3rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px', margin: '1rem auto 0' }} />
    </FadeUp>
  );
}

const contactCards = [
  {
    icon: MapPin,
    title: 'Factory Outlet',
    lines: ['Plot No 12A, Khasra NO 93', 'Main Salawas Road', 'Jodhpur, Rajasthan 342001'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 7014318581', '+91 9079323259 (WhatsApp)', 'Mon–Sat: 9 AM – 7 PM IST'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@shilpgrah.com', 'mihir@shilpgrah.com', 'Response within 24 hours'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Monday – Saturday', '9:00 AM – 7:00 PM IST', 'Sunday: By Appointment'],
  },
];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', country: '', subject: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', country: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 1400);
  };

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    padding: '0.85rem 1rem',
    background: focused === name ? '#fffbeb' : '#fafaf9',
    border: '1.5px solid',
    borderColor: focused === name ? '#d97706' : '#e7e5e4',
    borderRadius: '10px',
    fontSize: '0.875rem',
    color: '#1c1917',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focused === name ? '0 0 0 3px rgba(217,119,6,0.1)' : 'none',
  });

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden">

      {/* ══════════════════════════════════
          BANNER  (matches QuotePage / WishlistPage style)
      ══════════════════════════════════ */}
      <div
        className="relative bg-white border-b border-stone-100"
        style={{ paddingTop: '7.5rem', paddingBottom: '3rem' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #fffbf5 0%, #fff8ef 50%, #fdfaf5 100%)' }}
        />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, #d97706 30%, #fbbf24 70%, transparent 100%)',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-amber-700 font-semibold tracking-widest uppercase mb-2"
            style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}
          >
            Jodhpur, Rajasthan, India
          </p>
          <h1
            className="font-serif text-stone-900 mb-3"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.1 }}
          >
            Get in Touch
          </h1>
          <div
            className="mx-auto mb-4"
            style={{ width: '3.5rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px' }}
          />
          <p className="text-stone-500 max-w-[800px] mx-auto leading-relaxed" style={{ fontSize: '0.9rem' }}>
            Bring authentic Rajasthani craftsmanship to your space. Our artisans are ready to craft your vision into reality.
          </p>
        </div>
      </div>
      <section style={{ background: '#fafaf9', padding: '5rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* ── FORM ── */}
            <FadeUp>
              <div
                className="bg-white"
                style={{ borderRadius: '16px', border: '1.5px solid #f5f5f4', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', overflow: 'hidden' }}
              >
                {/* Amber top bar */}
                <div style={{ height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)' }} />

                <div className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '1px' }} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706' }}>Send a Message</span>
                    </div>
                    <h2 className="font-serif font-bold text-stone-900" style={{ fontSize: '1.75rem' }}>We'd Love to Hear From You</h2>
                    <p className="text-stone-500 mt-1" style={{ fontSize: '0.85rem' }}>Fill in the details and we'll respond within 24 hours.</p>
                  </div>

                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div
                        className="flex items-center justify-center w-20 h-20 rounded-full mb-6"
                        style={{ background: '#fef3c7' }}
                      >
                        <Send className="w-8 h-8" style={{ color: '#d97706' }} />
                      </div>
                      <h3 className="font-serif font-bold text-stone-800 mb-2" style={{ fontSize: '1.5rem' }}>Message Received!</h3>
                      <p className="text-stone-500 max-w-sm" style={{ fontSize: '0.88rem', lineHeight: 1.7 }}>
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                          { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
                          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', required: true },
                          { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 234 567 890', required: false },
                          { name: 'country', label: 'Country', type: 'text', placeholder: 'United States', required: false },
                        ].map(field => (
                          <div key={field.name}>
                            <label
                              style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#78716c', marginBottom: '0.5rem' }}
                            >
                              {field.label} {field.required && <span style={{ color: '#d97706' }}>*</span>}
                            </label>
                            <input
                              type={field.type}
                              name={field.name}
                              value={formData[field.name as keyof typeof formData]}
                              onChange={handleChange}
                              onFocus={() => setFocused(field.name)}
                              onBlur={() => setFocused(null)}
                              required={field.required}
                              placeholder={field.placeholder}
                              style={fieldStyle(field.name)}
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#78716c', marginBottom: '0.5rem' }}>
                          Subject <span style={{ color: '#d97706' }}>*</span>
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocused('subject')}
                          onBlur={() => setFocused(null)}
                          required
                          style={{ ...fieldStyle('subject'), appearance: 'none' as any }}
                        >
                          <option value="">Select a subject</option>
                          <option value="product-inquiry">Product Inquiry</option>
                          <option value="custom-order">Custom Order</option>
                          <option value="bulk-order">Bulk Order</option>
                          <option value="shipping">Shipping &amp; Delivery</option>
                          <option value="partnership">Business Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#78716c', marginBottom: '0.5rem' }}>
                          Message <span style={{ color: '#d97706' }}>*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          required
                          rows={4}
                          placeholder="Tell us about your requirements..."
                          style={{ ...fieldStyle('message'), resize: 'none' }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200"
                        style={{
                          padding: '0.9rem',
                          background: isSubmitting ? '#fbbf24' : '#d97706',
                          color: 'white',
                          fontSize: '0.88rem',
                          letterSpacing: '0.04em',
                          border: 'none',
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          boxShadow: '0 4px 16px rgba(217,119,6,0.3)',
                        }}
                        onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
                        onMouseLeave={e => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.background = '#d97706'; }}
                      >
                        {isSubmitting ? (
                          <>
                            <div style={{ width: '1.1rem', height: '1.1rem', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </FadeUp>

            {/* ── MAP ── */}
            <FadeUp delay={0.12}>
              <div className="flex flex-col gap-5 h-full">
                {/* Label above map */}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '1px' }} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706' }}>Find Us</span>
                  </div>
                  <h2 className="font-serif font-bold text-stone-900" style={{ fontSize: '1.75rem' }}>Visit Our Workshop</h2>
                  <p className="text-stone-500 mt-1" style={{ fontSize: '0.85rem' }}>Located in the heart of Jodhpur — the Blue City of Rajasthan.</p>
                </div>

                {/* Map */}
                <div
                  className="relative flex-1"
                  style={{ borderRadius: '16px', overflow: 'hidden', border: '1.5px solid #f5f5f4', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', minHeight: '340px' }}
                >
                  {/* Amber corner accents */}
                  {['top-3 left-3 border-t-2 border-l-2 rounded-tl-lg', 'top-3 right-3 border-t-2 border-r-2 rounded-tr-lg', 'bottom-3 left-3 border-b-2 border-l-2 rounded-bl-lg', 'bottom-3 right-3 border-b-2 border-r-2 rounded-br-lg'].map((cls, i) => (
                    <div key={i} className={`absolute w-6 h-6 border-amber-400 z-10 pointer-events-none ${cls}`} />
                  ))}
                  <iframe
                    title="Shilpgrah Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3553.848851695594!2d72.99610891509535!3d26.238946983432337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c257e80952b%3A0x8fb336ff959cfe98!2sJodhpur%2C%20Rajasthan%20342001!5e0!3m2!1sen!2sin!4v1696248682254!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: 'block', filter: 'saturate(0.85) contrast(1.05)', minHeight: '340px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Open in Maps link */}
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200 self-start"
                  style={{ padding: '0.65rem 1.25rem', background: 'white', color: '#1c1917', fontSize: '0.82rem', textDecoration: 'none', border: '1.5px solid #e7e5e4' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#d97706'; (e.currentTarget as HTMLElement).style.color = '#d97706'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e7e5e4'; (e.currentTarget as HTMLElement).style.color = '#1c1917'; }}
                >
                  Open in Maps <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CONTACT INFO CARDS
      ══════════════════════════════════ */}
      <section className="bg-white" style={{ padding: '5rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Reach Us" title="Contact Information" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map(({ icon: Icon, title, lines }, i) => {
              const active = activeCard === i;
              return (
                <FadeUp key={i} delay={i * 0.08}>
                  <div
                    onMouseEnter={() => setActiveCard(i)}
                    onMouseLeave={() => setActiveCard(null)}
                    style={{
                      padding: '2rem 1.5rem',
                      borderRadius: '14px',
                      background: active ? '#fffbeb' : '#fafaf9',
                      border: `1.5px solid ${active ? '#fbbf24' : '#f5f5f4'}`,
                      boxShadow: active ? '0 12px 32px rgba(217,119,6,0.13)' : '0 2px 12px rgba(0,0,0,0.05)',
                      transform: active ? 'translateY(-4px)' : 'translateY(0)',
                      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                      cursor: 'default',
                      height: '100%',
                    }}
                  >
                    <div style={{
                      width: '3.25rem', height: '3.25rem', borderRadius: '10px', marginBottom: '1.25rem',
                      background: active ? 'linear-gradient(135deg, #fbbf24, #d97706)' : '#fef3c7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.3s ease',
                    }}>
                      <Icon className="w-5 h-5" style={{ color: active ? 'white' : '#d97706', transition: 'color 0.3s' }} />
                    </div>
                    <h3 className="font-serif font-bold text-stone-800 mb-3" style={{ fontSize: '1.05rem' }}>{title}</h3>
                    <div className="space-y-1">
                      {lines.map((line, j) => (
                        <p key={j} className="text-stone-500" style={{ fontSize: '0.82rem', lineHeight: 1.7 }}>{line}</p>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FORM + MAP (2-col)
      ══════════════════════════════════ */}

      {/* ══════════════════════════════════
          CTA  (matches AboutPage amber stats bar style)
      ══════════════════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%)',
          padding: '5rem 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

        <FadeUp>
          <div className="relative max-w-2xl mx-auto px-4 text-center">
            <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
              Crafted in Rajasthan · Delivered Worldwide
            </p>
            <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>
              Ready to furnish your space?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
              From a single piece to an entire collection — we handle it all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+917014318581"
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200"
                style={{ padding: '0.9rem 2.25rem', background: 'white', color: '#92400e', fontSize: '0.88rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200"
                style={{ padding: '0.9rem 2.25rem', background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '0.88rem', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(4px)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.25)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
              >
                Browse Products
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default ContactPage;