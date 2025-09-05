import React, { useState } from 'react';
import { CheckCircle, Send } from 'lucide-react';
import { useQuote } from '../contexts/QuoteContext';

const QuoteRequestPage: React.FC = () => {
  const { quoteItems, clearQuote } = useQuote();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    company: '',
    shippingPreference: 'sea',
    specialNotes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      clearQuote();
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-stone-50 pt-20 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white p-12 rounded-2xl shadow-lg">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-stone-800 mb-4">
              Quote Request Submitted!
            </h1>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Thank you for your interest in our Rajasthani handicrafts. Our export team will review your request and get back to you within 24 hours with a detailed quote.
            </p>
            <div className="bg-amber-50 p-4 rounded-lg mb-6">
              <p className="text-amber-800 text-sm">
                <strong>What happens next?</strong><br />
                Our team will email you a comprehensive quote including pricing, shipping costs, delivery timeline, and any customization options.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                Continue Shopping
              </a>
              <a
                href="/collections"
                className="bg-white text-stone-800 px-8 py-3 rounded-lg font-medium border border-stone-300 hover:bg-stone-50 transition-colors"
              >
                Browse Collections
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
            Request Your Quote
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Tell us about your requirements and we'll provide you with a detailed quote including pricing, shipping, and timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-stone-800 mb-6">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Preferences */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-stone-800 mb-6">
                  Shipping Preferences
                </h3>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Preferred Shipping Method
                  </label>
                  <select
                    name="shippingPreference"
                    value={formData.shippingPreference}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="sea">Sea Freight (Economical, 4-6 weeks)</option>
                    <option value="air">Air Freight (Fast, 1-2 weeks)</option>
                    <option value="express">Express Courier (Fastest, 3-5 days)</option>
                    <option value="custom">Custom/Special Requirements</option>
                  </select>
                </div>
              </div>

              {/* Special Notes */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-stone-800 mb-6">
                  Additional Information
                </h3>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Special Notes or Requirements
                  </label>
                  <textarea
                    name="specialNotes"
                    value={formData.specialNotes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Please include any specific requirements, customization needs, timeline constraints, or questions you may have..."
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-amber-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors"
              >
                <Send className="w-5 h-5" />
                <span>Submit Quote Request</span>
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-xl font-semibold text-stone-800 mb-6">
                Items for Quote
              </h3>
              
              {quoteItems.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {quoteItems.map((item) => (
                    <div key={item.product.id} className="flex space-x-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-stone-800 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-stone-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-stone-600 text-sm mb-6">
                  No items selected. Browse our products to add items for quotation.
                </p>
              )}

              <div className="border-t border-stone-200 pt-4">
                <p className="text-sm text-stone-600 mb-4">
                  What you'll receive:
                </p>
                <ul className="text-xs text-stone-600 space-y-2">
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Detailed pricing breakdown</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Shipping costs and timeline</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Customization options</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Professional product photos</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Export documentation guidance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequestPage;