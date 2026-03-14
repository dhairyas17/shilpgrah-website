import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ProductModal from './ProductModal';
import { products as allProducts } from '../data/products';

const categories = [
  { name: 'Table',        image: '/assets/tables/10.png',        slug: 'table' },
  { name: 'Sofa Cum Bed', image: '/assets/sofa-cum-bed/1.png',   slug: 'sofa-cum-bed' },
  { name: 'Dining Table', image: '/assets/dinning-table/1.png',  slug: 'dining-table' },
  { name: 'Coffee Table', image: '/assets/coffee-table/1.png',   slug: 'coffee-table' },
  { name: 'Bed',          image: '/assets/bed/1.png',            slug: 'bed' },
  { name: 'Bedside',      image: '/assets/bedsides/1.png',       slug: 'bedside' },
  { name: 'Sideboard',    image: '/assets/sideboards/1.png',     slug: 'sideboard' },
  { name: 'Bookshelf',    image: '/assets/bookshelves/1.png',    slug: 'bookshelf' },
  { name: 'Chair',        image: '/assets/chair/1.png',          slug: 'chair' },
  { name: 'Almirah',      image: '/assets/Almirah/2.png',        slug: 'almirah' },
  { name: 'Bar Cabinet',  image: '/assets/bar-cabinets/1.png',   slug: 'bar-cabinet' },
  { name: 'TVC',          image: '/assets/tvc/1.png',            slug: 'tvc' },
];

/* rotating banner slides */
const slides = [
  {
    tag:      'Jodhpur · Rajasthan · Since 2013',
    headline: ['Royal Heritage,', 'Crafted for', 'the World.'],
    accent:   1, // which line gets amber gradient
    sub:      'Exquisite handcrafted furniture from the royal workshops of Rajasthan — each piece a living testimony to centuries of artisan mastery.',
    cta:      { label: 'View Products', to: '/shop' },
    cta2:     { label: 'Get Custom Quote', to: '/quote-request' },
    img:      '/assets/raj.png',
    badge:    { icon: '★', title: 'Heritage Craftsmanship', sub: 'Hand-crafted in Jodhpur, Rajasthan' },
  },
  {
    tag:      'Solid Wood · Handcrafted · Export Quality',
    headline: ['Furniture That', 'Tells a', 'Story.'],
    accent:   2,
    sub:      'From the intricate Jali work of Jaisalmer to carved motifs of Jodhpur — every joint, every grain, every finish carries centuries of craft.',
    cta:      { label: 'Browse Collections', to: '/collection' },
    cta2:     { label: 'Our Story', to: '/about' },
    img:      '/assets/raj.png',
    badge:    { icon: '✦', title: '20+ Countries', sub: 'Trusted globally by interior designers' },
  },
  {
    tag:      'Wholesale · Bulk Orders · Custom Design',
    headline: ['Export-Ready', 'for Global', 'Interiors.'],
    accent:   0,
    sub:      'We ship container-loads to interior designers, hotel chains, and retailers across Europe, USA, and the Middle East. Minimum order friendly.',
    cta:      { label: 'Request a Quote', to: '/quote-request' },
    cta2:     { label: 'View Gallery', to: '/gallery' },
    img:      '/assets/raj.png',
    badge:    { icon: '📦', title: '500+ Happy Clients', sub: 'Across 20+ countries worldwide' },
  },
];

