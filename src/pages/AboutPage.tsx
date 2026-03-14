import React, { useState, useEffect, useRef } from 'react';
import { Award, Globe, Users, Truck, Heart, Star, CheckCircle, ChevronDown, ArrowRight } from 'lucide-react';
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

/* ── animated counter ── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const t = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(t); } else setVal(start);
    }, 18);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
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

/* ─────────────────────────────────────── */

const features = [
  { icon: Award,        title: 'Master Craftsmen',    desc: 'Artisans who have inherited techniques passed down through generations of royal Rajasthani workshops.' },
  { icon: Globe,        title: 'Global Reach',         desc: 'Exporting to 20+ countries with trusted shipping partners and deep customs expertise.' },
  { icon: Users,        title: 'Personalized Service', desc: 'Dedicated consultants for custom orders, bulk purchases, and bespoke trade requirements.' },
  { icon: Truck,        title: 'Secure Delivery',      desc: 'Professional packaging and fully insured shipping — every piece arrives in perfect condition.' },
];

const values = [
  { icon: Heart,        title: 'Authenticity', desc: 'Every piece genuinely handcrafted using time-honored Rajasthani techniques.' },
  { icon: Star,         title: 'Excellence',   desc: 'Highest standards in wood selection, joinery, surface treatment, and final finish.' },
  { icon: CheckCircle,  title: 'Trust',        desc: 'Long-term relationships built on transparency, honesty, and consistent reliability.' },
];

const milestones = [
  { year: '2013', event: 'Founded in Jodhpur, Rajasthan', detail: 'A family dream to share royal craftsmanship with the world.' },
  { year: '2018', event: 'Launched online presence',      detail: 'Bringing our catalogue to international buyers digitally.' },
  { year: '2020', event: 'First European export',          detail: 'Our pieces reached living rooms across Europe for the first time.' },
  { year: '2024', event: '20+ countries worldwide',        detail: 'A globally recognized name in authentic Indian furniture.' },
];

const stats = [
  { to: 286, suffix: '',  label: 'Satisfied Clients' },
  { to: 187, suffix: '',  label: 'Finished Projects' },
  { to: 29,  suffix: '',  label: 'Team Members' },
  { to: 20,  suffix: '+', label: 'Countries Served' },
];

const processSteps = [
  {
    title: 'Timber Milling & Seasoning',
    tag: '01',
    body: [
      'The soul of any wooden piece is its base — solid wood. We\'ve invested in government-registered sawmills and basic kilns to make the most of every log while reducing environmental impact.',
      'Our machinery speeds up bulk production while preserving the handmade touch that defines Jodhpur\'s artisan legacy. Consistency in batches, unique appeal in every unit.',
    ],
    images: ['/assets/timber.jpg', '/assets/timber2.png'],
    bg: '#fafaf9',
  },
  {
    title: 'Finishing Processes',
    tag: '02',
    body: [
      'Once shaped, each piece enters a detailed finishing line — hand sanding, wire brushing, fire scorching, and custom staining to elevate texture and depth.',
      'Every batch is inspected at multiple stages by experienced supervisors to ensure consistency, durability, and long-lasting performance indoors or out.',
    ],
    images: ['/assets/spraying.jpg', '/assets/finishing.jpg'],
    bg: '#ffffff',
  },
  {
    title: 'Packaging & Container Stuffing',
    tag: '03',
    body: [
      'Products passing final inspection are prepared for global dispatch using eco-friendly, export-compliant materials — recyclable PPE, high-strength cartons, edge protectors, and moisture control.',
      'Every consignment is stuffed directly at our facility, eliminating intermediate handling and ensuring damage-free delivery with optimal container utilization.',
    ],
    images: ['/assets/packing.jpg', '/assets/loading.jpg'],
    bg: '#fafaf9',
  },
];

/* ─────────────────────────────────────── */

