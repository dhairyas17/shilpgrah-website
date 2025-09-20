import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const images = [
  "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg",
  "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  "https://images.pexels.com/photos/358504/pexels-photo-358504.jpeg",
  "https://images.pexels.com/photos/2724746/pexels-photo-2724746.jpeg",
  "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
];

const GalleryPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-amber-600 to-amber-700 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
          Our Gallery
        </h1>
        <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
          Explore the craftsmanship and stories behind our authentic Rajasthani handicrafts.
        </p>
      </section>

      {/* Gallery Section */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              onClick={() => setSelectedIndex(idx)}
            >
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            className="absolute top-5 right-5 text-white p-2 rounded-full hover:bg-white/20 transition"
            onClick={() => setSelectedIndex(null)}
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-5 text-white p-2 rounded-full hover:bg-white/20 transition"
            onClick={handlePrev}
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={images[selectedIndex]}
            alt="Selected"
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
          />

          <button
            className="absolute right-5 text-white p-2 rounded-full hover:bg-white/20 transition"
            onClick={handleNext}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
