import React, { useState, useRef, useEffect } from 'react';
import { Heart, ShoppingBag, ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn, Check, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { products, homecategories, CategoryKey } from '../data/products';
import { useWishlist } from '../contexts/WishlistContext';
import { useQuote } from '../contexts/QuoteContext';

const bestSellerCategories: CategoryKey[] = ['bookshelf', 'almirah'];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className}
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

/* ── Inline lightbox ── */
interface LightboxProps {
  imgs: string[];
  startIdx: number;
  productName: string;
  onClose: () => void;
}
const Lightbox: React.FC<LightboxProps> = ({ imgs, startIdx, productName, onClose }) => {
  const [idx, setIdx] = useState(startIdx);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') setIdx(p => (p + 1) % imgs.length);
      if (e.key === 'ArrowLeft')  setIdx(p => (p - 1 + imgs.length) % imgs.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [imgs.length, onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.93)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', animation: 'lbIn 0.2s ease',
      }}
    >
      {/* Main image */}
      <img
        key={idx}
        src={imgs[idx]}
        alt={productName}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain',
          borderRadius: '12px', boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          animation: 'lbImg 0.2s ease', userSelect: 'none',
        }}
      />

      {/* Prev */}
      <button onClick={e => { e.stopPropagation(); setIdx(p => (p - 1 + imgs.length) % imgs.length); }}
        style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.22)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
      ><ChevronLeft style={{ width: '1.25rem', height: '1.25rem' }} /></button>

      {/* Next */}
      <button onClick={e => { e.stopPropagation(); setIdx(p => (p + 1) % imgs.length); }}
        style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.22)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
      ><ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} /></button>

      {/* Thumbnails */}
      <div style={{ position: 'absolute', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', padding: '8px 12px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {imgs.map((img, i) => (
          <div key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
            style={{ width: '3.25rem', height: '3.25rem', borderRadius: '7px', overflow: 'hidden', flexShrink: 0, border: `2px solid ${i === idx ? '#d97706' : 'rgba(255,255,255,0.15)'}`, opacity: i === idx ? 1 : 0.5, cursor: 'pointer', transition: 'all 0.2s', transform: i === idx ? 'scale(1.08)' : 'scale(1)' }}>
            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Counter */}
      <div style={{ position: 'absolute', top: '1.1rem', left: '50%', transform: 'translateX(-50%)', padding: '0.28rem 0.85rem', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem', fontWeight: 600, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08em' }}>
        {idx + 1} / {imgs.length}
      </div>

      {/* Close */}
      <button onClick={onClose}
        style={{ position: 'absolute', top: '1.1rem', right: '1.1rem', width: '2.4rem', height: '2.4rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.6)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
      ><X style={{ width: '1rem', height: '1rem' }} /></button>
    </div>
  );
};

/* ── Modal ── */
interface ModalProps { product: Product; siblingImgs: string[]; onClose: () => void; }
const ProductDetailModal: React.FC<ModalProps> = ({ product, siblingImgs, onClose }) => {
  const [imgIdx, setImgIdx]     = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [qty, setQty]           = useState(1);
  const [added, setAdded]       = useState(false);
  const [visible, setVisible]   = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [lbStart, setLbStart]   = useState(0);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToQuote } = useQuote();
  const wishlisted = isInWishlist(product.id);

  // Build 5-image panel: product image first, then 4 siblings
  const imgs = [product.images[0], ...siblingImgs.slice(0, 4)];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => { document.body.style.overflow = ''; };
  }, []);

  const dims   = product.dimensions;
  const dimStr = dims ? `${dims.length} × ${dims.width} × ${dims.height} ${dims.unit}` : null;
  const specs  = [
    { label: 'Material',   value: product.material },
    { label: 'Finish',     value: product.finish },
    ...(dimStr ? [{ label: 'Dimensions', value: dimStr }] : []),
    ...(product.subcategory ? [{ label: 'Type', value: product.subcategory.replace(/-/g, ' ') }] : []),
  ];

  const handleAddToQuote = () => {
    for (let i = 0; i < qty; i++) addToQuote(product);
    setAdded(true); setTimeout(() => setAdded(false), 2500);
  };

  const openLb = (i: number) => { setLbStart(i); setLightbox(true); };

  const navBtn: React.CSSProperties = {
    width: '2rem', height: '2rem', borderRadius: '50%',
    background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', color: '#44403c',
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
  };

  return (
    <>
      <div onClick={e => e.target === e.currentTarget && onClose()}
        style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(20,12,4,0.75)', backdropFilter: 'blur(8px)', opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <div className="bs-modal"
          style={{ position: 'relative', width: '100%', maxWidth: '960px', maxHeight: '92vh', borderRadius: '18px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', boxShadow: '0 40px 100px rgba(0,0,0,0.4)', transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.96)', transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)' }}>

          {/* ══ LEFT — WHITE ══ */}
          <div style={{ background: '#fff', display: 'flex', flexDirection: 'column' }}>

            {/* Hero image */}
            <div onClick={() => openLb(imgIdx)}
              style={{ flex: 1, minHeight: '320px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafaf9', cursor: 'zoom-in', overflow: 'hidden' }}>
              <img key={imgIdx} src={imgs[imgIdx]} alt={product.name}
                style={{ maxWidth: '85%', maxHeight: '310px', objectFit: 'contain', animation: 'fpmFade 0.22s ease', userSelect: 'none' }} />
              {/* Zoom badge */}
              <div style={{ position: 'absolute', top: '0.7rem', right: '0.7rem', width: '1.9rem', height: '1.9rem', borderRadius: '50%', background: 'rgba(255,255,255,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', pointerEvents: 'none' }}>
                <ZoomIn style={{ width: '0.85rem', height: '0.85rem', color: '#78716c' }} />
              </div>
              {/* Prev / Next */}
              <button onClick={e => { e.stopPropagation(); setImgIdx(p => (p - 1 + imgs.length) % imgs.length); }}
                style={{ ...navBtn, left: '0.6rem' }}>
                <ChevronLeft style={{ width: '0.85rem', height: '0.85rem' }} />
              </button>
              <button onClick={e => { e.stopPropagation(); setImgIdx(p => (p + 1) % imgs.length); }}
                style={{ ...navBtn, right: '0.6rem' }}>
                <ChevronRight style={{ width: '0.85rem', height: '0.85rem' }} />
              </button>
            </div>

            {/* 4 thumbnails */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px', padding: '10px', borderTop: '1px solid #f0ece4', background: '#fff' }}>
              {imgs.slice(1, 5).map((img, i) => {
                const ri = i + 1;
                return (
                  <div key={i} onClick={() => setImgIdx(ri)}
                    style={{ aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${imgIdx === ri ? '#d97706' : 'transparent'}`, background: '#fafaf9', position: 'relative', transform: imgIdx === ri ? 'scale(1.04)' : 'scale(1)', transition: 'all 0.15s ease' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {/* Zoom overlay on hover */}
                    <div onClick={e => { e.stopPropagation(); openLb(ri); }}
                      style={{ position: 'absolute', inset: 0, borderRadius: '6px', background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.18s' }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.28)';
                        const icon = (e.currentTarget as HTMLElement).querySelector('svg') as SVGElement | null;
                        if (icon) icon.style.opacity = '1';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0)';
                        const icon = (e.currentTarget as HTMLElement).querySelector('svg') as SVGElement | null;
                        if (icon) icon.style.opacity = '0';
                      }}
                    >
                      <ZoomIn style={{ width: '0.85rem', height: '0.85rem', color: 'white', opacity: 0, transition: 'opacity 0.18s', pointerEvents: 'none' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══ RIGHT — AMBER ══ */}
          <div style={{ background: 'linear-gradient(160deg, #fffbeb 0%, #fef9f0 55%, #fef3c7 100%)', padding: '2rem 1.75rem', overflowY: 'auto', maxHeight: '92vh', display: 'flex', flexDirection: 'column', gap: '1.1rem', borderLeft: '1.5px solid #fde68a' }}>

            <div style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b45309', fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>
              {product.subcategory?.replace(/-/g, ' ') || product.category}
            </div>

            <div>
              <h2 className="font-serif" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', fontWeight: 700, lineHeight: 1.2, color: '#1c1917', marginBottom: '0.45rem' }}>{product.name}</h2>
              <p style={{ fontSize: '0.83rem', color: '#78716c', lineHeight: 1.75, fontFamily: 'system-ui, sans-serif' }}>{product.shortDescription}</p>
            </div>

            <div style={{ height: '2px', background: 'linear-gradient(90deg, #d97706, #fbbf24, transparent)', borderRadius: '1px' }} />

            <div>
              <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#92400e', fontWeight: 700, marginBottom: '0.6rem', fontFamily: 'system-ui, sans-serif' }}>Specifications</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem' }}>
                {specs.map(s => (
                  <div key={s.label} style={{ padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.72)', borderRadius: '10px', border: '1px solid rgba(251,191,36,0.38)', borderLeft: '3px solid #d97706' }}>
                    <div style={{ fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#92400e', fontWeight: 700, marginBottom: '0.18rem', fontFamily: 'system-ui, sans-serif' }}>{s.label}</div>
                    <div style={{ fontSize: '0.8rem', color: '#1c1917', fontWeight: 600, textTransform: 'capitalize', fontFamily: 'Georgia, serif' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#92400e', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'system-ui, sans-serif' }}>About this piece</p>
              <p style={{ fontSize: '0.8rem', color: '#78716c', lineHeight: 1.8, fontFamily: 'system-ui, sans-serif' }}>
                {expanded ? product.longDescription : `${product.longDescription?.slice(0, 180)}...`}
              </p>
              <button onClick={() => setExpanded(!expanded)}
                style={{ marginTop: '0.3rem', fontSize: '0.73rem', color: '#d97706', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
                {expanded ? 'Show less ↑' : 'Read more ↓'}
              </button>
            </div>

            {product.tags?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {product.tags.map(tag => (
                  <span key={tag} style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(217,119,6,0.28)', color: '#92400e', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.06em', fontFamily: 'system-ui, sans-serif' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', color: '#78716c', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>Qty</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid rgba(217,119,6,0.35)', borderRadius: '8px', overflow: 'hidden', background: 'rgba(255,255,255,0.72)' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: '2.1rem', height: '2.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#78716c' }}>
                  <Minus style={{ width: '0.75rem', height: '0.75rem' }} />
                </button>
                <span style={{ width: '2.25rem', textAlign: 'center', fontSize: '0.9rem', color: '#1c1917', fontWeight: 700, fontFamily: 'Georgia, serif' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: '2.1rem', height: '2.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#78716c' }}>
                  <Plus style={{ width: '0.75rem', height: '0.75rem' }} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.55rem', marginTop: 'auto' }}>
              <button onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                style={{ width: '3rem', height: '3rem', flexShrink: 0, borderRadius: '12px', background: wishlisted ? '#fee2e2' : 'rgba(255,255,255,0.8)', border: `1.5px solid ${wishlisted ? '#fca5a5' : 'rgba(217,119,6,0.3)'}`, color: wishlisted ? '#ef4444' : '#78716c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={e => { if (!wishlisted) { (e.currentTarget as HTMLElement).style.borderColor = '#ef4444'; (e.currentTarget as HTMLElement).style.color = '#ef4444'; } }}
                onMouseLeave={e => { if (!wishlisted) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(217,119,6,0.3)'; (e.currentTarget as HTMLElement).style.color = '#78716c'; } }}
              >
                <Heart style={{ width: '1rem', height: '1rem', fill: wishlisted ? 'currentColor' : 'none', strokeWidth: 2 }} />
              </button>
              <button onClick={handleAddToQuote}
                style={{ flex: 1, height: '3rem', borderRadius: '12px', background: added ? '#065f46' : '#d97706', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', boxShadow: added ? '0 4px 16px rgba(6,95,70,0.35)' : '0 6px 20px rgba(217,119,6,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.3s ease', fontFamily: 'system-ui, sans-serif' }}
                onMouseEnter={e => { if (!added) (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
                onMouseLeave={e => { if (!added) (e.currentTarget as HTMLElement).style.background = '#d97706'; }}
              >
                {added
                  ? <><Check style={{ width: '1rem', height: '1rem' }} /><span>Added to Quote!</span></>
                  : <><ShoppingBag style={{ width: '1rem', height: '1rem' }} /><span>Add to Quote{qty > 1 ? ` (×${qty})` : ''}</span></>
                }
              </button>
            </div>
          </div>

          {/* Close */}
          <button onClick={onClose}
            style={{ position: 'absolute', top: '0.85rem', right: '0.85rem', zIndex: 20, width: '2.1rem', height: '2.1rem', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: '1.5px solid #e7e5e4', color: '#78716c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fee2e2'; (e.currentTarget as HTMLElement).style.color = '#ef4444'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.95)'; (e.currentTarget as HTMLElement).style.color = '#78716c'; }}
          >
            <X style={{ width: '0.85rem', height: '0.85rem' }} />
          </button>
        </div>
      </div>

      {lightbox && (
        <Lightbox imgs={imgs} startIdx={lbStart} productName={product.name} onClose={() => setLightbox(false)} />
      )}

      <style>{`
        @keyframes fpmFade { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }
        @keyframes lbIn    { from { opacity:0; } to { opacity:1; } }
        @keyframes lbImg   { from { opacity:0; transform:scale(0.94); } to { opacity:1; transform:scale(1); } }
        @media (max-width: 640px) { .bs-modal { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
};

/* ══════════════════════════  MAIN COMPONENT  ══════════════════════════ */
const BestSellers: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(bestSellerCategories[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredId, setHoveredId]             = useState<string | null>(null);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToQuote, isInQuote } = useQuote();

  const filteredProducts = products.filter(p => p.subcategory === activeCategory && p.isBestSeller);

  /* Sibling images for the active product: other products in the same category */
  const getSiblingImgs = (product: Product): string[] =>
    products
      .filter(p => p.subcategory === product.subcategory && p.id !== product.id)
      .slice(0, 4)
      .map(p => p.images[0]);

  return (
    <section style={{ background: '#fafaf9', padding: '7rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div style={{ width: '2rem', height: '2px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '1px' }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706', fontFamily: 'system-ui, sans-serif' }}>Most Loved</span>
              </div>
              <h2 className="font-serif text-stone-900" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', fontWeight: 700, lineHeight: 1.1 }}>
                Bestsellers
              </h2>
              <div style={{ width: '3rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px', marginTop: '0.9rem' }} />
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 p-1 rounded-xl" style={{ background: '#f5f0e8', alignSelf: 'flex-start' }}>
              {bestSellerCategories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  style={{ padding: '0.5rem 1.25rem', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, fontFamily: 'system-ui, sans-serif', letterSpacing: '0.06em', textTransform: 'capitalize', transition: 'all 0.2s ease', background: activeCategory === cat ? '#d97706' : 'transparent', color: activeCategory === cat ? 'white' : '#78716c', boxShadow: activeCategory === cat ? '0 2px 8px rgba(217,119,6,0.3)' : 'none' }}>
                  {homecategories[cat]}
                </button>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── Product cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product, i) => {
            const inWish  = isInWishlist(product.id);
            const inQuote = isInQuote(product.id);
            const hovered = hoveredId === product.id;



            return (
              <FadeUp key={product.id} delay={i * 0.07}>
                <div onMouseEnter={() => setHoveredId(product.id)} onMouseLeave={() => setHoveredId(null)}>

                  {/* ── Card shell ── */}
                  <div
                    style={{
                      borderRadius: '14px', overflow: 'hidden', background: '#fff',
                      border: '1.5px solid #f0ece4',
                      boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.13)' : '0 2px 12px rgba(0,0,0,0.07)',
                      transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    {/* ── Big main image ── */}
                    <div
                      onClick={() => setSelectedProduct(product)}
                      style={{ position: 'relative', aspectRatio: '4/3', background: '#fafaf9', cursor: 'pointer', overflow: 'hidden' }}
                    >
                      <img src={product.images[0]} alt={product.name}
                        className="w-full h-full object-cover"
                        style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)' }}
                      />
                      {/* Gradient overlay */}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 55%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }} />

                      {/* Hover action bar */}
                      <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', display: 'flex', gap: '6px', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)', transition: 'all 0.3s ease' }}>
                        <button onClick={e => { e.stopPropagation(); inWish ? removeFromWishlist(product.id) : addToWishlist(product); }}
                          style={{ flex: 1, padding: '0.4rem', fontSize: '0.68rem', fontWeight: 700, background: inWish ? '#ef4444' : 'rgba(255,255,255,0.92)', color: inWish ? 'white' : '#1c1917', border: 'none', cursor: 'pointer', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', backdropFilter: 'blur(4px)', fontFamily: 'system-ui, sans-serif' }}>
                          <Heart style={{ width: '0.7rem', height: '0.7rem' }} fill={inWish ? 'currentColor' : 'none'} />
                          {inWish ? 'Saved' : 'Save'}
                        </button>
                        <button onClick={e => { e.stopPropagation(); addToQuote(product); }}
                          style={{ flex: 1, padding: '0.4rem', fontSize: '0.68rem', fontWeight: 700, background: inQuote ? '#d97706' : 'rgba(255,255,255,0.92)', color: inQuote ? 'white' : '#1c1917', border: 'none', cursor: 'pointer', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', backdropFilter: 'blur(4px)', fontFamily: 'system-ui, sans-serif' }}>
                          <ShoppingBag style={{ width: '0.7rem', height: '0.7rem' }} />
                          {inQuote ? 'Added' : 'Quote'}
                        </button>
                      </div>

                      {/* Bestseller badge */}
                      <div style={{ position: 'absolute', top: '8px', left: '8px', padding: '0.18rem 0.55rem', background: 'linear-gradient(135deg, #d97706, #fbbf24)', borderRadius: '999px', fontSize: '0.55rem', fontWeight: 700, color: 'white', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', boxShadow: '0 2px 8px rgba(217,119,6,0.4)' }}>
                        Bestseller
                      </div>

                      {/* Zoom icon top-right */}
                      <div style={{ position: 'absolute', top: '8px', right: '8px', width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: 'rgba(255,255,255,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transition: 'opacity 0.2s', pointerEvents: 'none' }}>
                        <ZoomIn style={{ width: '0.75rem', height: '0.75rem', color: '#78716c' }} />
                      </div>
                    </div>

                    {/* ── Info inside card ── */}
                    <div style={{ padding: '12px 14px 14px', borderTop: '1px solid #f5f0e8' }}>
                      <h3 className="font-serif font-bold text-stone-800"
                        style={{ fontSize: '0.92rem', lineHeight: 1.3, marginBottom: '5px' }}>
                        {product.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#d97706', flexShrink: 0, display: 'inline-block' }} />
                        <span style={{ fontSize: '0.72rem', color: '#78716c', fontFamily: 'system-ui, sans-serif' }}>{product.material}</span>
                        <span style={{ fontSize: '0.72rem', color: '#d6d3d1' }}>·</span>
                        <span style={{ fontSize: '0.72rem', color: '#a8a29e', fontFamily: 'system-ui, sans-serif' }}>{product.finish}</span>
                      </div>
                    </div>

                  </div>

                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <FadeUp delay={0.1}>
          <div className="text-center mt-14">
            <Link to="/shop"
              className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200"
              style={{ padding: '0.9rem 2.25rem', background: '#d97706', color: 'white', fontSize: '0.88rem', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', boxShadow: '0 4px 20px rgba(217,119,6,0.3)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeUp>
      </div>

      {/* ── Detail modal ── */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          siblingImgs={getSiblingImgs(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default BestSellers;