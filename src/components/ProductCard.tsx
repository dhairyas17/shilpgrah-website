import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types/Product';
import { useWishlist } from '../contexts/WishlistContext';
import { useQuote } from '../contexts/QuoteContext';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToQuote } = useQuote();

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToQuote = () => {
    addToQuote(product);
  };

  return (
    <>
      <div
        className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)} 
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action Buttons */}
          <div className={`absolute bottom-4 left-4 right-4 flex justify-center space-x-2 transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-3 bg-white/90 text-stone-700 rounded-full hover:bg-white hover:text-amber-600 transition-colors shadow-lg backdrop-blur-sm"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`p-3 rounded-full transition-colors shadow-lg ${
                isInWishlist(product.id)
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white/90 text-stone-700 hover:bg-white hover:text-red-500 backdrop-blur-sm'
              }`}
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleAddToQuote}
              className="p-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors shadow-lg backdrop-blur-sm"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-stone-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-stone-600 text-sm mb-3 line-clamp-2">
            {product.shortDescription}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-stone-500">
              <span className="font-medium">{product.material}</span>
              <span className="mx-2">•</span>
              <span>{product.finish}</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-amber-600">
                ${product.priceRange.min} - ${product.priceRange.max}
              </div>
              <div className="text-xs text-stone-500">USD</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;