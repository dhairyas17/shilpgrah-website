import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ShoppingBag, Search } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useQuote } from '../contexts/QuoteContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const { wishlist } = useWishlist();
  const { getTotalItems } = useQuote();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/shop' },
    { name: 'Collections', href: '/collection' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const isHome = location.pathname === '/';

  // Show header only at top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 lg:bg-transparent transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
    {/* 🔹 Always-visible Top Bar */}
    <div className="fixed top-0 left-0 right-0 z-50 bg-stone-900 text-white text-sm py-2 text-center">
      We are a world-class manufacturer & exporter of solid wood furniture
    </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between py-10">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/assets/shilpgrah_logo.png"
              alt="Shilpgrah Logo"
              className="h-24 sm:h-16 lg:h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const linkColor = isActive
                ? 'text-amber-800'
                : isHome
                ? 'text-black'
                : 'text-black';
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium hover:text-amber-700 transition-colors ${linkColor}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/wishlist"
              className={'p-2 relative hover:text-amber-700 transition-colors text-black'}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/quote"
              className={`p-2 relative hover:text-amber-700 transition-colors text-black`}
            >
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 transition-colors text-black hover:text-amber-700`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`lg:hidden absolute top-full left-0 right-0 ${
              isHome ? 'bg-white' : 'bg-black'
            } border-t border-stone-200 shadow-lg`}
          >
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const linkColor = isActive ? 'text-amber-800' : isHome ? 'text-black' : 'text-black';
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-medium hover:text-amber-700 ${linkColor}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex items-center space-x-4 pt-4 border-t border-stone-200">
                <Link
                  to="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 hover:text-amber-700 ${isHome ? 'text-black' : 'text-black'}`}
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist ({wishlist.length})</span>
                </Link>
                <Link
                  to="/quote"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 hover:text-amber-700 ${isHome ? 'text-black' : 'text-black'}`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Quote ({getTotalItems()})</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
