import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, ShoppingBag, Check, Plus, Minus, ZoomIn } from 'lucide-react';
import { Product } from '../types/Product';
import { useWishlist } from '../contexts/WishlistContext';
import { useQuote } from '../contexts/QuoteContext';
import { products as allProducts } from '../data/products';

interface Props { product: Product; isOpen: boolean; onClose: () => void; }

const FeaturedProductModal: React.FC<Props> = ({ product, isOpen, onClose }) => {
  const [imgIdx, setImgIdx]       = useState(0);
  const [expanded, setExpanded]   = useState(false);
  const [qty, setQty]             = useState(1);
  const [added, setAdded]         = useState(false);
  const [visible, setVisible]     = useState(false);
  const [lightbox, setLightbox]   = useState(false);
  const [lbIdx, setLbIdx]         = useState(0);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToQuote } = useQuote();
  const wishlisted = isInWishlist(product.id);

  const siblingImgs = allProducts
    .filter(p => p.subcategory === product.subcategory && p.id !== product.id)
    .slice(0, 5).map(p => p.images[0]);
  const imgs = [...product.images, ...siblingImgs].slice(0, 5);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => { document.body.style.overflow = ''; }, 350);
      return () => clearTimeout(t);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => { setImgIdx(0); setExpanded(false); setQty(1); setLightbox(false); }, [product.id]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      setLightbox(false);
      if (e.key === 'ArrowRight')  setLbIdx(p => (p + 1) % imgs.length);
      if (e.key === 'ArrowLeft')   setLbIdx(p => (p - 1 + imgs.length) % imgs.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, imgs.length]);

  if (!isOpen) return null;

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

  return (
    <>
      {/* Backdrop */}
      <div onClick={e => e.target === e.currentTarget && onClose()}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '0',
          background: 'rgba(20,12,4,0.75)', backdropFilter: 'blur(8px)',
          opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease',
        }}
        className="fpm-backdrop"
      >
        {/* Modal shell */}
        <div className="fpm-shell" style={{
          position: 'relative', width: '100%', maxWidth: '960px',
          borderRadius: '18px 18px 0 0',
          overflow: 'hidden', background: 'white',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.3)',
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
          maxHeight: '95dvh', display: 'flex', flexDirection: 'column',
        }}>

          {/* ── LAYOUT: side-by-side on desktop, stacked on mobile ── */}
          <div className="fpm-inner" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            flex: 1, minHeight: 0, overflow: 'hidden',
          }}>

            {/* LEFT — image panel */}
            <div style={{ background: '#fff', display: 'flex', flexDirection: 'column', borderRight: '1px solid #f0ece4' }}>
              {/* Hero image */}
              <div onClick={() => { setLbIdx(imgIdx); setLightbox(true); }}
                style={{ flex: 1, minHeight: '260px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafaf9', cursor: 'zoom-in', overflow: 'hidden' }}>
                <img key={imgIdx} src={imgs[imgIdx]} alt={product.name}
                  style={{ maxWidth: '85%', maxHeight: '300px', objectFit: 'contain', animation: 'fpmFade 0.22s ease', userSelect: 'none' }} />
                <div style={{ position: 'absolute', top: '0.65rem', right: '0.65rem', width: '1.8rem', height: '1.8rem', borderRadius: '50%', background: 'rgba(255,255,255,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', pointerEvents: 'none' }}>
                  <ZoomIn style={{ width: '0.8rem', height: '0.8rem', color: '#78716c' }} />
                </div>
                {imgs.length > 1 && (<>
                  <button onClick={e => { e.stopPropagation(); setImgIdx(p => (p - 1 + imgs.length) % imgs.length); }}
                    style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', color: '#44403c' }}>
                    <ChevronLeft style={{ width: '0.85rem', height: '0.85rem' }} />
                  </button>
                  <button onClick={e => { e.stopPropagation(); setImgIdx(p => (p + 1) % imgs.length); }}
                    style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', color: '#44403c' }}>
                    <ChevronRight style={{ width: '0.85rem', height: '0.85rem' }} />
                  </button>
                </>)}
              </div>
              {/* Thumbnails */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '5px', padding: '8px', borderTop: '1px solid #f0ece4' }}>
                {imgs.slice(1, 5).map((img, i) => {
                  const ri = i + 1;
                  return (
                    <div key={i} onClick={() => setImgIdx(ri)}
                      style={{ aspectRatio: '1', borderRadius: '7px', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${imgIdx === ri ? '#d97706' : 'transparent'}`, background: '#fafaf9', transition: 'all 0.15s', transform: imgIdx === ri ? 'scale(1.04)' : 'scale(1)' }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT — details panel */}
            <div style={{
              background: 'linear-gradient(160deg, #fffbeb 0%, #fef9f0 55%, #fef3c7 100%)',
              padding: '1.75rem 1.5rem',
              overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.9rem',
              borderLeft: '1.5px solid #fde68a',
            }}>
              <div style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b45309', fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>
                {product.subcategory?.replace(/-/g, ' ') || product.category}
              </div>
              <div>
                <h2 className="font-serif" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.85rem)', fontWeight: 700, lineHeight: 1.2, color: '#1c1917', marginBottom: '0.4rem' }}>{product.name}</h2>
                <p style={{ fontSize: '0.82rem', color: '#78716c', lineHeight: 1.75, fontFamily: 'system-ui, sans-serif' }}>{product.shortDescription}</p>
              </div>
              <div style={{ height: '2px', background: 'linear-gradient(90deg, #d97706, #fbbf24, transparent)', borderRadius: '1px' }} />
              <div>
                <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#92400e', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'system-ui, sans-serif' }}>Specifications</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
                  {specs.map(s => (
                    <div key={s.label} style={{ padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.72)', borderRadius: '8px', border: '1px solid rgba(251,191,36,0.38)', borderLeft: '3px solid #d97706' }}>
                      <div style={{ fontSize: '0.53rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#92400e', fontWeight: 700, marginBottom: '0.12rem', fontFamily: 'system-ui, sans-serif' }}>{s.label}</div>
                      <div style={{ fontSize: '0.77rem', color: '#1c1917', fontWeight: 600, textTransform: 'capitalize', fontFamily: 'Georgia, serif' }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#92400e', fontWeight: 700, marginBottom: '0.3rem', fontFamily: 'system-ui, sans-serif' }}>About this piece</p>
                <p style={{ fontSize: '0.79rem', color: '#78716c', lineHeight: 1.8, fontFamily: 'system-ui, sans-serif' }}>
                  {expanded ? product.longDescription : `${product.longDescription?.slice(0, 160)}...`}
                </p>
                <button onClick={() => setExpanded(!expanded)} style={{ marginTop: '0.2rem', fontSize: '0.72rem', color: '#d97706', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
                  {expanded ? 'Show less ↑' : 'Read more ↓'}
                </button>
              </div>
              {product.tags?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {product.tags.map(tag => (
                    <span key={tag} style={{ padding: '0.18rem 0.55rem', borderRadius: '999px', background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(217,119,6,0.28)', color: '#92400e', fontSize: '0.62rem', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>#{tag}</span>
                  ))}
                </div>
              )}
              {/* Qty */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#78716c', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>Qty</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid rgba(217,119,6,0.35)', borderRadius: '8px', overflow: 'hidden', background: 'rgba(255,255,255,0.72)' }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: '2.4rem', height: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#78716c' }}>
                    <Minus style={{ width: '0.75rem', height: '0.75rem' }} />
                  </button>
                  <span style={{ width: '2.25rem', textAlign: 'center', fontSize: '0.9rem', color: '#1c1917', fontWeight: 700, fontFamily: 'Georgia, serif' }}>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} style={{ width: '2.4rem', height: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#78716c' }}>
                    <Plus style={{ width: '0.75rem', height: '0.75rem' }} />
                  </button>
                </div>
              </div>
              {/* CTAs */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <button onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                  style={{ width: '3rem', height: '3rem', flexShrink: 0, borderRadius: '12px', background: wishlisted ? '#fee2e2' : 'rgba(255,255,255,0.8)', border: `1.5px solid ${wishlisted ? '#fca5a5' : 'rgba(217,119,6,0.3)'}`, color: wishlisted ? '#ef4444' : '#78716c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  <Heart style={{ width: '1rem', height: '1rem', fill: wishlisted ? 'currentColor' : 'none', strokeWidth: 2 }} />
                </button>
                <button onClick={handleAddToQuote}
                  style={{ flex: 1, height: '3rem', borderRadius: '12px', background: added ? '#065f46' : '#d97706', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: added ? '0 4px 16px rgba(6,95,70,0.35)' : '0 6px 20px rgba(217,119,6,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.3s ease', fontFamily: 'system-ui, sans-serif' }}
                  onMouseEnter={e => { if (!added) (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
                  onMouseLeave={e => { if (!added) (e.currentTarget as HTMLElement).style.background = added ? '#065f46' : '#d97706'; }}>
                  {added
                    ? <><Check style={{ width: '1rem', height: '1rem' }} /><span>Added!</span></>
                    : <><ShoppingBag style={{ width: '1rem', height: '1rem' }} /><span>Add to Quote{qty > 1 ? ` (×${qty})` : ''}</span></>
                  }
                </button>
              </div>
            </div>
          </div>

          {/* Close */}
          <button onClick={onClose}
            style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 20, width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: '1.5px solid #e7e5e4', color: '#78716c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
            <X style={{ width: '0.9rem', height: '0.9rem' }} />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.93)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <img src={imgs[lbIdx]} alt={product.name} onClick={e => e.stopPropagation()}
            style={{ maxWidth: '92vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }} />
          {imgs.length > 1 && (<>
            <button onClick={e => { e.stopPropagation(); setLbIdx(p => (p - 1 + imgs.length) % imgs.length); }}
              style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft style={{ width: '1.2rem', height: '1.2rem' }} />
            </button>
            <button onClick={e => { e.stopPropagation(); setLbIdx(p => (p + 1) % imgs.length); }}
              style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight style={{ width: '1.2rem', height: '1.2rem' }} />
            </button>
          </>)}
          <button onClick={() => setLightbox(false)}
            style={{ position: 'absolute', top: '1rem', right: '1rem', width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X style={{ width: '1rem', height: '1rem' }} />
          </button>
          <div style={{ position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>
            {lbIdx + 1} / {imgs.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fpmFade { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }

        /* Desktop: centered dialog */
        @media (min-width: 641px) {
          .fpm-backdrop { align-items: center !important; padding: 1rem !important; }
          .fpm-shell { border-radius: 18px !important; max-height: 92vh !important; }
        }

        /* Mobile: bottom sheet, single column */
        @media (max-width: 640px) {
          .fpm-inner { grid-template-columns: 1fr !important; overflow-y: auto; max-height: calc(95dvh - 0px); }
          .fpm-inner > div:first-child { border-right: none !important; border-bottom: 1px solid #f0ece4; }
          .fpm-inner > div:first-child > div:first-child { min-height: 240px !important; max-height: 52vw !important; }
          .fpm-inner > div:last-child { max-height: none !important; }
        }
      `}</style>
    </>
  );
};

export default FeaturedProductModal;