import React, { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products, getProductsBySubcategory, categories } from "../data/products";

const ShopPage: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    return category ? getProductsBySubcategory(category) : products;
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Back Button */}
        {category && (
          <button
            onClick={() => navigate(-1)}
            className="absolute top-0 left-0 mt-4 ml-4 flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors shadow"
          >
            ← Back
          </button>
        )}

        {/* Header Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
            {category ? categories[category as keyof typeof categories] || "Products" : "All Products"}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of authentic Rajasthani handicrafts, handpicked for quality and design.
          </p>
        </div>

        {/* Category Grid */}
        {!category && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.entries(categories).map(([key, name]) => {
                const categoryProducts = getProductsBySubcategory(key);
                const sampleProduct = categoryProducts[0];
                return (
                  <Link
                    key={key}
                    to={`/shop/${key}`}
                    className="group relative bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={
                          sampleProduct?.images[0] ||
                          "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg"
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
        )}

        {/* Products Grid */}
        <div className="w-full">
          {category && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : category ? (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">🛒</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try browsing other categories to discover more products.
              </p>
              <button
                onClick={() => navigate(-1)}
                className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
