import React from 'react';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, Package, Clock, Wrench, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuote } from '../contexts/QuoteContext';

const QuotePage: React.FC = () => {
  const { quoteItems, updateQuantity, removeFromQuote, getTotalItems } = useQuote();

  const perks = [
    { icon: Tag,     text: 'Detailed pricing for each item' },
    { icon: Package, text: 'Shipping costs and timeline' },
    { icon: Wrench,  text: 'Customization options available' },
    { icon: Clock,   text: 'Bulk discount opportunities' },
  ];

  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── BANNER ── */}
      <div className="relative bg-white border-b border-stone-100" style={{ paddingTop: '7.5rem', paddingBottom: '3rem' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #fffbf5 0%, #fff8ef 50%, #fdfaf5 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent 0%, #d97706 30%, #fbbf24 70%, transparent 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-700 font-semibold tracking-widest uppercase mb-2" style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}>
            Export Enquiry
          </p>
          <h1 className="font-serif text-stone-900 mb-3" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.1 }}>
            Your Quote Request
          </h1>
          <div className="mx-auto mb-4" style={{ width: '3.5rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px' }} />
          <p className="text-stone-500 max-w-xl mx-auto leading-relaxed" style={{ fontSize: '0.9rem' }}>
            {quoteItems.length > 0
              ? `${getTotalItems()} ${getTotalItems() === 1 ? 'item' : 'items'} ready for quotation — fill in your details to receive a personalised quote.`
              : 'Add products to get a personalised quote from our export team.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {quoteItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ── ITEMS LIST ── */}
            <div className="lg:col-span-2 space-y-4">
              {quoteItems.map((item, i) => (
                <div
                  key={item.product.id}
                  className="bg-white flex flex-col sm:flex-row gap-5 p-5"
                  style={{
                    borderRadius: '12px',
                    border: '1.5px solid #f5f5f4',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    animation: `fadeSlideUp 0.4s ease ${i * 0.06}s both`,
                  }}
                >
                  {/* Image */}
                  <div style={{ flexShrink: 0, width: '6rem', height: '6rem', borderRadius: '8px', overflow: 'hidden', background: '#f5f0e8' }}>
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-stone-800 mb-1 truncate" style={{ fontSize: '1.05rem' }}>
                      {item.product.name}
                    </h3>
                    <p className="text-stone-400 mb-3 line-clamp-1" style={{ fontSize: '0.78rem' }}>
                      {item.product.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#d97706', flexShrink: 0 }} />
                      <span className="text-stone-500 font-medium" style={{ fontSize: '0.75rem' }}>{item.product.material}</span>
                      <span className="text-stone-300" style={{ fontSize: '0.75rem' }}>·</span>
                      <span className="text-stone-400" style={{ fontSize: '0.75rem' }}>{item.product.finish}</span>
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center gap-3">
                      <span className="text-stone-500 font-medium" style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Qty</span>
                      <div className="flex items-center" style={{ border: '1.5px solid #e7e5e4', borderRadius: '8px', overflow: 'hidden' }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex items-center justify-center hover:bg-stone-100 transition-colors"
                          style={{ width: '2rem', height: '2rem', background: 'none', border: 'none', cursor: 'pointer', color: '#44403c' }}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-semibold text-stone-800" style={{ width: '2.25rem', textAlign: 'center', fontSize: '0.88rem' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex items-center justify-center hover:bg-stone-100 transition-colors"
                          style={{ width: '2rem', height: '2rem', background: 'none', border: 'none', cursor: 'pointer', color: '#44403c' }}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromQuote(item.product.id)}
                    className="self-start flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-red-50"
                    style={{ width: '2.2rem', height: '2.2rem', flexShrink: 0, border: '1.5px solid #e7e5e4', background: 'none', cursor: 'pointer', color: '#a8a29e' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#fca5a5'; (e.currentTarget as HTMLElement).style.color = '#ef4444'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e7e5e4'; (e.currentTarget as HTMLElement).style.color = '#a8a29e'; }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* ── SUMMARY SIDEBAR ── */}
            <div className="lg:col-span-1">
              <div className="bg-white sticky top-24" style={{ borderRadius: '12px', border: '1.5px solid #f5f5f4', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', overflow: 'hidden' }}>

                {/* Amber top bar */}
                <div style={{ height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)' }} />

                <div className="p-6">
                  <h3 className="font-serif font-bold text-stone-800 mb-5" style={{ fontSize: '1.15rem' }}>Quote Summary</h3>

                  {/* Counts */}
                  <div className="space-y-2 mb-5 pb-5" style={{ borderBottom: '1px solid #f5f0e8' }}>
                    {[
                      { label: 'Total Items', val: getTotalItems() },
                      { label: 'Unique Products', val: quoteItems.length },
                    ].map(row => (
                      <div key={row.label} className="flex items-center justify-between">
                        <span className="text-stone-500" style={{ fontSize: '0.82rem' }}>{row.label}</span>
                        <span className="font-bold text-stone-800" style={{ fontSize: '0.88rem' }}>{row.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Perks */}
                  <p className="font-semibold text-stone-700 mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    You'll receive
                  </p>
                  <ul className="space-y-2.5 mb-6">
                    {perks.map(({ icon: Icon, text }) => (
                      <li key={text} className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#fef3c7' }}>
                          <Icon className="w-3 h-3" style={{ color: '#d97706' }} />
                        </div>
                        <span className="text-stone-500" style={{ fontSize: '0.78rem' }}>{text}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/quote-request"
                    className="w-full flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200"
                    style={{ padding: '0.85rem', background: '#d97706', color: 'white', fontSize: '0.82rem', letterSpacing: '0.04em', textDecoration: 'none', boxShadow: '0 4px 16px rgba(217,119,6,0.3)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                  >
                    <span>Proceed to Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        ) : (

          /* ── EMPTY STATE ── */
          <div className="text-center py-20">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 mx-auto"
              style={{ background: '#fef3c7' }}
            >
              <ShoppingBag className="w-9 h-9" style={{ color: '#d97706' }} />
            </div>
            <h3 className="font-serif font-bold text-stone-800 mb-3" style={{ fontSize: '1.75rem' }}>Your quote is empty</h3>
            <p className="text-stone-500 mb-8 max-w-md mx-auto leading-relaxed" style={{ fontSize: '0.9rem' }}>
              Browse our collections and add products to get a personalised quote from our export team.
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
                to="/wishlist"
                className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200"
                style={{ padding: '0.85rem 2rem', background: 'white', color: '#1c1917', fontSize: '0.85rem', textDecoration: 'none', border: '1.5px solid #e7e5e4' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#d97706'; (e.currentTarget as HTMLElement).style.color = '#d97706'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e7e5e4'; (e.currentTarget as HTMLElement).style.color = '#1c1917'; }}
              >
                View Wishlist
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default QuotePage;