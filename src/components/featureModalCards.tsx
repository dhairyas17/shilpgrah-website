import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types/Product';
import { useWishlist } from '../contexts/WishlistContext';
import { useQuote } from '../contexts/QuoteContext';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
  showHoverActions?: boolean;
}

const FeaturedProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered]     = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToQuote } = useQuote();
  const wishlisted = isInWishlist(product.id);

  return (
    <>
      <div
        className="group relative bg-white overflow-hidden cursor-pointer"
        style={{
          borderRadius: '2px',
          boxShadow: isHovered
            ? '0 24px 48px rgba(120,90,40,0.13), 0 4px 12px rgba(0,0,0,0.07)'
            : '0 2px 12px rgba(0,0,0,0.06)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* ── IMAGE ── */}
        <div className="relative overflow-hidden bg-stone-100" style={{ aspectRatio: '4/3' }}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{
              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            }}
          />

          {/* Gradient veil */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 35%, rgba(28,20,10,0.55) 100%)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.35s ease',
            }}
          />

          {/* Bestseller badge */}
          {product.isBestSeller && (
            <div
              className="absolute top-3 left-3 text-white font-medium tracking-widest uppercase px-2.5 py-1"
              style={{ background: '#b45309', fontSize: '0.6rem', letterSpacing: '0.15em' }}
            >
              Bestseller
            </div>
          )}

          {/* Wishlist — hover/active only */}
          <button
            onClick={e => { e.stopPropagation(); wishlisted ? removeFromWishlist(product.id) : addToWishlist(product); }}
            className="absolute top-3 right-3 rounded-full flex items-center justify-center fpc-wishlist"
            style={{
              width: '2.1rem', height: '2.1rem',
              background: wishlisted ? '#ef4444' : 'rgba(255,255,255,0.88)',
              color: wishlisted ? 'white' : '#78716c',
              border: 'none', cursor: 'pointer',
              opacity: isHovered || wishlisted ? 1 : 0,
              transform: isHovered || wishlisted ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            <Heart className="w-3.5 h-3.5" style={{ fill: wishlisted ? 'currentColor' : 'none', strokeWidth: 2 }} />
          </button>

          {/* Action bar — hover only on all screens */}
          <div
            className="absolute bottom-0 left-0 right-0 flex fpc-action-bar"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <button
              onClick={e => { e.stopPropagation(); setIsModalOpen(true); }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5"
              style={{
                background: 'rgba(255,255,255,0.95)', color: '#1c1917',
                fontSize: '0.65rem', fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                borderRight: '1px solid rgba(180,83,9,0.15)',
                border: 'none', cursor: 'pointer',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fffbeb'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.95)'; }}
            >
              <Eye className="w-3.5 h-3.5 text-amber-700" />
              <span>Quick View</span>
            </button>
            <button
              onClick={e => { e.stopPropagation(); addToQuote(product); }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5"
              style={{
                background: '#b45309', color: 'white',
                fontSize: '0.65rem', fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                border: 'none', cursor: 'pointer',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#92400e'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Quote</span>
            </button>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="p-5 fpc-content">
          <h3
            className="font-serif text-stone-800 mb-1.5 line-clamp-2 leading-snug"
            style={{
              fontSize: '1.05rem', fontWeight: 600,
              color: isHovered ? '#92400e' : '#1c1917',
              transition: 'color 0.2s',
            }}
          >
            {product.name}
          </h3>
          <p className="text-stone-500 text-sm mb-4 line-clamp-2 leading-relaxed" style={{ fontSize: '0.8rem' }}>
            {product.shortDescription}
          </p>

          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#d97706' }} />
            <span className="text-stone-500 text-xs font-medium tracking-wide">{product.material}</span>
            <span className="text-stone-300 text-xs">·</span>
            <span className="text-stone-400 text-xs">{product.finish}</span>
          </div>

          <div
            className="mt-4"
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, #d97706, #fbbf24, transparent)',
              transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        </div>
      </div>

      <ProductModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style>{`
        @media (max-width: 640px) {
          /* Hide action bar — tapping the card opens the modal */
          .fpc-action-bar { display: none !important; }
          /* Tighter content */
          .fpc-content { padding: 0.65rem 0.75rem 0.8rem !important; }
          .fpc-content h3 { font-size: 0.85rem !important; margin-bottom: 0.2rem !important; }
          .fpc-content p  { font-size: 0.72rem !important; margin-bottom: 0.35rem !important; }
        }
      `}</style>
    </>
  );
};

export default FeaturedProductCard;