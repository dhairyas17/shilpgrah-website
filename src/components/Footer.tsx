import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-amber-400">Shilpgrah</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              Exporting the finest Rajasthani handicrafts to the world. Our artisans create masterpieces that carry the heritage and soul of Rajasthan.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-stone-300 hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="/shop" className="text-stone-300 hover:text-amber-400 transition-colors">Shop</a></li>
              <li><a href="/collections" className="text-stone-300 hover:text-amber-400 transition-colors">Collections</a></li>
              <li><a href="#about" className="text-stone-300 hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="/quote-request" className="text-stone-300 hover:text-amber-400 transition-colors">Get Quote</a></li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Our Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/collections/furniture" className="text-stone-300 hover:text-amber-400 transition-colors">Furniture</a></li>
              <li><a href="/collections/decor" className="text-stone-300 hover:text-amber-400 transition-colors">Home Decor</a></li>
              <li><a href="/collections/textiles" className="text-stone-300 hover:text-amber-400 transition-colors">Textiles</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-stone-300">
                  Jodhpur, Rajasthan, India<br />
                  342001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-stone-300">+91 7014318581</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-stone-300">info@shilpgrah.com</span>
                <span className="text-stone-300">mihir@shilpgrah.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-stone-400">
              © 2024 Shilpgrah. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-xs text-stone-400">
              <span>Handicrafts Export Council Member</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;