const Hero: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null);
  const [slide, setSlide]   = useState(0);
  const [fading, setFading] = useState(false);
  const slideTimer          = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── carousel (products) ── */
  const baseProducts = allProducts.slice(0, 16);
  const tripled      = [...baseProducts, ...baseProducts, ...baseProducts];
  const CARD_W = 180, GAP = 16, STEP = CARD_W + GAP;
  const START  = baseProducts.length;

  const [index, setIndex]       = useState(START);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused]     = useState(false);
  const intervalRef             = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => { setAnimated(true); setIndex(p => p + 1); }, 2000);
  }, []);
  const stopAuto = useCallback(() => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);
  useEffect(() => { if (!paused) startAuto(); else stopAuto(); return stopAuto; }, [paused, startAuto, stopAuto]);

  const handleTransitionEnd = useCallback(() => {
    const len = baseProducts.length;
    if (index >= len * 2) { setAnimated(false); setIndex(index - len); }
    if (index < len)      { setAnimated(false); setIndex(index + len); }
  }, [index, baseProducts.length]);
  useEffect(() => {
    if (!animated) { const r = requestAnimationFrame(() => setAnimated(true)); return () => cancelAnimationFrame(r); }
  }, [animated]);

  const nudge = (dir: number) => {
    setAnimated(true); setIndex(p => p + dir);
    setPaused(true); setTimeout(() => setPaused(false), 4000);
  };

  /* ── auto-rotate banner ── */
  const goSlide = useCallback((next: number) => {
    setFading(true);
    setTimeout(() => { setSlide(next); setFading(false); }, 380);
  }, []);

  useEffect(() => {
    slideTimer.current = setInterval(() => {
      setSlide(s => { const next = (s + 1) % slides.length; goSlide(next); return s; });
    }, 5000);
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, [goSlide]);

  const manualSlide = (i: number) => {
    if (slideTimer.current) clearInterval(slideTimer.current);
    goSlide(i);
    slideTimer.current = setInterval(() => {
      setSlide(s => { const next = (s + 1) % slides.length; goSlide(next); return s; });
    }, 5000);
  };

  const s = slides[slide];

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#fafaf9' }}>

      {/* ── Modal ── */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={!!selectedProduct}
          onClose={() => { setSelectedProduct(null); setPaused(false); }} />
      )}

      {/* ══════════════════════════════════
          CATEGORY STRIP  (sticky under header)
      ══════════════════════════════════ */}
      <div className="bg-white" style={{ marginTop: '130px', borderBottom: '1px solid #f0ece4', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="flex min-w-max">
              {categories.map((cat, i) => (
                <Link key={i} to={`/shop/${cat.slug}`}
                  className="flex flex-col items-center gap-1 group"
                  style={{ minWidth: '108px', padding: '10px 4px 8px', borderRight: '1px solid #f0ece4', textDecoration: 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fef9f0'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <div style={{ height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={cat.image} alt={cat.name}
                      style={{ maxHeight: '48px', maxWidth: '80px', objectFit: 'contain', transition: 'transform 0.2s' }}
                      className="group-hover:scale-110" />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#57534e', textAlign: 'center', lineHeight: 1.2, fontFamily: 'system-ui, sans-serif' }}>
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          HERO BILLBOARD
      ══════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '520px', background: 'linear-gradient(135deg, #1c1008 0%, #2d1a08 40%, #3d2310 100%)' }}
      >
        {/* ── Rajasthani geometric pattern overlay ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="jali" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
                <circle cx="40" cy="40" r="18" fill="none" stroke="#fbbf24" strokeWidth="0.4"/>
                <circle cx="40" cy="40" r="5"  fill="none" stroke="#fbbf24" strokeWidth="0.6"/>
                <line x1="10" y1="40" x2="70" y2="40" stroke="#fbbf24" strokeWidth="0.35"/>
                <line x1="40" y1="10" x2="40" y2="70" stroke="#fbbf24" strokeWidth="0.35"/>
                <line x1="18" y1="18" x2="62" y2="62" stroke="#fbbf24" strokeWidth="0.25"/>
                <line x1="62" y1="18" x2="18" y2="62" stroke="#fbbf24" strokeWidth="0.25"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#jali)"/>
          </svg>
        </div>

        {/* ── Warm amber glow centre-left ── */}
        <div className="absolute pointer-events-none" style={{ width: '700px', height: '500px', top: '-80px', left: '-100px', background: 'radial-gradient(ellipse, rgba(217,119,6,0.22) 0%, transparent 65%)', borderRadius: '50%' }} />
        {/* ── Soft right accent ── */}
        <div className="absolute pointer-events-none" style={{ width: '400px', height: '400px', bottom: '-100px', right: '25%', background: 'radial-gradient(ellipse, rgba(251,191,36,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />

        {/* ── CONTENT ── */}
        <div
          className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '3rem',
            alignItems: 'center',
            minHeight: '520px',
            padding: '60px 64px',
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.38s ease, transform 0.38s ease',
          }}
        >
          {/* LEFT — text */}
          <div style={{ maxWidth: '620px' }}>
            {/* Tag */}
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: '2rem', height: '1.5px', background: 'linear-gradient(90deg, #d97706, #fbbf24)' }} />
              <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fbbf24', fontFamily: 'system-ui, sans-serif' }}>
                {s.tag}
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ lineHeight: 1.05, marginBottom: '1.5rem', color: 'white', fontWeight: 700, fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)' }}>
              {s.headline.map((line, li) =>
                li === s.accent
                  ? <span key={li} style={{ display: 'block', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{line}</span>
                  : <span key={li} style={{ display: 'block' }}>{line}</span>
              )}
            </h1>

            {/* Sub */}
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '500px', fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>
              {s.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link to={s.cta.to}
                className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200"
                style={{ padding: '0.85rem 1.75rem', background: '#d97706', color: 'white', fontSize: '0.85rem', letterSpacing: '0.04em', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', boxShadow: '0 4px 24px rgba(217,119,6,0.45)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                {s.cta.label} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to={s.cta2.to}
                className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200"
                style={{ padding: '0.85rem 1.75rem', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', letterSpacing: '0.04em', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.16)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)'; }}
              >
                {s.cta2.label}
              </Link>
            </div>

            {/* Slide dots */}
            <div className="flex gap-2 mt-8">
              {slides.map((_, i) => (
                <button key={i} onClick={() => manualSlide(i)}
                  style={{
                    width: i === slide ? '2rem' : '0.5rem',
                    height: '0.35rem',
                    borderRadius: '999px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                    background: i === slide ? '#d97706' : 'rgba(255,255,255,0.25)',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — image frame */}
          <div className="hidden lg:block relative flex-shrink-0" style={{ width: '340px', height: '420px' }}>
            {/* Amber border frame */}
            <div style={{ position: 'absolute', inset: 0, border: '1.5px solid rgba(251,191,36,0.35)', borderRadius: '16px', transform: 'translate(10px, 10px)', zIndex: 0 }} />

            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
              <img src={slides[slide].img} alt="Craftsmanship" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              {/* Overlay gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,16,8,0.6) 0%, transparent 55%)' }} />

              {/* Floating badge */}
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{s.badge.icon}</span>
                <div>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'white', fontFamily: 'Georgia, serif' }}>{s.badge.title}</p>
                  <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'system-ui, sans-serif' }}>{s.badge.sub}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom stats bar ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.3), transparent)' }} />
        <div style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
              {[
                { n: '10+',  l: 'Years of Craft' },
                { n: '500+', l: 'Clients Worldwide' },
                { n: '20+',  l: 'Countries Served' },
                { n: '100%', l: 'Solid Wood' },
              ].map((stat, i) => (
                <div key={i}
                  style={{
                    textAlign: 'center', padding: '14px 8px',
                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fbbf24', lineHeight: 1, fontFamily: 'Georgia, serif' }}>{stat.n}</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '3px', fontFamily: 'system-ui, sans-serif' }}>{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PRODUCT CAROUSEL
      ══════════════════════════════════ */}
      <section className="bg-white" style={{ paddingTop: '28px', paddingBottom: '28px', borderBottom: '1px solid #f0ece4' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-3">
              <div style={{ width: '1.75rem', height: '2px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '1px' }} />
              <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706', fontFamily: 'system-ui, sans-serif' }}>
                Quick Browse
              </span>
            </div>
            <div className="flex gap-2">
              {[{ dir: -1, d: 'M15 19l-7-7 7-7' }, { dir: 1, d: 'M9 5l7 7-7 7' }].map(({ dir, d }) => (
                <button key={dir} onClick={() => nudge(dir)}
                  style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#fafaf9', border: '1.5px solid #e7e5e4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#78716c', transition: 'all 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; (e.currentTarget as HTMLElement).style.borderColor = '#d97706'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fafaf9'; (e.currentTarget as HTMLElement).style.borderColor = '#e7e5e4'; (e.currentTarget as HTMLElement).style.color = '#78716c'; }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden px-2">
            <div
              className="flex"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(-${index * STEP}px)`,
                transition: animated ? 'transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
                willChange: 'transform',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {tripled.map((product, i) => (
                <div key={i}
                  className="flex-shrink-0 cursor-pointer group/card"
                  style={{ width: `${CARD_W}px` }}
                  onClick={() => { setPaused(true); setSelectedProduct(baseProducts[i % baseProducts.length]); }}
                >
                  <div style={{ borderRadius: '10px', border: '1.5px solid #f0ece4', background: 'white', overflow: 'hidden', transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                    className="group-hover/card:shadow-md group-hover/card:border-amber-200">
                    <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', background: 'white' }}>
                      <img src={product.images[0]} alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover/card:scale-105 transition-transform duration-200" />
                    </div>
                  </div>
                  <div style={{ marginTop: '6px', paddingLeft: '2px' }}>
                    <h3 style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1c1917', lineHeight: 1.3, fontFamily: 'Georgia, serif', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as any }}
                      className="group-hover/card:text-amber-700 transition-colors">
                      {product.name}
                    </h3>
                    <p style={{ fontSize: '0.62rem', color: '#a8a29e', marginTop: '1px', fontFamily: 'system-ui, sans-serif' }}>
                      {product.material}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Hero;