import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCards';
import { products, getProductsBySubcategory, categories } from '../data/products';
import { LayoutGrid, Grid3X3, ChevronRight } from 'lucide-react';

const ShopPage: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'default' | 'name-asc' | 'name-desc'>('default');
  const [cols, setCols] = useState<3 | 4>(3);

  const rawProducts = useMemo(
    () => (category ? getProductsBySubcategory(category) : products),
    [category]
  );

  const filteredProducts = useMemo(() => {
    const list = [...rawProducts];
    if (sortBy === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'name-desc') list.sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [rawProducts, sortBy]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredProducts]);

  const categoryTitle = category
    ? (categories[category as keyof typeof categories] || 'Products')
    : 'All Products';

  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── BANNER ── */}
      <div className="relative bg-white border-b border-stone-100" style={{ paddingTop: '7.5rem', paddingBottom: '2.5rem' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #fffbf5 0%, #fff8ef 50%, #fdfaf5 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent 0%, #d97706 30%, #fbbf24 70%, transparent 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-700 font-semibold tracking-widest uppercase mb-2" style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}>
            {category ? 'Category' : 'Our Workshop'}
          </p>
          <h1 className="font-serif text-stone-900 mb-3" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.1 }}>
            {category ? categoryTitle : 'All Products'}
          </h1>
          <div className="mx-auto mb-4" style={{ width: '3.5rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px' }} />
          <p className="text-stone-500 max-w-xl mx-auto leading-relaxed" style={{ fontSize: '0.9rem' }}>
            Explore our curated collection of authentic Rajasthani handicrafts, handpicked for quality and design.
          </p>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">

          {/* ══ LEFT SIDEBAR ══ */}
          <aside style={{ width: '220px', flexShrink: 0 }}>
            <div className="sticky top-28">

              {/* Sidebar header */}
              <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '2px solid #f5f0e8' }}>
                <div style={{ width: '1.5rem', height: '2px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '1px' }} />
                <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d97706', fontFamily: 'system-ui, sans-serif' }}>
                  Categories
                </span>
              </div>

              {/* All Products link */}
              <Link
                to="/shop"
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.6rem 0.85rem', borderRadius: '8px', marginBottom: '2px',
                    background: !category ? '#fef3c7' : 'transparent',
                    border: `1px solid ${!category ? '#fde68a' : 'transparent'}`,
                    transition: 'all 0.15s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { if (category) (e.currentTarget as HTMLElement).style.background = '#fafaf9'; }}
                  onMouseLeave={e => { if (category) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <span style={{ fontSize: '0.82rem', fontWeight: !category ? 700 : 500, color: !category ? '#92400e' : '#57534e', fontFamily: 'system-ui, sans-serif' }}>
                    All Products
                  </span>
                  <span style={{ fontSize: '0.68rem', color: !category ? '#d97706' : '#a8a29e', fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                    {products.length}
                  </span>
                </div>
              </Link>

              {/* Category links */}
              {Object.entries(categories).map(([key, name]) => {
                const count = getProductsBySubcategory(key).length;
                const active = category === key;
                return (
                  <Link key={key} to={`/shop/${key}`} style={{ textDecoration: 'none' }}>
                    <div
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.6rem 0.85rem', borderRadius: '8px', marginBottom: '2px',
                        background: active ? '#fef3c7' : 'transparent',
                        border: `1px solid ${active ? '#fde68a' : 'transparent'}`,
                        transition: 'all 0.15s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = '#fafaf9'; }}
                      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {active && <div style={{ width: '3px', height: '14px', background: '#d97706', borderRadius: '2px', flexShrink: 0 }} />}
                        <span style={{ fontSize: '0.82rem', fontWeight: active ? 700 : 500, color: active ? '#92400e' : '#57534e', fontFamily: 'system-ui, sans-serif' }}>
                          {name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.68rem', color: active ? '#d97706' : '#a8a29e', fontFamily: 'system-ui, sans-serif', fontWeight: 600 }}>
                        {count}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* ══ RIGHT CONTENT ══ */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* All products grid (no category selected) */}
            {!category && filteredProducts.length > 0 && (
              <>
                {/* Toolbar */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-4" style={{ borderBottom: '1.5px solid #e7e5e4' }}>
                  <div>
                    <span className="font-serif text-stone-700 font-semibold" style={{ fontSize: '1.1rem' }}>{filteredProducts.length}</span>
                    <span className="text-stone-400 ml-1.5" style={{ fontSize: '0.85rem' }}>pieces found</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                      className="text-stone-600 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-400 transition-colors"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem', cursor: 'pointer', background: 'white' }}>
                      <option value="default">Sort: Default</option>
                      <option value="name-asc">Name A–Z</option>
                      <option value="name-desc">Name Z–A</option>
                    </select>
                    <div className="flex rounded-lg overflow-hidden border border-stone-200">
                      {([4, 3] as const).map((c, i) => (
                        <button key={c} onClick={() => setCols(c)}
                          style={{ width: '2.25rem', height: '2.25rem', background: cols === c ? '#d97706' : 'white', color: cols === c ? 'white' : '#78716c', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: i === 0 ? '1px solid #e7e5e4' : 'none', transition: 'all 0.2s' }}>
                          {c === 3 ? <Grid3X3 className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: '1.25rem' }}>
                  {filteredProducts.map((product, i) => (
                    <div key={product.id} className="reveal" style={{ animationDelay: `${(i % 8) * 0.05}s` }}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Product grid (category selected) */}
            {category && filteredProducts.length > 0 && (
              <>
                {/* Toolbar */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-4" style={{ borderBottom: '1.5px solid #e7e5e4' }}>
                  <div>
                    <span className="font-serif text-stone-700 font-semibold" style={{ fontSize: '1.1rem' }}>{filteredProducts.length}</span>
                    <span className="text-stone-400 ml-1.5" style={{ fontSize: '0.85rem' }}>pieces found</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                      className="text-stone-600 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-400 transition-colors"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem', cursor: 'pointer', background: 'white' }}>
                      <option value="default">Sort: Default</option>
                      <option value="name-asc">Name A–Z</option>
                      <option value="name-desc">Name Z–A</option>
                    </select>
                    <div className="flex rounded-lg overflow-hidden border border-stone-200">
                      {([4, 3] as const).map((c, i) => (
                        <button key={c} onClick={() => setCols(c)}
                          style={{ width: '2.25rem', height: '2.25rem', background: cols === c ? '#d97706' : 'white', color: cols === c ? 'white' : '#78716c', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: i === 0 ? '1px solid #e7e5e4' : 'none', transition: 'all 0.2s' }}>
                          {c === 3 ? <Grid3X3 className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: '1.25rem' }}>
                  {filteredProducts.map((product, i) => (
                    <div key={product.id} className="reveal" style={{ animationDelay: `${(i % 8) * 0.05}s` }}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Empty state */}
            {category && filteredProducts.length === 0 && (
              <div className="text-center py-24">
                <div className="text-5xl mb-5">🛋️</div>
                <h3 className="font-serif font-bold text-stone-800 text-2xl mb-2">No pieces found</h3>
                <p className="text-stone-500 text-sm mb-6">Try browsing other categories.</p>
                <button onClick={() => navigate('/shop')}
                  style={{ padding: '0.75rem 1.75rem', background: '#d97706', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; }}>
                  Browse All Categories
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;