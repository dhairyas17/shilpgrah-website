import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
// import Collections from '../components/Collections';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <About />
      <FeaturedProducts />
      <Testimonials />
      {/* <Newsletter /> */}
    </div>
  );
};

export default HomePage;