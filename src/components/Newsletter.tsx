import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-amber-600 to-amber-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              Stay Connected with Heritage
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Get exclusive access to new collections, artisan stories, and special export offers. 
              Join our community of heritage enthusiasts worldwide.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="max-w-lg mx-auto">
            {isSubmitted ? (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30">
                <div className="text-white text-lg font-medium">
                  Thank you for subscribing! 🎉
                </div>
                <div className="text-amber-100 text-sm mt-2">
                  You'll receive our latest updates and exclusive offers.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 rounded-lg text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="group bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <p className="text-amber-100 text-sm">
                  By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">New Collections</div>
              <div className="text-amber-100 text-sm">Be first to see latest pieces</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">Artisan Stories</div>
              <div className="text-amber-100 text-sm">Behind-the-scenes insights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">Exclusive Offers</div>
              <div className="text-amber-100 text-sm">Special pricing for subscribers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;