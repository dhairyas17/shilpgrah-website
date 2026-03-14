import React, { useRef, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

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

const testimonials = [
  {
    name: 'Sarah Johnson', title: 'Interior Designer', location: 'New York, USA', rating: 5,
    text: 'The quality and craftsmanship of Shilpgrah\'s furniture is absolutely exceptional. The dining set I ordered became the centrepiece of my client\'s home. The attention to detail is remarkable.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  },
  {
    name: 'James Mitchell', title: 'Hotel Chain Owner', location: 'London, UK', rating: 5,
    text: 'We\'ve furnished three of our luxury hotels with Shilpgrah\'s pieces. Guests constantly compliment the beautiful Rajasthani furniture. Their service and delivery are impeccable.',
    image: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg',
  },
  {
    name: 'Maria Santos', title: 'Art Collector', location: 'São Paulo, Brazil', rating: 5,
    text: 'Each piece tells a story of Indian heritage. The carved wall panels I purchased are not just decor — they\'re conversation starters. The shipping was careful and professional.',
    image: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg',
  },
];

const trustStats = [
  { n: '4.8/5',  l: 'Customer Rating' },
  { n: '99%',   l: 'On-Time Delivery' },
  { n: '20+',   l: 'Countries Served' },
  { n: '500+',  l: 'Happy Customers' },
];

const Testimonials: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-white" style={{ padding: '7rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeUp className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, transparent, #d97706)', borderRadius: '1px' }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706', fontFamily: 'system-ui, sans-serif' }}>Client Stories</span>
            <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, #d97706, transparent)', borderRadius: '1px' }} />
          </div>
          <h2 className="font-serif text-stone-900" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', fontWeight: 700, lineHeight: 1.1 }}>
            Trusted by Customers Worldwide
          </h2>
          <div style={{ width: '3rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px', margin: '1rem auto 0' }} />
        </FadeUp>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => {
            const active = hovered === i;
            return (
              <FadeUp key={i} delay={i * 0.1}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: '2rem',
                    borderRadius: '16px',
                    background: active ? '#fffbeb' : '#fafaf9',
                    border: `1.5px solid ${active ? '#fbbf24' : '#f5f5f4'}`,
                    boxShadow: active ? '0 12px 32px rgba(217,119,6,0.13)' : '0 2px 12px rgba(0,0,0,0.05)',
                    transform: active ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Decorative quote mark */}
                  <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: active ? '#fbbf24' : '#f5f0e8', transition: 'color 0.3s' }}>
                    <Quote className="w-8 h-8" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" style={{ color: '#f59e0b' }} />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-stone-600 mb-6 italic" style={{ fontSize: '0.875rem', lineHeight: 1.8, fontFamily: 'Georgia, serif' }}>
                    "{t.text}"
                  </p>

                  {/* Divider */}
                  <div style={{ height: '1px', background: active ? '#fde68a' : '#f5f0e8', marginBottom: '1.25rem', transition: 'background 0.3s' }} />

                  {/* Person */}
                  <div className="flex items-center gap-3">
                    <img src={t.image} alt={t.name}
                      className="object-cover"
                      style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', border: `2px solid ${active ? '#fbbf24' : '#e7e5e4'}`, transition: 'border-color 0.3s' }}
                    />
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1c1917', fontFamily: 'Georgia, serif' }}>{t.name}</p>
                      <p style={{ fontSize: '0.72rem', color: '#78716c', fontFamily: 'system-ui, sans-serif' }}>{t.title}</p>
                      <p style={{ fontSize: '0.68rem', color: '#a8a29e', fontFamily: 'system-ui, sans-serif' }}>{t.location}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Trust stats bar */}
        <FadeUp>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden"
            style={{ borderRadius: '16px', border: '1.5px solid #f5f5f4', background: '#e7e5e4' }}
          >
            {trustStats.map((s, i) => (
              <div key={i} className="text-center py-8 px-4" style={{ background: '#fafaf9' }}>
                <div className="font-serif font-bold" style={{ fontSize: '1.75rem', color: '#d97706', lineHeight: 1, marginBottom: '0.35rem' }}>
                  {s.n}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#78716c', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default Testimonials;