const AboutPage: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [activeValue, setActiveValue] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden">

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}


      {/* ══════════════════════════════════
          STORY SECTION
      ══════════════════════════════════ */}
      <section className="bg-white" style={{ padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[70px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Image */}
            <FadeUp className="relative order-2 lg:order-1">
              {/* Offset frame */}
              <div style={{ position: 'absolute', top: '-1.25rem', left: '-1.25rem', right: '1.25rem', bottom: '1.25rem', border: '2px solid #fde68a', borderRadius: '18px', zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 32px 64px rgba(120,80,20,0.15)' }}>
                <img src="/assets/raj.png" alt="Rajasthani craftsman" className="w-full object-cover" style={{ aspectRatio: '4/5' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,16,4,0.5) 0%, transparent 50%)' }} />
                {/* Badge */}
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '8px', flexShrink: 0, background: 'linear-gradient(135deg, #fbbf24, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c1917' }}>Heritage Craftsmanship</p>
                    <p style={{ fontSize: '0.68rem', color: '#78716c' }}>Hand-crafted in Jodhpur, Rajasthan</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Text */}
            <div className="order-1 lg:order-2 space-y-6">
              <FadeUp delay={0.1}>
                <div className="flex items-center gap-3">
                  <div style={{ width: '2.5rem', height: '2px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '1px' }} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706' }}>Since 2013</span>
                </div>
              </FadeUp>
              <FadeUp delay={0.15}>
                <h2 className="font-serif text-stone-900" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.15 }}>
                  Bringing Rajasthan's{' '}
                  <span style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Royal Heritage</span>
                  {' '}to Your World
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-stone-500 leading-relaxed" style={{ fontSize: '0.92rem', lineHeight: 1.85 }}>
                  Founded in 2013 in the heart of Jodhpur, Shilpgrah began as a family vision to share Rajasthan's magnificent craftsmanship with the world. What started as a local workshop has grown into a globally recognised name in authentic Indian furniture.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <p className="text-stone-500 leading-relaxed" style={{ fontSize: '0.92rem', lineHeight: 1.85 }}>
                  Every carved detail, every inlay pattern, every finish reflects centuries of artistic evolution — from the Jali work of Jaisalmer to the mirror mosaics of Bikaner. We don't just export products; we carry a living tradition forward.
                </p>
              </FadeUp>

              {/* Mini stats */}
              <FadeUp delay={0.3}>
                <div className="grid grid-cols-3 gap-4 pt-2" style={{ borderTop: '1px solid #f5f0e8' }}>
                  {[{ n: '10+', l: 'Years' }, { n: '20+', l: 'Countries' }, { n: '500+', l: 'Clients' }].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center', padding: '0.75rem 0' }}>
                      <div className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#d97706', lineHeight: 1 }}>{s.n}</div>
                      <div style={{ fontSize: '0.62rem', color: '#a8a29e', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.2rem' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHY CHOOSE US — interactive cards
      ══════════════════════════════════ */}
      <section style={{ background: '#fafaf9', padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, transparent, #d97706)', borderRadius: '1px' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706' }}>Why Choose Us</span>
              <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, #d97706, transparent)', borderRadius: '1px' }} />
            </div>
            <h2 className="font-serif text-stone-900" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 700 }}>
              What Sets Shilpgrah Apart
            </h2>
            <div style={{ width: '3rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px', margin: '1rem auto 0' }} />
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc }, i) => {
              const active = activeFeature === i;
              return (
                <FadeUp key={i} delay={i * 0.08}>
                  <div
                    onMouseEnter={() => setActiveFeature(i)}
                    onMouseLeave={() => setActiveFeature(null)}
                    style={{
                      padding: '2rem 1.5rem',
                      borderRadius: '14px',
                      background: active ? '#fffbeb' : 'white',
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
                    <h3 className="font-serif font-bold text-stone-800 mb-2" style={{ fontSize: '1.05rem' }}>{title}</h3>
                    <p className="text-stone-500 leading-relaxed" style={{ fontSize: '0.82rem', lineHeight: 1.75 }}>{desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      
      {/* ══════════════════════════════════
          CORE VALUES
      ══════════════════════════════════ */}
      <section className="bg-white" style={{ padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, transparent, #d97706)', borderRadius: '1px' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706' }}>What We Believe</span>
              <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, #d97706, transparent)', borderRadius: '1px' }} />
            </div>
            <h2 className="font-serif text-stone-900" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 700 }}>Our Core Values</h2>
            <div style={{ width: '3rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px', margin: '1rem auto 0' }} />
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => {
              const active = activeValue === i;
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div
                    onMouseEnter={() => setActiveValue(i)}
                    onMouseLeave={() => setActiveValue(null)}
                    style={{
                      padding: '2.5rem 2rem', borderRadius: '14px', textAlign: 'center',
                      background: active ? 'linear-gradient(160deg, #fffbeb 0%, #fff 100%)' : '#fafaf9',
                      border: `1.5px solid ${active ? '#fbbf24' : '#f5f5f4'}`,
                      boxShadow: active ? '0 12px 32px rgba(217,119,6,0.12)' : '0 2px 12px rgba(0,0,0,0.04)',
                      transform: active ? 'translateY(-4px)' : 'translateY(0)',
                      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                      cursor: 'default',
                    }}
                  >
                    <div style={{
                      width: '3.5rem', height: '3.5rem', borderRadius: '50%', margin: '0 auto 1.25rem',
                      background: active ? 'linear-gradient(135deg, #fbbf24, #d97706)' : '#d97706',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: active ? '0 6px 20px rgba(217,119,6,0.35)' : 'none',
                      transition: 'all 0.3s ease',
                    }}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-serif font-bold text-stone-800 mb-3" style={{ fontSize: '1.2rem' }}>{title}</h3>
                    <p className="text-stone-500 leading-relaxed" style={{ fontSize: '0.83rem', lineHeight: 1.8 }}>{desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          TIMELINE — interactive
      ══════════════════════════════════ */}
      <section style={{ background: '#fafaf9', padding: '6rem 0' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, transparent, #d97706)', borderRadius: '1px' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706' }}>Our Journey</span>
              <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, #d97706, transparent)', borderRadius: '1px' }} />
            </div>
            <h2 className="font-serif text-stone-900" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 700 }}>Key Milestones</h2>
          </FadeUp>

          <div className="relative">
            {/* Centre line */}
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, transparent, #fde68a 10%, #fde68a 90%, transparent)' }} />

            <div className="space-y-8">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                const active = activeMilestone === i;
                return (
                  <FadeUp key={i} delay={i * 0.1}>
                    <div
                      className={`flex items-center gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                      onMouseEnter={() => setActiveMilestone(i)}
                      onMouseLeave={() => setActiveMilestone(null)}
                    >
                      {/* Card */}
                      <div
                        style={{
                          width: 'calc(50% - 1.5rem)',
                          padding: '1.25rem 1.5rem',
                          borderRadius: '12px',
                          background: active ? '#fffbeb' : 'white',
                          border: `1.5px solid ${active ? '#fbbf24' : '#e7e5e4'}`,
                          boxShadow: active ? '0 8px 24px rgba(217,119,6,0.14)' : '0 2px 8px rgba(0,0,0,0.06)',
                          transform: active ? (isLeft ? 'translateX(-4px)' : 'translateX(4px)') : 'translateX(0)',
                          transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                          textAlign: isLeft ? 'right' : 'left',
                          cursor: 'default',
                        }}
                      >
                        <div className="font-serif font-bold mb-1" style={{ fontSize: '1.5rem', color: '#d97706', lineHeight: 1 }}>{m.year}</div>
                        <div className="font-semibold text-stone-800 mb-1" style={{ fontSize: '0.88rem' }}>{m.event}</div>
                        <div style={{ fontSize: '0.75rem', color: '#78716c', lineHeight: 1.6, overflow: 'hidden', maxHeight: active ? '3rem' : '0', opacity: active ? 1 : 0, transition: 'all 0.35s ease' }}>
                          {m.detail}
                        </div>
                      </div>

                      {/* Dot */}
                      <div style={{ flexShrink: 0, width: '3rem', display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                          width: active ? '1rem' : '0.75rem', height: active ? '1rem' : '0.75rem',
                          borderRadius: '50%',
                          background: active ? '#d97706' : '#fde68a',
                          border: `3px solid ${active ? '#fbbf24' : 'white'}`,
                          boxShadow: active ? '0 0 0 4px rgba(217,119,6,0.2)' : '0 0 0 3px #fde68a',
                          transition: 'all 0.3s ease',
                        }} />
                      </div>

                      {/* Empty half */}
                      <div style={{ width: 'calc(50% - 1.5rem)' }} />
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          STATS — animated counters
      ══════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <h2 className="font-serif font-bold text-white mb-2" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>Our Impact in Numbers</h2>
            <p className="text-amber-100" style={{ fontSize: '0.9rem' }}>Reflecting our commitment to excellence and global reach</p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div
                  className="text-center p-6 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <div className="font-serif font-bold text-white mb-1" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', lineHeight: 1 }}>
                    <Counter to={s.to} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.35rem' }}>
                    {s.label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
      <section className="bg-white" style={{ padding: '6rem 0' }}>
        <FadeUp>
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="font-serif text-stone-900 mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 700 }}>
              Ready to Experience Authentic Craftsmanship?
            </h2>
            <p className="text-stone-500 mb-8 leading-relaxed" style={{ fontSize: '0.95rem', lineHeight: 1.85 }}>
              Explore our collections and discover pieces that bring the royal heritage of Rajasthan into your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200"
                style={{ padding: '0.9rem 2.25rem', background: '#d97706', color: 'white', fontSize: '0.88rem', letterSpacing: '0.04em', boxShadow: '0 4px 20px rgba(217,119,6,0.3)', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200"
                style={{ padding: '0.9rem 2.25rem', background: 'white', color: '#1c1917', fontSize: '0.88rem', letterSpacing: '0.04em', border: '1.5px solid #e7e5e4', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#d97706'; (e.currentTarget as HTMLElement).style.color = '#d97706'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e7e5e4'; (e.currentTarget as HTMLElement).style.color = '#1c1917'; }}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

    </div>
  );
};

export default AboutPage;