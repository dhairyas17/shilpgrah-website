import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-top sm:bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/background.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">


          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight">
            Shilpgrah
            <span className="block text-amber-400">Crafted for the World</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-2xl text-stone-200 mb-6 sm:mb-8 max-w-2xl sm:max-w-4xl  leading-relaxed">
            Discover exquisite handcrafted furniture from the royal state of Rajasthan. 
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
            <Link
              to="/shop"
              className="group inline-flex items-center space-x-2 bg-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <span>View products</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/quote-request"
              className="group inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-300"
            >
              <span>Get Custom Quote</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 sm:mt-16 pt-10 sm:pt-16 border-t border-white/20">
            <div className="text-center">
              <div className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-400 mb-1 sm:mb-2">300+</div>
              <div className="text-stone-300 text-xs sm:text-base">Unique Products</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-400 mb-1 sm:mb-2">20+</div>
              <div className="text-stone-300 text-xs sm:text-base">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-400 mb-1 sm:mb-2">500+</div>
              <div className="text-stone-300 text-xs sm:text-base">Happy Customers</div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-7 h-12 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-4 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
