import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
// import Collections from '../components/Collections';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import ShopCategories from '../components/ShopCategories';
import BestSellers from '../components/Bestsellers';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <About />
      <FeaturedProducts />
      <ShopCategories /> 
      <BestSellers /> 
      <Testimonials />
      {/* <Newsletter /> */}
    </div>
  );
};

export default HomePage;