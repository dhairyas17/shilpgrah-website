import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types/Product';
import { useWishlist } from '../contexts/WishlistContext';
import { useQuote } from '../contexts/QuoteContext';
import { useNavigate } from 'react-router-dom';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToQuote, isInQuote } = useQuote();
  const navigate = useNavigate();

  if (!isOpen) return null;

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 text-stone-600 rounded-full hover:bg-white hover:text-stone-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 text-stone-600 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 text-stone-600 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? 'border-amber-500' : 'border-stone-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-800 mb-2">
                {product.name}
              </h2>
              <p className="text-stone-600 text-lg">
                {product.shortDescription}
              </p>
            </div>

            {/* Price Range */}
            {/* <div className="bg-amber-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">
                ${product.priceRange.min} - ${product.priceRange.max} USD
              </div>
              <div className="text-sm text-stone-600 mt-1">
                Price varies based on customization and quantity
              </div>
            </div> */}

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-stone-800">Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-stone-700">Material:</span>
                  <span className="text-stone-600 ml-2">{product.material}</span>
                </div>
                <div>
                  <span className="font-medium text-stone-700">Finish:</span>
                  <span className="text-stone-600 ml-2">{product.finish}</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium text-stone-700">Dimensions:</span>
                  <span className="text-stone-600 ml-2">
                    {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} {product.dimensions.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-stone-800">Description</h3>
              <div className="text-stone-600 leading-relaxed">
                {showFullDescription ? (
                  <div>
                    {product.longDescription}
                    <button
                      onClick={() => setShowFullDescription(false)}
                      className="text-amber-600 hover:text-amber-700 ml-2 font-medium"
                    >
                      Show less
                    </button>
                  </div>
                ) : (
                  <div>
                    {product.longDescription.substring(0, 200)}...
                    <button
                      onClick={() => setShowFullDescription(true)}
                      className="text-amber-600 hover:text-amber-700 ml-2 font-medium"
                    >
                      Read more
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-colors ${
                  isInWishlist(product.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                <span>{isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
              </button>

              {/* Quote Button */}
              {isInQuote(product.id) ? (
                <button
                  onClick={() => navigate('/quote')}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>View Quote</span>
                </button>
              ) : (
                <button
                  onClick={handleAddToQuote}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Quote</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
