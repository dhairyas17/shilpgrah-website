import React, { useState } from 'react';
import { Heart, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useQuote } from '../contexts/QuoteContext';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToQuote } = useQuote();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleAddAllToQuote = () => {
    wishlist.forEach(product => {
      addToQuote(product);
      removeFromWishlist(product.id);
    });
  };

  const handleMoveToQuote = (productId: string) => {
    const product = wishlist.find(p => p.id === productId);
    if (product) {
      addToQuote(product);
      handleRemove(productId);
    }
  };

  const handleRemove = (productId: string) => {
    setRemovingId(productId);
    setTimeout(() => {
      removeFromWishlist(productId);
      setRemovingId(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── BANNER ── */}
      <div
        className="relative bg-white border-b border-stone-100"
        style={{ paddingTop: '7.5rem', paddingBottom: '3rem' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #fffbf5 0%, #fff8ef 50%, #fdfaf5 100%)' }}
        />
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #d97706 30%, #fbbf24 70%, transparent 100%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-amber-700 font-semibold tracking-widest uppercase mb-2"
            style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}
          >
            Saved Pieces
          </p>
          <h1
            className="font-serif text-stone-900 mb-3"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.1 }}
          >
            Your Wishlist
          </h1>
          <div
            className="mx-auto mb-4"
            style={{ width: '3.5rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px' }}
          />
          <p className="text-stone-500 max-w-xl mx-auto leading-relaxed" style={{ fontSize: '0.9rem' }}>
            {wishlist.length > 0
              ? `${wishlist.length} beautiful ${wishlist.length === 1 ? 'piece' : 'pieces'} saved — move them to a quote to enquire with our export team.`
              : 'Browse our collections and save your favourite pieces to revisit later.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {wishlist.length > 0 ? (
          <>
            {/* ── TOP ACTION BAR ── */}
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 px-6 py-4 bg-white"
              style={{ borderRadius: '12px', border: '1.5px solid #f5f5f4', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            >
              <p className="text-stone-500" style={{ fontSize: '0.85rem' }}>
                <span className="font-bold text-stone-800" style={{ fontSize: '1rem' }}>{wishlist.length}</span>
                {' '}{wishlist.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200"
                  style={{ padding: '0.65rem 1.25rem', background: 'white', color: '#1c1917', fontSize: '0.82rem', textDecoration: 'none', border: '1.5px solid #e7e5e4' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#d97706'; (e.currentTarget as HTMLElement).style.color = '#d97706'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e7e5e4'; (e.currentTarget as HTMLElement).style.color = '#1c1917'; }}
                >
                  View Quote <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={handleAddAllToQuote}
                  className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200"
                  style={{ padding: '0.65rem 1.25rem', background: '#d97706', color: 'white', fontSize: '0.82rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(217,119,6,0.25)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add All to Quote
                </button>
              </div>
            </div>

            {/* ── PRODUCT GRID ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product, i) => (
                <div
                  key={product.id}
                  className="group bg-white flex flex-col overflow-hidden"
                  style={{
                    borderRadius: '14px',
                    border: '1.5px solid #f5f5f4',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                    animation: `fadeSlideUp 0.4s ease ${i * 0.07}s both`,
                    transition: 'box-shadow 0.25s ease, transform 0.25s ease, opacity 0.3s ease',
                    opacity: removingId === product.id ? 0 : 1,
                    transform: removingId === product.id ? 'scale(0.95)' : undefined,
                  }}
                  onMouseEnter={e => {
                    if (removingId !== product.id) {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  {/* ── Large Thumbnail ── */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#f5f0e8' }}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Dark gradient on hover for bottom CTA visibility */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.1) 45%, transparent 70%)' }}
                    />

                    {/* Remove — top right */}
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="absolute top-3 right-3 flex items-center justify-center rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                      style={{
                        width: '2rem', height: '2rem',
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none', cursor: 'pointer', color: '#78716c',
                        backdropFilter: 'blur(6px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ef4444'; (e.currentTarget as HTMLElement).style.background = 'white'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#78716c'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)'; }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    {/* Category pill — top left */}
                    <div
                      className="absolute top-3 left-3"
                      style={{
                        padding: '0.25rem 0.7rem',
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: '999px',
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        color: '#92400e',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        backdropFilter: 'blur(6px)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                      }}
                    >
                      {product.category}
                    </div>

                    {/* Move to Quote CTA — slides up on hover */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ transform: 'translateY(6px)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                    >
                      <button
                        onClick={() => handleMoveToQuote(product.id)}
                        className="w-full flex items-center justify-center gap-2 font-semibold rounded-lg"
                        style={{
                          padding: '0.65rem',
                          background: '#d97706',
                          color: 'white',
                          fontSize: '0.78rem',
                          border: 'none',
                          cursor: 'pointer',
                          letterSpacing: '0.04em',
                          boxShadow: '0 4px 20px rgba(217,119,6,0.45)',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; }}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Move to Quote
                      </button>
                    </div>
                  </div>

                  {/* ── Card Body ── */}
                  <div className="flex flex-col flex-1 p-5">
                    <h3
                      className="font-serif font-bold text-stone-800 mb-1.5 leading-snug"
                      style={{ fontSize: '1.05rem' }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-stone-400 mb-4 line-clamp-2 flex-1"
                      style={{ fontSize: '0.78rem', lineHeight: 1.6 }}
                    >
                      {product.shortDescription}
                    </p>

                    {/* Meta + heart remove */}
                    <div
                      className="flex items-center justify-between pt-4"
                      style={{ borderTop: '1px solid #f5f0e8' }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: '#d97706' }}
                        />
                        <span className="text-stone-500 font-medium" style={{ fontSize: '0.73rem' }}>{product.material}</span>
                        <span className="text-stone-300" style={{ fontSize: '0.73rem' }}>·</span>
                        <span className="text-stone-400" style={{ fontSize: '0.73rem' }}>{product.finish}</span>
                      </div>

                      <button
                        onClick={() => handleRemove(product.id)}
                        title="Remove from wishlist"
                        className="flex items-center justify-center rounded-full transition-all duration-200"
                        style={{ width: '2rem', height: '2rem', background: '#fef3c7', border: 'none', cursor: 'pointer', color: '#d97706' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fee2e2'; (e.currentTarget as HTMLElement).style.color = '#ef4444'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fef3c7'; (e.currentTarget as HTMLElement).style.color = '#d97706'; }}
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>

        ) : (

          /* ── EMPTY STATE ── */
          <div className="text-center py-24">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 mx-auto"
              style={{ background: '#fef3c7' }}
            >
              <Heart className="w-9 h-9 fill-current" style={{ color: '#d97706' }} />
            </div>
            <h3 className="font-serif font-bold text-stone-800 mb-3" style={{ fontSize: '1.75rem' }}>
              Your wishlist is empty
            </h3>
            <p className="text-stone-500 mb-8 max-w-md mx-auto leading-relaxed" style={{ fontSize: '0.9rem' }}>
              Start exploring our collections and save your favourite pieces to build your perfect wishlist.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200"
                style={{ padding: '0.85rem 2rem', background: '#d97706', color: 'white', fontSize: '0.85rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(217,119,6,0.3)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; }}
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200"
                style={{ padding: '0.85rem 2rem', background: 'white', color: '#1c1917', fontSize: '0.85rem', textDecoration: 'none', border: '1.5px solid #e7e5e4' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#d97706'; (e.currentTarget as HTMLElement).style.color = '#d97706'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e7e5e4'; (e.currentTarget as HTMLElement).style.color = '#1c1917'; }}
              >
                View Quote
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .group:hover .group-hover\\:opacity-100 { opacity: 1 !important; }
        .group:hover .group-hover\\:scale-105 { transform: scale(1.05); }
      `}</style>
    </div>
  );
};

export default WishlistPage;