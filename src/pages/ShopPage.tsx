import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCards';
import { products, getProductsBySubcategory, categories } from '../data/products';
import { ArrowLeft, LayoutGrid, Grid3X3 } from 'lucide-react';

const ShopPage: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'default' | 'name-asc' | 'name-desc'>('default');
  const [cols, setCols] = useState<3 | 4>(4);

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
    : 'Browse by Category';

  return (
    <div className="min-h-screen bg-gray-50 mt-3">

      {/* ── BANNER ── */}
      <div className="relative bg-white border-b border-stone-100" style={{ paddingTop: '7.5rem', paddingBottom: '3rem' }}>
        {/* Subtle warm gradient backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #fffbf5 0%, #fff8ef 50%, #fdfaf5 100%)' }}
        />

        {/* Top amber line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent 0%, #d97706 30%, #fbbf24 70%, transparent 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {category && (
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-1.5 mb-5 text-amber-700 hover:text-amber-900 transition-colors duration-200"
              style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Browse by Category
            </button>
          )}

          <p
            className="text-amber-700 font-semibold tracking-widest uppercase mb-2"
            style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}
          >
            {category ? 'Collection' : 'Our Workshop'}
          </p>

          <h1
            className="font-serif text-stone-900 mb-3"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.1 }}
          >
            {categoryTitle}
          </h1>

          {/* Amber accent under title */}
          <div
            className="mx-auto mt-4"
            style={{ width: '3.5rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px' }}
          />

          <p className="text-stone-500 mt-3 max-w-[700px] mx-auto leading-relaxed" style={{ fontSize: '0.9rem' }}>
            Explore our curated collection of authentic Rajasthani handicrafts, handpicked for quality and design.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── CATEGORY GRID ── */}
        {!category && (
          <section className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {Object.entries(categories).map(([key, name], i) => {
                const catProds = getProductsBySubcategory(key);
                const sample = catProds[0];
                return (
                  <Link
                    key={key}
                    to={`/shop/${key}`}
                    className="reveal group relative overflow-hidden bg-stone-100"
                    style={{
                      display: 'block',
                      aspectRatio: '3/4',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                      transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease',
                      animationDelay: `${i * 0.04}s`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(120,90,40,0.18)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
                    }}
                  >
                    {sample && (
                      <img
                        src={sample.images[0]}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ borderRadius: '12px' }}
                      />
                    )}

                    {/* gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, rgba(28,20,8,0.8) 0%, rgba(28,20,8,0.1) 55%, transparent 100%)',
                        borderRadius: '12px',
                      }}
                    />

                    {/* Amber top strip on hover */}
                    <div
                      className="absolute top-0 left-0 right-0 transition-all duration-300 group-hover:opacity-100 opacity-0"
                      style={{ height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '12px 12px 0 0' }}
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3
                        className="text-white font-serif font-semibold leading-tight mb-0.5"
                        style={{ fontSize: '1rem', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                      >
                        {name}
                      </h3>
                      <p
                        className="font-semibold tracking-wider uppercase"
                        style={{ fontSize: '0.6rem', color: '#fbbf24', letterSpacing: '0.14em' }}
                      >
                        {catProds.length} pieces
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── PRODUCT GRID ── */}
        {category && filteredProducts.length > 0 && (
          <section>
            {/* Toolbar */}
            <div
              className="flex items-center justify-between flex-wrap gap-3 mb-8 pb-5"
              style={{ borderBottom: '1.5px solid #e7e5e4' }}
            >
              <div>
                <span className="font-serif text-stone-700 font-semibold" style={{ fontSize: '1.1rem' }}>
                  {filteredProducts.length}
                </span>
                <span className="text-stone-400 ml-1.5" style={{ fontSize: '0.85rem' }}>pieces found</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="text-stone-600 text-sm border border-stone-200 rounded-lg focus:outline-none focus:border-amber-400 transition-colors"
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem', cursor: 'pointer', background: 'white' }}
                >
                  <option value="default">Sort: Default</option>
                  <option value="name-asc">Name A–Z</option>
                  <option value="name-desc">Name Z–A</option>
                </select>

                {/* Grid toggle */}
                <div className="flex rounded-lg overflow-hidden border border-stone-200">
                  {([4, 3] as const).map((c, i) => (
                    <button
                      key={c}
                      onClick={() => setCols(c)}
                      className="flex items-center justify-center transition-all duration-200"
                      style={{
                        width: '2.25rem', height: '2.25rem',
                        background: cols === c ? '#d97706' : 'white',
                        color: cols === c ? 'white' : '#78716c',
                        border: 'none', cursor: 'pointer',
                        borderRight: i === 0 ? '1px solid #e7e5e4' : 'none',
                      }}
                    >
                      {c === 3 ? <Grid3X3 className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gap: '1.5rem',
              }}
            >
              {filteredProducts.map((product, i) => (
                <div
                  key={product.id}
                  className="reveal"
                  style={{ animationDelay: `${(i % 8) * 0.05}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── EMPTY STATE ── */}
        {category && filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-5">🛋️</div>
            <h3 className="font-serif font-bold text-stone-800 text-2xl mb-2">No pieces found</h3>
            <p className="text-stone-500 text-sm mb-6">Try browsing other categories to discover more products.</p>
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
              style={{ background: '#d97706', color: 'white', border: 'none', cursor: 'pointer' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#d97706'; }}
            >
              <ArrowLeft className="w-4 h-4" /> Browse All Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;