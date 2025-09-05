import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'Interior Designer',
      location: 'New York, USA',
      rating: 5,
      text: 'The quality and craftsmanship of Shilpgrah\'s furniture is absolutely exceptional. The dining set I ordered became the centerpiece of my client\'s home. The attention to detail is remarkable.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      name: 'James Mitchell',
      title: 'Hotel Chain Owner',
      location: 'London, UK',
      rating: 5,
      text: 'We\'ve furnished three of our luxury hotels with Shilpgrah\'s pieces. Guests constantly compliment the beautiful Rajasthani furniture. Their service and delivery are impeccable.',
      image: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg'
    },
    {
      name: 'Maria Santos',
      title: 'Art Collector',
      location: 'São Paulo, Brazil',
      rating: 5,
      text: 'Each piece tells a story of Indian heritage. The carved wall panels I purchased are not just decor - they\'re conversation starters. The shipping was careful and professional.',
      image: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-stone-800 mb-4">
            Trusted by Customers Worldwide
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our satisfied customers across the globe who have brought Rajasthani heritage into their spaces
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-amber-400/20">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-stone-600 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-stone-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-stone-600">
                    {testimonial.title}
                  </p>
                  <p className="text-xs text-stone-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-16 border-t border-stone-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-800 mb-1">4.9/5</div>
              <div className="text-sm text-stone-600">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-800 mb-1">99%</div>
              <div className="text-sm text-stone-600">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-800 mb-1">50+</div>
              <div className="text-sm text-stone-600">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-800 mb-1">1000+</div>
              <div className="text-sm text-stone-600">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;