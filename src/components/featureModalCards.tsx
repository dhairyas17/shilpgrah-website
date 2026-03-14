import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types/Product';
import { useWishlist } from '../contexts/WishlistContext';
import { useQuote } from '../contexts/QuoteContext';
import ProductModal from './ProductModal';


interface ProductCardProps {
  product: Product;
  showHoverActions?: boolean; // 👈 toggle hover actions
}
const FeaturedProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToQuote } = useQuote();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ prevent card click
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ prevent card click
    addToQuote(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ prevent card click
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // onClick={() => setIsModalOpen(true)} 
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

export default FeaturedProductCard;
