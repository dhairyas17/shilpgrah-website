import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, ChevronLeft, ChevronRight, Check, Plus, Minus, ZoomIn } from 'lucide-react';
import { Product } from '../types/Product';
import { products as allProducts } from '../data/products';
import { useWishlist } from '../contexts/WishlistContext';
import { useQuote } from '../contexts/QuoteContext';
import { useNavigate } from 'react-router-dom';

interface Props { product: Product; isOpen: boolean; onClose: () => void; }

const CollectionModal: React.FC<Props> = ({ product, isOpen, onClose }) => {
  const [imgIdx, setImgIdx]       = useState(0);
  const [expanded, setExpanded]   = useState(false);
  const [qty, setQty]             = useState(1);
  const [added, setAdded]         = useState(false);
  const [visible, setVisible]     = useState(false);
  const [lightbox, setLightbox]   = useState(false);
  const [lbIdx, setLbIdx]         = useState(0);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToQuote, isInQuote } = useQuote();
  const navigate   = useNavigate();
  const wishlisted = isInWishlist(product.id);

  // Fill 5 image slots: own image first, then sibling products from same category
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
  const dimStr = `${dims.length} × ${dims.width} × ${dims.height} ${dims.unit}`;
  const specs  = [
    { label: 'Material',   value: product.material },
    { label: 'Finish',     value: product.finish },
    { label: 'Dimensions', value: dimStr },
    ...(product.subcategory ? [{ label: 'Type', value: product.subcategory.replace(/-/g, ' ') }] : []),
  ];

  const handleAddToQuote = () => {
    for (let i = 0; i < qty; i++) addToQuote(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const openLightbox = (i: number) => { setLbIdx(i); setLightbox(true); };

  return (
    <>
      {/* ══════════  MAIN MODAL  ══════════ */}
      <div
        onClick={e => e.target === e.currentTarget && onClose()}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
          background: 'rgba(20,12,4,0.75)',
          backdropFilter: 'blur(8px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="cm-inner"
          style={{
            position: 'relative', width: '100%', maxWidth: '960px',
            maxHeight: '92vh', borderRadius: '18px', overflow: 'hidden',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.96)',
            transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
          }}
        >

          {/* ══ LEFT — WHITE IMAGE PANEL ══ */}
          <div style={{ background: '#ffffff', display: 'flex', flexDirection: 'column' }}>

            {/* Big hero image */}
            <div
              style={{
                flex: 1, minHeight: '340px', position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#fafaf9', cursor: 'zoom-in', overflow: 'hidden',
              }}
              onClick={() => openLightbox(imgIdx)}
            >
              <img
                key={imgIdx}
                src={imgs[imgIdx]}
                alt={product.name}
                style={{ maxWidth: '85%', maxHeight: '320px', objectFit: 'contain', animation: 'cmFadeIn 0.2s ease' }}
              />
              <div style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                width: '2rem', height: '2rem', borderRadius: '50%',
                background: 'rgba(255,255,255,0.85)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}>
                <ZoomIn style={{ width: '0.9rem', height: '0.9rem', color: '#78716c' }} />
              </div>
              {imgs.length > 1 && (
                <>
                  <button onClick={e => { e.stopPropagation(); setImgIdx(p => (p - 1 + imgs.length) % imgs.length); }}
                    style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', color: '#44403c' }}>
                    <ChevronLeft style={{ width: '0.85rem', height: '0.85rem' }} />
                  </button>
                  <button onClick={e => { e.stopPropagation(); setImgIdx(p => (p + 1) % imgs.length); }}
                    style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', color: '#44403c' }}>
                    <ChevronRight style={{ width: '0.85rem', height: '0.85rem' }} />
                  </button>
                </>
              )}
            </div>

            {/* 4 thumbnails */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', padding: '10px', borderTop: '1px solid #f0ece4', background: '#ffffff' }}>
              {imgs.slice(1, 5).map((img, i) => {
                const realIdx = i + 1;
                return (
                  <div
                    key={i}
                    onClick={() => setImgIdx(realIdx)}
                    style={{
                      aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                      border: `2px solid ${imgIdx === realIdx ? '#d97706' : 'transparent'}`,
                      background: '#fafaf9', position: 'relative',
                      transform: imgIdx === realIdx ? 'scale(1.03)' : 'scale(1)',
                      transition: 'border-color 0.15s, transform 0.15s',
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div
                      onClick={e => { e.stopPropagation(); openLightbox(realIdx); }}
                      style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', borderRadius: '6px' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.25)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0)'; }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══ RIGHT — AMBER PANEL ══ */}
          <div style={{
            background: 'linear-gradient(160deg, #fffbeb 0%, #fef9f0 60%, #fef3c7 100%)',
            padding: '2rem 1.75rem', overflowY: 'auto', maxHeight: '92vh',
            display: 'flex', flexDirection: 'column', gap: '1.1rem',
            borderLeft: '1.5px solid #fde68a',
          }}>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b45309', fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>
              {product.subcategory?.replace(/-/g, ' ') || product.category}
            </div>

            <div>
              <h2 className="font-serif" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', fontWeight: 700, lineHeight: 1.2, color: '#1c1917', marginBottom: '0.5rem' }}>
                {product.name}
              </h2>
              <p style={{ fontSize: '0.83rem', color: '#78716c', lineHeight: 1.75, fontFamily: 'system-ui, sans-serif' }}>{product.shortDescription}</p>
            </div>

            <div style={{ height: '2px', background: 'linear-gradient(90deg, #d97706, #fbbf24, transparent)', borderRadius: '1px' }} />

            <div>
              <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#92400e', fontWeight: 700, marginBottom: '0.65rem', fontFamily: 'system-ui, sans-serif' }}>Specifications</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                {specs.map(s => (
                  <div key={s.label} style={{ padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.7)', borderRadius: '10px', border: '1px solid rgba(251,191,36,0.4)', borderLeft: '3px solid #d97706' }}>
                    <div style={{ fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#92400e', fontWeight: 700, marginBottom: '0.2rem', fontFamily: 'system-ui, sans-serif' }}>{s.label}</div>
                    <div style={{ fontSize: '0.8rem', color: '#1c1917', fontWeight: 600, textTransform: 'capitalize', fontFamily: 'Georgia, serif' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#92400e', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'system-ui, sans-serif' }}>About this piece</p>
              <p style={{ fontSize: '0.8rem', color: '#78716c', lineHeight: 1.8, fontFamily: 'system-ui, sans-serif' }}>
                {expanded ? product.longDescription : `${product.longDescription.substring(0, 180)}...`}
              </p>
              <button onClick={() => setExpanded(!expanded)}
                style={{ marginTop: '0.3rem', fontSize: '0.73rem', color: '#d97706', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
                {expanded ? 'Show less ↑' : 'Read more ↓'}
              </button>
            </div>

            {product.tags?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {product.tags.map(tag => (
                  <span key={tag} style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(217,119,6,0.3)', color: '#92400e', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.06em', fontFamily: 'system-ui, sans-serif' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', color: '#78716c', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>Qty</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid rgba(217,119,6,0.35)', borderRadius: '8px', overflow: 'hidden', background: 'rgba(255,255,255,0.7)' }}>
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
              <button
                onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                style={{ width: '3rem', height: '3rem', flexShrink: 0, borderRadius: '12px', background: wishlisted ? '#fee2e2' : 'rgba(255,255,255,0.8)', border: `1.5px solid ${wishlisted ? '#fca5a5' : 'rgba(217,119,6,0.3)'}`, color: wishlisted ? '#ef4444' : '#78716c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              >
                <Heart style={{ width: '1rem', height: '1rem', fill: wishlisted ? 'currentColor' : 'none', strokeWidth: 2 }} />
              </button>

              {isInQuote(product.id) && !added ? (
                <button onClick={() => navigate('/quote')}
                  style={{ flex: 1, height: '3rem', borderRadius: '12px', background: '#d97706', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', boxShadow: '0 6px 20px rgba(217,119,6,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontFamily: 'system-ui, sans-serif' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; }}
                >
                  <ShoppingBag style={{ width: '1rem', height: '1rem' }} /><span>View Quote</span>
                </button>
              ) : (
                <button onClick={handleAddToQuote}
                  style={{ flex: 1, height: '3rem', borderRadius: '12px', background: added ? '#065f46' : '#d97706', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', boxShadow: added ? '0 4px 16px rgba(6,95,70,0.35)' : '0 6px 20px rgba(217,119,6,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.3s ease', fontFamily: 'system-ui, sans-serif' }}
                  onMouseEnter={e => { if (!added) (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
                  onMouseLeave={e => { if (!added) (e.currentTarget as HTMLElement).style.background = added ? '#065f46' : '#d97706'; }}
                >
                  {added
                    ? <><Check style={{ width: '1rem', height: '1rem' }} /><span>Added {qty > 1 ? `×${qty}` : ''}!</span></>
                    : <><ShoppingBag style={{ width: '1rem', height: '1rem' }} /><span>Add to Quote{qty > 1 ? ` (×${qty})` : ''}</span></>
                  }
                </button>
              )}
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

      {/* ══════════  LIGHTBOX  ══════════ */}
      {lightbox && (
        <div onClick={() => setLightbox(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', animation: 'lbFadeIn 0.2s ease' }}>
          <img src={imgs[lbIdx]} alt={product.name} onClick={e => e.stopPropagation()}
            style={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', animation: 'lbSlide 0.2s ease' }} />
          {imgs.length > 1 && (<>
            <button onClick={e => { e.stopPropagation(); setLbIdx(p => (p - 1 + imgs.length) % imgs.length); }}
              style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; }}>
              <ChevronLeft style={{ width: '1.2rem', height: '1.2rem' }} />
            </button>
            <button onClick={e => { e.stopPropagation(); setLbIdx(p => (p + 1) % imgs.length); }}
              style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; }}>
              <ChevronRight style={{ width: '1.2rem', height: '1.2rem' }} />
            </button>
          </>)}
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
            {imgs.map((img, i) => (
              <div key={i} onClick={e => { e.stopPropagation(); setLbIdx(i); }}
                style={{ width: '3.5rem', height: '3.5rem', borderRadius: '8px', overflow: 'hidden', border: `2px solid ${i === lbIdx ? '#d97706' : 'rgba(255,255,255,0.2)'}`, cursor: 'pointer', opacity: i === lbIdx ? 1 : 0.55, transition: 'all 0.2s', flexShrink: 0 }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', top: '1.25rem', left: '50%', transform: 'translateX(-50%)', padding: '0.3rem 0.85rem', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>
            {lbIdx + 1} / {imgs.length}
          </div>
          <button onClick={() => setLightbox(false)}
            style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X style={{ width: '1rem', height: '1rem' }} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes cmFadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lbSlide  { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @media (max-width: 640px) { .cm-inner { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
};

export default CollectionModal;