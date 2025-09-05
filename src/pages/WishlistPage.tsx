import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useQuote } from '../contexts/QuoteContext';
import ProductCard from '../components/ProductCard';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToQuote } = useQuote();

  const handleAddAllToQuote = () => {
    wishlist.forEach(product => {
      addToQuote(product);
      removeFromWishlist(product.id); // ✅ remove after adding
    });
  };

  const handleMoveToQuote = (productId: string) => {
    const product = wishlist.find(p => p.id === productId);
    if (product) {
      addToQuote(product);
      removeFromWishlist(productId); // ✅ remove this single product
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
            Your Wishlist
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            {wishlist.length > 0 
              ? `You have ${wishlist.length} beautiful ${wishlist.length === 1 ? 'piece' : 'pieces'} saved for later`
              : 'Your collection of favorite pieces will appear here'
            }
          </p>
        </div>

        {wishlist.length > 0 ? (
          <>
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 p-6 bg-white rounded-lg shadow-md">
              <div className="text-stone-700">
                <span className="font-semibold">{wishlist.length}</span> items in your wishlist
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleAddAllToQuote}
                  className="flex items-center space-x-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add All to Quote</span>
                </button>
                <Link
                  to="/quote"
                  className="flex items-center space-x-2 bg-stone-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-stone-900 transition-colors"
                >
                  <span>View Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  {/* Move to Quote Button */}
                  <button
                    onClick={() => handleMoveToQuote(product.id)}
                    className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-md text-sm hover:bg-amber-700 shadow"
                  >
                    Move to Quote
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-stone-300 text-8xl mb-8">💝</div>
            <h3 className="text-2xl font-semibold text-stone-800 mb-4">
              Your wishlist is empty
            </h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto">
              Start exploring our collections and save your favorite pieces to build your perfect wishlist.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/collections"
                className="inline-flex items-center space-x-2 bg-white text-stone-800 px-8 py-4 rounded-lg font-semibold border border-stone-300 hover:bg-stone-50 transition-colors"
              >
                <span>Browse Collections</span>
              </Link>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {wishlist.length > 0 && (
          <div className="mt-16 pt-16 border-t border-stone-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-4">
                You Might Also Like
              </h3>
              <p className="text-stone-600">
                Discover more beautiful pieces from our collections
              </p>
            </div>
            <div className="text-center">
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 bg-stone-100 text-stone-800 px-6 py-3 rounded-lg font-medium hover:bg-stone-200 transition-colors"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
