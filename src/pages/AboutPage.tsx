import React from 'react';
import { Award, Globe, Users, Truck, Heart, Star, CheckCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Master Craftsmen',
      description: 'Our skilled artisans have inherited techniques passed down through generations, ensuring authentic Rajasthani craftsmanship in every piece.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Exporting to 50+ countries with trusted shipping partners and customs expertise, bringing Rajasthani heritage worldwide.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Personalized Service',
      description: 'Dedicated support team for custom orders, bulk purchases, and personalized consultation for your specific needs.'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Secure Delivery',
      description: 'Professional packaging and insured shipping ensure your valuable handicrafts reach you in perfect condition.'
    }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Authenticity',
      description: 'Every piece is genuinely handcrafted by traditional artisans using time-honored techniques.'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Quality',
      description: 'We maintain the highest standards in material selection and craftsmanship quality.'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Trust',
      description: 'Building long-term relationships with customers through transparency and reliability.'
    }
  ];

  const milestones = [
    { year: '2013', event: 'Founded in Jodhpur, Rajasthan' },
    { year: '2018', event: 'Launched online presence' },
    { year: '2020', event: 'First international export to Europe' },
    { year: '2024', event: 'Reached 20+ countries worldwide' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="100%" height="100%" fill="url(#about-pattern)" />
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Our Heritage Story
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
            For nearly four decades, Shilpgrah has been the bridge between Rajasthan's master craftsmen 
            and discerning customers worldwide, sharing the soul of royal India through authentic handicrafts.
          </p>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-stone-800 mb-6">
                  Bringing Rajasthan's Royal Heritage to Your World
                </h2>
                <p className="text-xl text-stone-600 leading-relaxed mb-6">
                  Founded in 1985 in the heart of Jodhpur, Shilpgrah began as a small family business with a grand vision: 
                  to share the magnificent craftsmanship of Rajasthan with the world. What started as a local workshop has 
                  grown into a globally recognized name in authentic Indian handicrafts.
                </p>
                <p className="text-stone-600 leading-relaxed mb-6">
                  Each piece in our collection is carefully selected from skilled artisans across Rajasthan's historic cities - 
                  Jodhpur, Jaipur, Udaipur, and beyond. From the intricate Jali work of Jaisalmer to the mirror mosaics of Bikaner, 
                  we bring you authentic heritage craftsmanship that tells the story of royal India.
                </p>
                <p className="text-stone-600 leading-relaxed">
                  We don't just export products; we share stories, traditions, and the soul of Rajasthan. Every carved detail, 
                  every inlay pattern, every finish reflects centuries of artistic evolution and cultural heritage.
                </p>
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

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
              Why Choose Shilpgrah
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Our commitment to authenticity, quality, and customer satisfaction sets us apart in the global handicrafts market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Key milestones in our four-decade journey of bringing Rajasthani heritage to the world
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-amber-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="text-2xl font-bold text-amber-600 mb-2">{milestone.year}</div>
                      <div className="text-stone-800 font-medium">{milestone.event}</div>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-amber-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and global reach
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">12+</div>
              <div className="text-amber-100">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">13+</div>
              <div className="text-amber-100">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-amber-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">300+</div>
              <div className="text-amber-100">Unique Products</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-6">
            Ready to Experience Authentic Rajasthani Craftsmanship?
          </h2>
          <p className="text-xl text-stone-600 mb-8 leading-relaxed">
            Explore our collections and discover pieces that will bring the royal heritage of Rajasthan into your space.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/shop"
              className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse Our Collection
            </a>
            <a
              href="/contact"
              className="bg-white text-stone-800 px-8 py-4 rounded-lg font-semibold text-lg border border-stone-300 hover:bg-stone-50 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;