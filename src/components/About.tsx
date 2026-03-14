import React, { useState, useEffect, useRef } from 'react';
import { Award, Globe, Users, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

const features = [
  { icon: Award,  title: 'Master Craftsmen',    desc: 'Artisans who have inherited techniques passed down through generations of royal Rajasthani workshops.' },
  { icon: Globe,  title: 'Global Reach',         desc: 'Exporting to 20+ countries with trusted shipping partners and deep customs expertise.' },
  { icon: Users,  title: 'Personalised Service', desc: 'Dedicated consultants for custom orders, bulk purchases, and bespoke trade requirements.' },
  { icon: Truck,  title: 'Secure Delivery',      desc: 'Professional packaging and fully insured shipping — every piece arrives in perfect condition.' },
];

const About: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <section className="bg-white" style={{ padding: '7rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Story split ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-24">

          {/* Image */}
          <FadeUp className="relative order-2 lg:order-1">
            <div style={{ position: 'absolute', top: '-1.25rem', left: '-1.25rem', right: '1.25rem', bottom: '1.25rem', border: '2px solid #fde68a', borderRadius: '18px', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 32px 64px rgba(120,80,20,0.15)', aspectRatio: '4/5' }}>
              <img src="/assets/raj.png" alt="Rajasthani craftsman" className="w-full h-full object-cover" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,16,4,0.5) 0%, transparent 50%)' }} />
              {/* Badge */}
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '8px', flexShrink: 0, background: 'linear-gradient(135deg, #fbbf24, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c1917', fontFamily: 'Georgia, serif' }}>Heritage Craftsmanship</p>
                  <p style={{ fontSize: '0.68rem', color: '#78716c', fontFamily: 'system-ui, sans-serif' }}>Hand-crafted in Jodhpur, Rajasthan</p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Text */}
          <div className="order-1 lg:order-2 space-y-6">
            <FadeUp delay={0.1}>
              <div className="flex items-center gap-3">
                <div style={{ width: '2.5rem', height: '2px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '1px' }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706', fontFamily: 'system-ui, sans-serif' }}>Since 2013</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <h2 className="font-serif text-stone-900" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', fontWeight: 700, lineHeight: 1.12 }}>
                Bringing Rajasthan's{' '}
                <span style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Royal Heritage
                </span>
                {' '}to Your World
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-stone-500 leading-relaxed" style={{ fontSize: '0.92rem', lineHeight: 1.85, fontFamily: 'system-ui, sans-serif' }}>
                Founded in 2013 in the heart of Jodhpur, Shilpgrah began as a family vision to share Rajasthan's magnificent craftsmanship with the world. What started as a local workshop has grown into a globally recognised name in authentic Indian furniture.
              </p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p className="text-stone-500 leading-relaxed" style={{ fontSize: '0.92rem', lineHeight: 1.85, fontFamily: 'system-ui, sans-serif' }}>
                Every carved detail, every inlay pattern, every finish reflects centuries of artistic evolution — from the Jali work of Jaisalmer to the mirror mosaics of Bikaner. We don't just export products; we carry a living tradition forward.
              </p>
            </FadeUp>

            {/* Mini stats */}
            <FadeUp delay={0.3}>
              <div className="grid grid-cols-3 gap-4 pt-2" style={{ borderTop: '1px solid #f5f0e8' }}>
                {[{ n: '10+', l: 'Years' }, { n: '20+', l: 'Countries' }, { n: '500+', l: 'Clients' }].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '0.75rem 0' }}>
                    <div className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#d97706', lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: '0.62rem', color: '#a8a29e', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.2rem', fontFamily: 'system-ui, sans-serif' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.35}>
              <Link to="/about"
                className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200"
                style={{ padding: '0.8rem 1.75rem', background: '#d97706', color: 'white', fontSize: '0.85rem', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', boxShadow: '0 4px 16px rgba(217,119,6,0.28)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>
          </div>
        </div>

        {/* ── Why Choose Us ── */}
        <FadeUp className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, transparent, #d97706)', borderRadius: '1px' }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706', fontFamily: 'system-ui, sans-serif' }}>Why Choose Us</span>
            <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, #d97706, transparent)', borderRadius: '1px' }} />
          </div>
          <h2 className="font-serif text-stone-900" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 700 }}>
            What Sets Shilpgrah Apart
          </h2>
          <div style={{ width: '3rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px', margin: '1rem auto 0' }} />
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, desc }, i) => {
            const active = activeFeature === i;
            return (
              <FadeUp key={i} delay={i * 0.08}>
                <div
                  onMouseEnter={() => setActiveFeature(i)}
                  onMouseLeave={() => setActiveFeature(null)}
                  style={{
                    padding: '2rem 1.5rem', borderRadius: '14px',
                    background: active ? '#fffbeb' : '#fafaf9',
                    border: `1.5px solid ${active ? '#fbbf24' : '#f5f5f4'}`,
                    boxShadow: active ? '0 12px 32px rgba(217,119,6,0.13)' : '0 2px 12px rgba(0,0,0,0.05)',
                    transform: active ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    cursor: 'default', height: '100%',
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
                  <h3 className="font-serif font-bold text-stone-800 mb-2" style={{ fontSize: '1.05rem' }}>{title}</h3>
                  <p className="text-stone-500 leading-relaxed" style={{ fontSize: '0.82rem', lineHeight: 1.75, fontFamily: 'system-ui, sans-serif' }}>{desc}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;