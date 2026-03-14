import React, { useState } from "react";
import { Product } from "../types/Product";
import { products, homecategories, CategoryKey } from "../data/products";
import FeaturedProductModal from "./FeaturedProductModal";
import { useWishlist } from "../contexts/WishlistContext";
import { useQuote } from "../contexts/QuoteContext";
import { Heart, ShoppingBag } from "lucide-react";

const bestSellerCategories: CategoryKey[] = ["bookshelf", "almirah"];

const BestSellers: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(bestSellerCategories[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToQuote, isInQuote } = useQuote();

  const filteredProducts = products.filter(
    (p) => p.subcategory === activeCategory && p.isBestSeller
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
          BESTSELLERS
        </h2>
        <p className="text-center text-lg text-stone-600 max-w-3xl mx-auto mb-12">
          Discover the pieces that have captured hearts and adorned homes worldwide.
        </p>

        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          {bestSellerCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`uppercase tracking-wide text-sm font-medium pb-1 border-b-2 transition ${
                activeCategory === cat
                  ? "border-stone-900 text-stone-900"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              {homecategories[cat]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group space-y-4">
              <div
                className="cursor-pointer aspect-[3/4] rounded-lg overflow-hidden bg-stone-100 shadow-md"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <p className="text-center text-stone-800 font-medium">{product.name}</p>

              <div className="flex justify-center gap-2">
                {/* Wishlist */}
                <button
                  onClick={() =>
                    isInWishlist(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product)
                  }
                  className={`p-2 rounded-full border ${
                    isInWishlist(product.id)
                      ? "bg-red-500 text-white"
                      : "bg-stone-100 text-stone-600"
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>

                {/* Quote */}
                <button
                  onClick={() => addToQuote(product)}
                  className={`p-2 rounded-full border ${
                    isInQuote(product.id)
                      ? "bg-amber-600 text-white"
                      : "bg-stone-100 text-stone-600"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <FeaturedProductModal
            product={selectedProduct}
            isOpen={true}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </section>
  );
};

export default BestSellers;
