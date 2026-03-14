import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getProductsBySubcategory, topcategories } from '../data/products';

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

const ShopCategories: React.FC = () => {
  const entries = Object.entries(topcategories);

  return (
    <section className="bg-white" style={{ padding: '7rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeUp className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '1px' }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706', fontFamily: 'system-ui, sans-serif' }}>Shop by Category</span>
              </div>
              <h2 className="font-serif text-stone-900" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', fontWeight: 700, lineHeight: 1.1 }}>
                Top Visited Categories
              </h2>
              <div style={{ width: '3rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px', marginTop: '0.9rem' }} />
            </div>
            <Link to="/shop"
              className="inline-flex items-center gap-1.5 font-semibold rounded-lg transition-all duration-200 self-start sm:self-auto"
              style={{ padding: '0.65rem 1.25rem', background: 'white', color: '#1c1917', fontSize: '0.82rem', textDecoration: 'none', border: '1.5px solid #e7e5e4', fontFamily: 'system-ui, sans-serif', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#d97706'; (e.currentTarget as HTMLElement).style.color = '#d97706'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e7e5e4'; (e.currentTarget as HTMLElement).style.color = '#1c1917'; }}
            >
              All Categories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeUp>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {entries.map(([key, name], i) => {
            const categoryProducts = getProductsBySubcategory(key);
            const img = categoryProducts[0]?.images[0] || 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg';

            return (
              <FadeUp key={key} delay={i * 0.05}>
                <Link
                  to={`/shop/${key}`}
                  className="group relative block overflow-hidden"
                  style={{ borderRadius: '14px', textDecoration: 'none', aspectRatio: '3/4', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                >
                  {/* Image */}
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{ transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(12,8,4,0.72) 0%, rgba(0,0,0,0.1) 50%, transparent 75%)', transition: 'opacity 0.3s' }}
                  />

                  {/* Hover amber tint */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(180,83,9,0.5) 0%, transparent 60%)' }}
                  />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1rem', lineHeight: 1.2 }}>
                      {name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'system-ui, sans-serif' }}>
                        {categoryProducts.length} pieces
                      </p>
                      <div
                        className="flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                        style={{ width: '1.6rem', height: '1.6rem', background: '#d97706', transform: 'translateX(4px)', transition: 'opacity 0.3s, transform 0.3s' }}
                      >
                        <ArrowRight className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Top-right item count pill */}
                  <div
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ padding: '0.2rem 0.55rem', background: 'rgba(255,255,255,0.9)', borderRadius: '999px', fontSize: '0.62rem', fontWeight: 700, color: '#92400e', fontFamily: 'system-ui, sans-serif', backdropFilter: 'blur(4px)' }}
                  >
                    Explore
                  </div>
                </Link>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopCategories;