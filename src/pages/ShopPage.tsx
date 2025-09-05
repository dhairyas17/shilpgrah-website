import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Filter, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import {
  products,
  getProductsBySubcategory,
  categories,
} from "../data/products";

const ShopPage: React.FC = () => {
  const { category } = useParams();
  const [filters, setFilters] = useState({
    category: category || "",
    material: "",
    finish: "",
    priceRange: "",
    sortBy: "name",
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = category ? getProductsBySubcategory(category) : products;

    // Apply filters
    if (filters.material) {
      filtered = filtered.filter((product) =>
        product.material.toLowerCase().includes(filters.material.toLowerCase())
      );
    }
    if (filters.finish) {
      filtered = filtered.filter((product) =>
        product.finish.toLowerCase().includes(filters.finish.toLowerCase())
      );
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter(
        (product) =>
          product.priceRange.min >= min && product.priceRange.max <= max
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.priceRange.min - b.priceRange.min;
        case "price-high":
          return b.priceRange.max - a.priceRange.max;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [category, filters]);

  const materials = Array.from(new Set(products.map((p) => p.material)));
  const finishes = Array.from(new Set(products.map((p) => p.finish)));

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
                    to={`/shop/${key}`}
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div
            className={`lg:w-1/4 ${
              showFilters ? "block" : "hidden lg:block"
            } ${!category ? "hidden" : ""}`}
          >
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-stone-800">Filters</h3>
                <Filter className="w-5 h-5 text-stone-600" />
              </div>

              {/* Material Filter */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Material
                </label>
                <select
                  value={filters.material}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      material: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Materials</option>
                  {materials.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
              </div>

              {/* Finish Filter */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Finish
                </label>
                <select
                  value={filters.finish}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      finish: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Finishes</option>
                  {finishes.map((finish) => (
                    <option key={finish} value={finish}>
                      {finish}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Price Range (USD)
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Prices</option>
                  <option value="0-100">$0 - $100</option>
                  <option value="100-500">$100 - $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-5000">$1,000 - $5,000</option>
                  <option value="5000-99999">$5,000+</option>
                </select>
              </div>

              <button
                onClick={() =>
                  setFilters({
                    category: category || "",
                    material: "",
                    finish: "",
                    priceRange: "",
                    sortBy: "name",
                  })
                }
                className="w-full py-2 px-4 text-sm text-stone-600 hover:text-amber-600 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className={category ? "lg:w-3/4" : "w-full"}>
            {/* Toolbar */}
            <div
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 ${
                !category ? "hidden" : ""
              }`}
            >
              <div className="text-stone-600">
                Showing {filteredProducts.length} products
              </div>

              <div className="flex items-center space-x-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                {/* Sort By */}
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value,
                    }))
                  }
                  className="px-4 py-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
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
                  Try adjusting your filters to see more results.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
