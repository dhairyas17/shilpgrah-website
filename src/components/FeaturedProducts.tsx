import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import FeaturedProductCard from './featureModalCards';
import ProductModal from './ProductModal';
import { getFeaturedProducts } from '../data/products';
import { Product } from '../types/Product';

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

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 9);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const swiperRef = useRef<any>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product); setIsModalOpen(true);
    if (swiperRef.current?.autoplay) swiperRef.current.autoplay.stop();
  };
  const handleModalClose = () => {
    setIsModalOpen(false); setSelectedProduct(null);
    if (swiperRef.current?.autoplay) swiperRef.current.autoplay.start();
  };

  return (
    <section style={{ background: '#fafaf9', padding: '7rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '1px' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706', fontFamily: 'system-ui, sans-serif' }}>Handpicked for You</span>
            </div>
            <h2 className="font-serif text-stone-900" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', fontWeight: 700, lineHeight: 1.1 }}>
              Featured Products
            </h2>
            <div style={{ width: '3rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px', marginTop: '0.9rem' }} />
          </div>
          <div className="flex items-center gap-3">
            {/* Nav arrows */}
            {[
              { ref: prevRef, icon: ChevronLeft, label: 'Previous' },
              { ref: nextRef, icon: ChevronRight, label: 'Next' },
            ].map(({ ref, icon: Icon, label }) => (
              <button key={label} ref={ref} aria-label={label}
                className="flex items-center justify-center transition-all duration-200"
                style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'white', border: '1.5px solid #e7e5e4', cursor: 'pointer', color: '#57534e', flexShrink: 0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; (e.currentTarget as HTMLElement).style.borderColor = '#d97706'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white'; (e.currentTarget as HTMLElement).style.borderColor = '#e7e5e4'; (e.currentTarget as HTMLElement).style.color = '#57534e'; }}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
            <Link to="/shop"
              className="inline-flex items-center gap-1.5 font-semibold rounded-lg transition-all duration-200 hidden sm:inline-flex"
              style={{ padding: '0.6rem 1.25rem', background: 'white', color: '#1c1917', fontSize: '0.82rem', textDecoration: 'none', border: '1.5px solid #e7e5e4', fontFamily: 'system-ui, sans-serif' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#d97706'; (e.currentTarget as HTMLElement).style.color = '#d97706'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e7e5e4'; (e.currentTarget as HTMLElement).style.color = '#1c1917'; }}
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeUp>

        {/* Swiper */}
        <FadeUp delay={0.1}>
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            onSwiper={s => { swiperRef.current = s; }}
            autoplay={{ delay: 2800, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={s => {
              if (s.params?.navigation && typeof s.params.navigation !== 'boolean') {
                s.params.navigation.prevEl = prevRef.current;
                s.params.navigation.nextEl = nextRef.current;
              }
            }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-10"
            style={{ '--swiper-pagination-color': '#d97706', '--swiper-pagination-bullet-inactive-color': '#d6d3d1' } as any}
          >
            {featuredProducts.map(product => (
              <SwiperSlide key={product.id}>
                <div onClick={() => handleProductClick(product)} className="cursor-pointer">
                  <FeaturedProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeUp>

        {/* Mobile CTA */}
        <div className="text-center mt-4 sm:hidden">
          <Link to="/shop"
            className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200"
            style={{ padding: '0.85rem 2rem', background: '#d97706', color: 'white', fontSize: '0.85rem', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', boxShadow: '0 4px 16px rgba(217,119,6,0.28)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; }}
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleModalClose} />
      )}
    </section>
  );
};

export default FeaturedProducts;