import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import FeaturedProductModal from './FeaturedProductModal';
import { products as allProducts } from '../data/products';

const Hero: React.FC = () => {

  // ── Modal state ───────────────────────────────────────────────
  const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null);

  const openModal = (product: typeof allProducts[0]) => {
    setPaused(true);
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setSelectedProduct(null);
    setPaused(false);
  };

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

  const baseProducts = allProducts.slice(0, 16);
  const tripled = [...baseProducts, ...baseProducts, ...baseProducts];

  const CARD_W = 180;
  const GAP    = 16;
  const STEP   = CARD_W + GAP;
  const START_INDEX = baseProducts.length;

  const [index, setIndex]       = useState(START_INDEX);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused]     = useState(false);
  const intervalRef             = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef                = useRef<HTMLDivElement>(null);

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setAnimated(true);
      setIndex((prev) => prev + 1);
    }, 2000);
  }, []);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!paused) startAuto();
    else stopAuto();
    return stopAuto;
  }, [paused, startAuto, stopAuto]);

  const handleTransitionEnd = useCallback(() => {
    const len = baseProducts.length;
    if (index >= len * 2) { setAnimated(false); setIndex(index - len); }
    if (index < len)       { setAnimated(false); setIndex(index + len); }
  }, [index, baseProducts.length]);

  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  const goPrev = () => {
    setAnimated(true);
    setIndex((prev) => prev - 1);
    setPaused(true);
    setTimeout(() => setPaused(false), 4000);
  };

  const goNext = () => {
    setAnimated(true);
    setIndex((prev) => prev + 1);
    setPaused(true);
    setTimeout(() => setPaused(false), 4000);
  };

  const offset = index * STEP;

  return (
    <div className="font-sans bg-white">

      {/* ── Modal ── */}
      {selectedProduct && (
        <FeaturedProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={closeModal}
        />
      )}

      {/* ── Category Strip ── */}
      <div className="bg-white border-b border-stone-200 shadow-sm px-[100px] py-[10px] mt-[130px]">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-0 min-w-max">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/shop/${cat.slug}`}
                className="flex flex-col items-center py-[1px] min-w-[120px] hover:bg-stone-50 border-r border-stone-200 transition-colors group"
              >
                <div className="flex items-center justify-center h-14">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-14 max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-[11px] font-semibold text-stone-700 text-center leading-tight mt-1">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <section className="relative min-h-[320px] flex flex-col items-center justify-center text-center overflow-hidden bg-white">
        <div className="relative z-10 px-6 max-w-4xl mx-auto mt-[90px] mb-[10px]">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-700 mb-1 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Shilpgrah
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Crafted for the World
          </h2>
          <p className="text-base text-amber-700 md:text-lg max-w-[700px] mx-auto leading-relaxed">
            Discover exquisite handcrafted furniture from the royal state of Rajasthan.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 mt-[35px] mb-[35px]">
          <Link
            to="/shop"
            className="group inline-flex items-center space-x-2 bg-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <span>View products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/quote-request"
            className="group inline-flex items-center space-x-2 bg-stone-800 text-white border border-stone-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-stone-700 transition-all duration-300"
          >
            <span>Get Custom Quote</span>
          </Link>
        </div>
      </section>

      {/* ── Infinite Product Carousel ── */}
      <section className="bg-white py-6 px-4">
        <div className="relative">

          {/* ← Left Arrow */}
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-0 top-[60px] -translate-y-1/2 z-10 w-8 h-8 bg-white border border-stone-300 rounded-full flex items-center justify-center shadow-md hover:bg-stone-50 hover:border-stone-400 active:scale-95 transition-all duration-150"
          >
            <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Viewport */}
          <div className="overflow-hidden mx-10">
            {/* Track */}
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className="flex gap-4"
              style={{
                transform: `translateX(-${offset}px)`,
                transition: animated ? 'transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
                willChange: 'transform',
              }}
            >
              {tripled.map((product, i) => (
                <div
                  key={i}
                  className="w-[180px] flex-shrink-0 cursor-pointer group/card"
                  onClick={() => openModal(baseProducts[i % baseProducts.length])}
                >
                  {/* Image */}
                  <div className="bg-white rounded overflow-hidden border border-stone-200 group-hover/card:shadow-lg group-hover/card:border-amber-300 transition-all duration-200">
                    <div className="h-32 flex items-center justify-center bg-white p-2">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover/card:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-2 px-1">
                    <h3 className="text-xs font-bold text-stone-800 leading-tight group-hover/card:text-amber-700 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex gap-1 flex-wrap mt-1">
                      <span className="text-[10px] text-stone-500 font-medium">{product.material}</span>
                      <span className="text-[10px] text-stone-400">•</span>
                      <span className="text-[10px] text-stone-500">{product.finish}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* → Right Arrow */}
          <button
            onClick={goNext}
            aria-label="Next"
            className="absolute right-0 top-[60px] -translate-y-1/2 z-10 w-8 h-8 bg-white border border-stone-300 rounded-full flex items-center justify-center shadow-md hover:bg-stone-50 hover:border-stone-400 active:scale-95 transition-all duration-150"
          >
            <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </section>

    </div>
  );
};

export default Hero;