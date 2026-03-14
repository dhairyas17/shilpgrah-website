import React from 'react';
import { Link } from 'react-router-dom';
import { categories, getProductsBySubcategory, topcategories } from '../data/products';

const ShopCategories: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-stone-800 mb-4">
            TOP VISITED CATEGORIES
          </h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
          Elevate business spaces into true luxury hospitality environments with premium furniture.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(topcategories).map(([key, name]) => {
            const categoryProducts = getProductsBySubcategory(key);
            const sampleProduct = categoryProducts[0];

            return (
              <Link
                key={key}
                to={`/shop/${key}`}
                className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={
                      sampleProduct?.images[0] ||
                      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg'
                    }
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">{name}</h3>
                  <p className="text-gray-200 text-sm">{categoryProducts.length} items</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopCategories;
