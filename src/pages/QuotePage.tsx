import React from 'react';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuote } from '../contexts/QuoteContext';

const QuotePage: React.FC = () => {
  const { quoteItems, updateQuantity, removeFromQuote, getTotalItems } = useQuote();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <ShoppingBag className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
            Your Quote Request
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            {quoteItems.length > 0 
              ? `You have ${getTotalItems()} ${getTotalItems() === 1 ? 'item' : 'items'} ready for quotation`
              : 'Add products to get a personalized quote from our team'
            }
          </p>
        </div>

        {quoteItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Quote Items */}
            <div className="lg:col-span-2 space-y-6">
              {quoteItems.map((item) => (
                <div key={item.product.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="md:w-32 md:h-32 aspect-square overflow-hidden rounded-lg flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-stone-800 mb-2">
                          {item.product.name}
                        </h3>
                        <p className="text-stone-600 mb-2">
                          {item.product.shortDescription}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-stone-500">
                          <span>{item.product.material}</span>
                          <span>•</span>
                          <span>{item.product.finish}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-stone-700">Quantity:</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Price Range */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-amber-600">
                            ${item.product.priceRange.min} - ${item.product.priceRange.max}
                          </div>
                          <div className="text-xs text-stone-500">per unit</div>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromQuote(item.product.id)}
                      className="text-red-500 hover:text-red-700 p-2 transition-colors self-start"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h3 className="text-xl font-semibold text-stone-800 mb-6">
                  Quote Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Total Items:</span>
                    <span className="font-medium">{getTotalItems()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Unique Products:</span>
                    <span className="font-medium">{quoteItems.length}</span>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-4 mb-6">
                  <p className="text-sm text-stone-600 mb-4">
                    Our team will provide you with:
                  </p>
                  <ul className="text-sm text-stone-600 space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Detailed pricing for each item</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Shipping costs and timeline</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Customization options</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Bulk discount opportunities</span>
                    </li>
                  </ul>
                </div>

                <Link
                  to="/quote-request"
                  className="w-full flex items-center justify-center space-x-2 bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-stone-300 text-8xl mb-8">🛒</div>
            <h3 className="text-2xl font-semibold text-stone-800 mb-4">
              Your quote request is empty
            </h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto">
              Browse our collections and add products to get a personalized quote from our export team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/wishlist"
                className="inline-flex items-center space-x-2 bg-white text-stone-800 px-8 py-4 rounded-lg font-semibold border border-stone-300 hover:bg-stone-50 transition-colors"
              >
                <span>View Wishlist</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotePage;