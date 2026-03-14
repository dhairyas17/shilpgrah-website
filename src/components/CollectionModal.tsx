import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, ChevronLeft, ChevronRight, Check, Plus, Minus } from 'lucide-react';
import { Product } from '../types/Product';
import { useWishlist } from '../contexts/WishlistContext';
import { useQuote } from '../contexts/QuoteContext';
import { useNavigate } from 'react-router-dom';

interface CollectionModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const CollectionModal: React.FC<CollectionModalProps> = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [quoteAdded, setQuoteAdded] = useState(false);
  const [visible, setVisible] = useState(false);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToQuote, isInQuote } = useQuote();
  const navigate = useNavigate();
  const wishlisted = isInWishlist(product.id);

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

  useEffect(() => {
    setCurrentImageIndex(0);
    setShowFullDescription(false);
    setQuantity(1);
  }, [product.id]);

  if (!isOpen) return null;

  const handleWishlistToggle = () => {
    wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const handleAddToQuote = () => {
    for (let i = 0; i < quantity; i++) addToQuote(product);
    setQuoteAdded(true);
    setTimeout(() => setQuoteAdded(false), 2500);
  };

  const nextImage = () => setCurrentImageIndex((p) => (p + 1) % product.images.length);
  const prevImage = () => setCurrentImageIndex((p) => (p - 1 + product.images.length) % product.images.length);

  const dims = product.dimensions;
  const specs = [
    { label: 'Material', value: product.material },
    { label: 'Finish', value: product.finish },
    { label: 'Dimensions', value: `${dims.length} × ${dims.width} × ${dims.height} ${dims.unit}` },
    ...(product.subcategory ? [{ label: 'Type', value: product.subcategory.replace(/-/g, ' ') }] : []),
  ];

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(28,20,10,0.7)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        className="collection-modal-inner"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.96)',
          transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
        }}
      >

        {/* ══ LEFT — IMAGE PANEL ══ */}
        <div style={{ background: '#f5f0e8', display: 'flex', flexDirection: 'column' }}>

          {/* Main image */}
          <div
            style={{
              position: 'relative', flex: 1,
              minHeight: '380px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              key={currentImageIndex}
              src={product.images[currentImageIndex]}
              alt={product.name}
              style={{
                maxWidth: '100%', maxHeight: '460px',
                objectFit: 'contain', padding: '2rem',
                animation: 'colModalFade 0.25s ease',
              }}
            />

            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white"
                  style={{
                    width: '2.2rem', height: '2.2rem',
                    background: 'rgba(255,255,255,0.75)',
                    border: 'none', cursor: 'pointer', color: '#44403c',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white"
                  style={{
                    width: '2.2rem', height: '2.2rem',
                    background: 'rgba(255,255,255,0.75)',
                    border: 'none', cursor: 'pointer', color: '#44403c',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Image counter pill */}
            {product.images.length > 1 && (
              <div
                className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-stone-500"
                style={{ background: 'rgba(255,255,255,0.8)', fontSize: '0.65rem', fontWeight: 500 }}
              >
                {currentImageIndex + 1} / {product.images.length}
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {product.images.length > 1 && (
            <div
              className="flex gap-2 p-3 overflow-x-auto"
              style={{ borderTop: '1px solid #e7ddd0', background: 'rgba(255,255,255,0.4)' }}
            >
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  style={{
                    flexShrink: 0, width: '3.5rem', height: '3.5rem',
                    overflow: 'hidden', borderRadius: '6px',
                    border: `2px solid ${i === currentImageIndex ? '#d97706' : 'transparent'}`,
                    opacity: i === currentImageIndex ? 1 : 0.5,
                    background: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.2s',
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ══ RIGHT — DETAILS PANEL ══ */}
        <div
          style={{
            padding: '2.25rem 2rem',
            overflowY: 'auto',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >

          {/* Category eyebrow */}
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#d97706', fontWeight: 600 }}>
            {product.subcategory?.replace(/-/g, ' ') || product.category}
          </div>

          {/* Name + short desc */}
          <div>
            <h2
              className="font-serif text-stone-900 mb-2"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, lineHeight: 1.2 }}
            >
              {product.name}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#78716c', lineHeight: 1.75 }}>
              {product.shortDescription}
            </p>
          </div>

          {/* Amber gradient divider */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, #d97706 0%, #fde68a 50%, transparent 100%)' }} />

          {/* Specs grid */}
          <div>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a29e', fontWeight: 600, marginBottom: '0.75rem' }}>
              Specifications
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              {specs.map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: '0.65rem 0.85rem',
                    background: '#fafaf9',
                    borderRadius: '8px',
                    border: '1px solid #e7e5e4',
                    borderLeft: '3px solid #d97706',
                  }}
                >
                  <div style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a8a29e', fontWeight: 600, marginBottom: '0.2rem' }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#1c1917', fontWeight: 600, textTransform: 'capitalize' }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a29e', fontWeight: 600, marginBottom: '0.5rem' }}>
              About this piece
            </p>
            <p style={{ fontSize: '0.82rem', color: '#78716c', lineHeight: 1.8 }}>
              {showFullDescription
                ? product.longDescription
                : `${product.longDescription.substring(0, 200)}...`}
            </p>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              style={{ marginTop: '0.35rem', fontSize: '0.75rem', color: '#d97706', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}
            >
              {showFullDescription ? 'Show less ↑' : 'Read more ↓'}
            </button>
          </div>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '0.2rem 0.65rem',
                    borderRadius: '999px',
                    background: '#fef3c7',
                    color: '#92400e',
                    fontSize: '0.65rem', fontWeight: 500,
                    letterSpacing: '0.06em',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: 600, letterSpacing: '0.08em' }}>
              Quantity
            </span>
            <div
              style={{
                display: 'flex', alignItems: 'center',
                border: '1.5px solid #e7e5e4', borderRadius: '8px', overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="hover:bg-stone-100 transition-colors"
                style={{ width: '2.2rem', height: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#44403c' }}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span style={{ width: '2.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#1c1917', fontWeight: 600 }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="hover:bg-stone-100 transition-colors"
                style={{ width: '2.2rem', height: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#44403c' }}
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto' }}>
            {/* Wishlist */}
            <button
              onClick={handleWishlistToggle}
              className="rounded-xl transition-all duration-200 flex items-center justify-center"
              style={{
                width: '3rem', height: '3rem', flexShrink: 0,
                background: wishlisted ? '#fee2e2' : '#f5f5f4',
                border: `1.5px solid ${wishlisted ? '#fca5a5' : '#e7e5e4'}`,
                color: wishlisted ? '#ef4444' : '#78716c',
                cursor: 'pointer',
              }}
            >
              <Heart className="w-4 h-4" style={{ fill: wishlisted ? 'currentColor' : 'none', strokeWidth: 2 }} />
            </button>

            {/* View Quote (if already in quote) */}
            {isInQuote(product.id) && !quoteAdded ? (
              <button
                onClick={() => navigate('/quote')}
                className="flex-1 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  height: '3rem',
                  background: '#d97706', color: 'white', border: 'none', cursor: 'pointer',
                  fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  boxShadow: '0 4px 16px rgba(217,119,6,0.35)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#d97706'; }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Quote</span>
              </button>
            ) : (
              <button
                onClick={handleAddToQuote}
                className="flex-1 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  height: '3rem',
                  background: quoteAdded ? '#065f46' : '#d97706',
                  color: 'white', border: 'none', cursor: 'pointer',
                  fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  boxShadow: quoteAdded
                    ? '0 4px 16px rgba(6,95,70,0.35)'
                    : '0 4px 16px rgba(217,119,6,0.35)',
                }}
                onMouseEnter={(e) => { if (!quoteAdded) (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
                onMouseLeave={(e) => { if (!quoteAdded) (e.currentTarget as HTMLElement).style.background = quoteAdded ? '#065f46' : '#d97706'; }}
              >
                {quoteAdded ? (
                  <><Check className="w-4 h-4" /><span>Added {quantity > 1 ? `×${quantity}` : ''}!</span></>
                ) : (
                  <><ShoppingBag className="w-4 h-4" /><span>Add to Quote{quantity > 1 ? ` (×${quantity})` : ''}</span></>
                )}
              </button>
            )}
          </div>
        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-stone-100"
          style={{
            width: '2.25rem', height: '2.25rem',
            background: 'rgba(255,255,255,0.9)',
            border: '1.5px solid #e7e5e4',
            color: '#78716c', cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <style>{`
        @keyframes colModalFade { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        @media (max-width: 640px) { .collection-modal-inner { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

export default CollectionModal;