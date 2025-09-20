import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products, getProductsBySubcategory, categories } from "../data/products";

const CollectionPage: React.FC = () => {
  const { category } = useParams();

  const filteredProducts = useMemo(() => {
    return category ? getProductsBySubcategory(category) : products;
  }, [category]);

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
            {category
              ? categories[category as keyof typeof categories] || "Products"
              : "All Products"}
          </h1>
          <p className="text-stone-600">
            Discover our curated collection of authentic Rajasthani handicrafts
          </p>
        </div>

        {/* Category Grid for main shop page */}
        {!category && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-stone-800 mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.entries(categories).map(([key, name]) => {
                const categoryProducts = getProductsBySubcategory(key);
                const sampleProduct = categoryProducts[0];
                return (
                  <Link
                    key={key}
                    to={`/collections/${key}`}
                    className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={
                          sampleProduct?.images[0] ||
                          "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg"
                        }
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {name}
                      </h3>
                      <p className="text-stone-200 text-sm">
                        {categoryProducts.length} items
                      </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : category ? (
            <div className="text-center py-16">
              <div className="text-stone-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">
                No products found
              </h3>
              <p className="text-stone-600">
                Try browsing other categories to see more products.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
