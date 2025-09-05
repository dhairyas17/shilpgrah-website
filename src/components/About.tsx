import React from 'react';
import { Award, Globe, Users, Truck } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Master Craftsmen',
      description: 'Our skilled artisans have inherited techniques passed down through generations'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Exporting to 50+ countries with trusted shipping and customs expertise'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Personalized Service',
      description: 'Dedicated support team for custom orders and bulk purchases'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Secure Delivery',
      description: 'Professional packaging and insured shipping for valuable handicrafts'
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-stone-800 mb-6">
                Bringing Rajasthan's Royal Heritage to Your World
              </h2>
              <p className="text-xl text-stone-600 leading-relaxed mb-6">
                For over three decades, Shilpgrah has been the bridge between Rajasthan's master craftsmen and discerning customers worldwide. We don't just export products; we share stories, traditions, and the soul of royal India.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Each piece in our collection is carefully selected from skilled artisans across Rajasthan's historic cities - Jodhpur, Jaipur, Udaipur, and beyond. From the intricate Jali work of Jaisalmer to the mirror mosaics of Bikaner, we bring you authentic heritage craftsmanship.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg"
                alt="Rajasthani craftsman at work"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-stone-200/30 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;