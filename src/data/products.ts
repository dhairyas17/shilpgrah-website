import { Product } from '../types/Product';

// Helper function to generate products for each category
const generateProducts = (category: string, subcategory: string, baseProducts: Partial<Product>[]): Product[] => {
  return baseProducts.map((base, index) => ({
    id: `${category}-${subcategory}-${index + 1}`,
    name: base.name || `${subcategory} ${index + 1}`,
    shortDescription: base.shortDescription || `Premium ${subcategory.toLowerCase()} with traditional Rajasthani craftsmanship`,
    longDescription: base.longDescription || `This exquisite ${subcategory.toLowerCase()} showcases the finest craftsmanship of Rajasthani artisans. Hand-carved from premium wood with traditional motifs and patterns that reflect the rich heritage of royal Rajasthan. Each piece is unique and tells a story of ancient craftsmanship passed down through generations.`,
    category,
    subcategory: subcategory.toLowerCase().replace(/\s+/g, '-'),
    images: base.images || [
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    material: base.material || 'Teak Wood',
    finish: base.finish || 'Natural Polish',
    dimensions: base.dimensions || {
      length: 120 + (index * 10),
      width: 60 + (index * 5),
      height: 75 + (index * 3),
      unit: 'cm'
    },
    priceRange: base.priceRange || {
      min: 500 + (index * 100),
      max: 800 + (index * 150),
      currency: 'USD'
    },
    featured: index < 3,
    tags: base.tags || ['handcrafted', 'rajasthani', 'traditional', subcategory.toLowerCase()]
  }));
};

// Table products
const tableProducts = generateProducts('furniture', 'Table', [
  { name: 'Royal Dining Table', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 800, max: 1200, currency: 'USD' }, images: ['/assets/tables/1.png'] },
  { name: 'Maharaja Conference Table', material: 'Rosewood', finish: 'Natural Polish', priceRange: { min: 1200, max: 1800, currency: 'USD' }, images: ['/assets/tables/2.png'] },
  { name: 'Carved Center Table', material: 'Sheesham Wood', finish: 'Antique', priceRange: { min: 600, max: 900, currency: 'USD' }, images: ['/assets/tables/3.png'] },
  { name: 'Jali Work Dining Table', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 700, max: 1000, currency: 'USD' }, images: ['/assets/tables/4.png'] },
  { name: 'Inlay Work Table', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 900, max: 1300, currency: 'USD' }, images: ['/assets/tables/5.png'] },
  { name: 'Traditional Round Table', material: 'Rosewood', finish: 'Matt', priceRange: { min: 650, max: 950, currency: 'USD' }, images: ['/assets/tables/6.png'] },
  { name: 'Palace Style Table', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 1100, max: 1600, currency: 'USD' }, images: ['/assets/tables/7.png'] },
  { name: 'Carved Leg Table', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 750, max: 1100, currency: 'USD' }, images: ['/assets/tables/8.png'] },
  { name: 'Brass Inlay Table', material: 'Mango Wood', finish: 'Antique', priceRange: { min: 850, max: 1250, currency: 'USD' }, images: ['/assets/tables/9.png'] },
  { name: 'Heritage Dining Table', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 950, max: 1400, currency: 'USD' }, images: ['/assets/tables/10.png'] },
  { name: 'Royal Feast Table', material: 'Rosewood', finish: 'Natural', priceRange: { min: 1000, max: 1500, currency: 'USD' }, images: ['/assets/tables/11.png'] },
  { name: 'Carved Border Table', material: 'Sheesham Wood', finish: 'Matt', priceRange: { min: 700, max: 1000, currency: 'USD' }, images: ['/assets/tables/12.png'] },
  { name: 'Lotus Motif Table', material: 'Mango Wood', finish: 'High Gloss', priceRange: { min: 800, max: 1200, currency: 'USD' }, images: ['/assets/tables/13.png'] },
  { name: 'Peacock Design Table', material: 'Teak Wood', finish: 'Natural Polish', priceRange: { min: 900, max: 1350, currency: 'USD' }, images: ['/assets/tables/14.png'] },
  { name: 'Elephant Carved Table', material: 'Rosewood', finish: 'Antique', priceRange: { min: 1050, max: 1550, currency: 'USD' }, images: ['/assets/tables/15.png'] },
  { name: 'Floral Pattern Table', material: 'Sheesham Wood', finish: 'Polished', priceRange: { min: 750, max: 1100, currency: 'USD' }, images: ['/assets/tables/16.png'] },
  { name: 'Geometric Design Table', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 650, max: 950, currency: 'USD' }, images: ['/assets/tables/17.png'] },
  { name: 'Mirror Work Table', material: 'Teak Wood', finish: 'Matt', priceRange: { min: 850, max: 1250, currency: 'USD' }, images: ['/assets/tables/18.png'] },
  { name: 'Traditional Jharokha Table', material: 'Rosewood', finish: 'High Gloss', priceRange: { min: 1150, max: 1650, currency: 'USD' }, images: ['/assets/tables/19.png'] },
  { name: 'Rajasthani Palace Table', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 950, max: 1400, currency: 'USD' }, images: ['/assets/tables/20.png'] }
]);
// Sofa Cum Beds
const sofaCumBedProducts = generateProducts('furniture', 'Sofa Cum Bed', [
  { name: 'Royal Sofa Cum Bed', material: 'Teak Wood', finish: 'Fabric Upholstery', priceRange: { min: 1200, max: 1800, currency: 'USD' }, images: ['/assets/sofa-cum-bed/1.png'] },
  { name: 'Maharaja Daybed', material: 'Rosewood', finish: 'Leather Upholstery', priceRange: { min: 1500, max: 2200, currency: 'USD' }, images: ['/assets/sofa-cum-bed/2.png'] },
  { name: 'Carved Sofa Bed', material: 'Sheesham Wood', finish: 'Cotton Upholstery', priceRange: { min: 1000, max: 1500, currency: 'USD' }, images: ['/assets/sofa-cum-bed/3.png'] },
  { name: 'Jali Work Daybed', material: 'Mango Wood', finish: 'Silk Upholstery', priceRange: { min: 1100, max: 1600, currency: 'USD' }, images: ['/assets/sofa-cum-bed/4.png'] },
  { name: 'Inlay Sofa Cum Bed', material: 'Teak Wood', finish: 'Velvet Upholstery', priceRange: { min: 1300, max: 1900, currency: 'USD' }, images: ['/assets/sofa-cum-bed/5.png'] },
  { name: 'Traditional Diwan', material: 'Rosewood', finish: 'Fabric Upholstery', priceRange: { min: 950, max: 1400, currency: 'USD' }, images: ['/assets/sofa-cum-bed/6.png'] },
  { name: 'Palace Style Daybed', material: 'Teak Wood', finish: 'Leather Upholstery', priceRange: { min: 1600, max: 2300, currency: 'USD' }, images: ['/assets/sofa-cum-bed/7.png'] },
  { name: 'Carved Leg Sofa Bed', material: 'Sheesham Wood', finish: 'Cotton Upholstery', priceRange: { min: 1050, max: 1550, currency: 'USD' }, images: ['/assets/sofa-cum-bed/8.png'] },
  { name: 'Brass Inlay Daybed', material: 'Mango Wood', finish: 'Silk Upholstery', priceRange: { min: 1250, max: 1800, currency: 'USD' }, images: ['/assets/sofa-cum-bed/9.png'] },
  { name: 'Heritage Sofa Cum Bed', material: 'Teak Wood', finish: 'Velvet Upholstery', priceRange: { min: 1400, max: 2000, currency: 'USD' }, images: ['/assets/sofa-cum-bed/10.png'] },
  { name: 'Royal Chaise Lounge', material: 'Rosewood', finish: 'Fabric Upholstery', priceRange: { min: 1350, max: 1950, currency: 'USD' }, images: ['/assets/sofa-cum-bed/11.png'] },
  { name: 'Carved Border Daybed', material: 'Sheesham Wood', finish: 'Leather Upholstery', priceRange: { min: 1150, max: 1650, currency: 'USD' }, images: ['/assets/sofa-cum-bed/12.png'] },
  { name: 'Lotus Motif Sofa Bed', material: 'Mango Wood', finish: 'Cotton Upholstery', priceRange: { min: 1200, max: 1700, currency: 'USD' }, images: ['/assets/sofa-cum-bed/13.png'] },
  { name: 'Peacock Design Daybed', material: 'Teak Wood', finish: 'Silk Upholstery', priceRange: { min: 1450, max: 2050, currency: 'USD' }, images: ['/assets/sofa-cum-bed/14.png'] },
  { name: 'Elephant Carved Sofa Bed', material: 'Rosewood', finish: 'Velvet Upholstery', priceRange: { min: 1550, max: 2200, currency: 'USD' }, images: ['/assets/sofa-cum-bed/15.png'] },
  { name: 'Floral Pattern Daybed', material: 'Sheesham Wood', finish: 'Fabric Upholstery', priceRange: { min: 1100, max: 1600, currency: 'USD' }, images: ['/assets/sofa-cum-bed/16.png'] },
  { name: 'Geometric Design Sofa Bed', material: 'Mango Wood', finish: 'Leather Upholstery', priceRange: { min: 1000, max: 1500, currency: 'USD' }, images: ['/assets/sofa-cum-bed/17.png'] },
  { name: 'Mirror Work Daybed', material: 'Teak Wood', finish: 'Cotton Upholstery', priceRange: { min: 1300, max: 1850, currency: 'USD' }, images: ['/assets/sofa-cum-bed/18.png'] },
  { name: 'Traditional Jharokha Sofa Bed', material: 'Rosewood', finish: 'Silk Upholstery', priceRange: { min: 1650, max: 2350, currency: 'USD' }, images: ['/assets/sofa-cum-bed/19.png'] },
  { name: 'Rajasthani Palace Daybed', material: 'Sheesham Wood', finish: 'Velvet Upholstery', priceRange: { min: 1400, max: 2000, currency: 'USD' }, images: ['/assets/sofa-cum-bed/20.png'] }
]);

// Dining Tables
const diningTableProducts = generateProducts('furniture', 'Dining Table', [
  { name: 'Royal Dining Set', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 2500, max: 3500, currency: 'USD' }, images: ['/assets/dinning-table/1.png'] },
  { name: 'Maharaja Feast Table', material: 'Rosewood', finish: 'Natural Polish', priceRange: { min: 3000, max: 4200, currency: 'USD' }, images: ['/assets/dinning-table/2.png'] },
  { name: 'Carved Dining Table', material: 'Sheesham Wood', finish: 'Antique', priceRange: { min: 2200, max: 3200, currency: 'USD' }, images: ['/assets/dinning-table/3.png'] },
  { name: 'Jali Work Dining Set', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 2400, max: 3400, currency: 'USD' }, images: ['/assets/dinning-table/4.png'] },
  { name: 'Inlay Work Dining Table', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 2800, max: 3800, currency: 'USD' }, images: ['/assets/dinning-table/5.png'] },
  { name: 'Traditional Round Dining', material: 'Rosewood', finish: 'Matt', priceRange: { min: 2300, max: 3300, currency: 'USD' }, images: ['/assets/dinning-table/6.png'] },
  { name: 'Palace Style Dining Set', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 3200, max: 4400, currency: 'USD' }, images: ['/assets/dinning-table/7.png'] },
  { name: 'Carved Leg Dining Table', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 2600, max: 3600, currency: 'USD' }, images: ['/assets/dinning-table/8.png'] },
  { name: 'Brass Inlay Dining Set', material: 'Mango Wood', finish: 'Antique', priceRange: { min: 2700, max: 3700, currency: 'USD' }, images: ['/assets/dinning-table/9.png'] },
  { name: 'Heritage Dining Table', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 2900, max: 3900, currency: 'USD' }, images: ['/assets/dinning-table/10.png'] },
  { name: 'Royal Banquet Table', material: 'Rosewood', finish: 'Natural', priceRange: { min: 3100, max: 4100, currency: 'USD' }, images: ['/assets/dinning-table/11.png'] },
  { name: 'Carved Border Dining Set', material: 'Sheesham Wood', finish: 'Matt', priceRange: { min: 2500, max: 3500, currency: 'USD' }, images: ['/assets/dinning-table/12.png'] },
  { name: 'Lotus Motif Dining Table', material: 'Mango Wood', finish: 'High Gloss', priceRange: { min: 2600, max: 3600, currency: 'USD' }, images: ['/assets/dinning-table/13.png'] },
  { name: 'Peacock Design Dining Set', material: 'Teak Wood', finish: 'Natural Polish', priceRange: { min: 2800, max: 3800, currency: 'USD' }, images: ['/assets/dinning-table/14.png'] },
  { name: 'Elephant Carved Dining Table', material: 'Rosewood', finish: 'Antique', priceRange: { min: 3300, max: 4500, currency: 'USD' }, images: ['/assets/dinning-table/15.png'] },
  { name: 'Floral Pattern Dining Set', material: 'Sheesham Wood', finish: 'Polished', priceRange: { min: 2700, max: 3700, currency: 'USD' }, images: ['/assets/dinning-table/16.png'] },
  { name: 'Geometric Design Dining Table', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 2400, max: 3400, currency: 'USD' }, images: ['/assets/dinning-table/17.png'] },
  { name: 'Mirror Work Dining Set', material: 'Teak Wood', finish: 'Matt', priceRange: { min: 2900, max: 3900, currency: 'USD' }, images: ['/assets/dinning-table/18.png'] },
  { name: 'Traditional Jharokha Dining Table', material: 'Rosewood', finish: 'High Gloss', priceRange: { min: 3400, max: 4600, currency: 'USD' }, images: ['/assets/dinning-table/19.png'] },
  { name: 'Rajasthani Palace Dining Set', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 3000, max: 4000, currency: 'USD' }, images: ['/assets/dinning-table/20.png'] }
]);

// Coffee Tables
const coffeeTableProducts = generateProducts('furniture', 'Coffee Table', [
  { name: 'Royal Coffee Table', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 400, max: 600, currency: 'USD' }, images: ['/assets/coffee-table/1.png'] },
  { name: 'Maharaja Center Table', material: 'Rosewood', finish: 'Natural Polish', priceRange: { min: 500, max: 750, currency: 'USD' }, images: ['/assets/coffee-table/2.png'] },
  { name: 'Carved Coffee Table', material: 'Sheesham Wood', finish: 'Antique', priceRange: { min: 350, max: 550, currency: 'USD' }, images: ['/assets/coffee-table/3.png'] },
  { name: 'Jali Work Center Table', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 380, max: 580, currency: 'USD' }, images: ['/assets/coffee-table/4.png'] },
  { name: 'Inlay Work Coffee Table', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 450, max: 650, currency: 'USD' }, images: ['/assets/coffee-table/5.png'] },
  { name: 'Traditional Round Coffee Table', material: 'Rosewood', finish: 'Matt', priceRange: { min: 420, max: 620, currency: 'USD' }, images: ['/assets/coffee-table/6.png'] },
  { name: 'Palace Style Center Table', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 550, max: 800, currency: 'USD' }, images: ['/assets/coffee-table/7.png'] },
  { name: 'Carved Leg Coffee Table', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 400, max: 600, currency: 'USD' }, images: ['/assets/coffee-table/8.png'] },
  { name: 'Brass Inlay Center Table', material: 'Mango Wood', finish: 'Antique', priceRange: { min: 480, max: 680, currency: 'USD' }, images: ['/assets/coffee-table/9.png'] },
  { name: 'Heritage Coffee Table', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 520, max: 720, currency: 'USD' }, images: ['/assets/coffee-table/10.png'] },
  { name: 'Royal Living Room Table', material: 'Rosewood', finish: 'Natural', priceRange: { min: 580, max: 780, currency: 'USD' }, images: ['/assets/coffee-table/11.png'] },
  { name: 'Carved Border Coffee Table', material: 'Sheesham Wood', finish: 'Matt', priceRange: { min: 430, max: 630, currency: 'USD' }, images: ['/assets/coffee-table/12.png'] },
  { name: 'Lotus Motif Center Table', material: 'Mango Wood', finish: 'High Gloss', priceRange: { min: 460, max: 660, currency: 'USD' }, images: ['/assets/coffee-table/13.png'] },
  { name: 'Peacock Design Coffee Table', material: 'Teak Wood', finish: 'Natural Polish', priceRange: { min: 500, max: 700, currency: 'USD' }, images: ['/assets/coffee-table/14.png'] },
  { name: 'Elephant Carved Center Table', material: 'Rosewood', finish: 'Antique', priceRange: { min: 600, max: 850, currency: 'USD' }, images: ['/assets/coffee-table/15.png'] },
  { name: 'Floral Pattern Coffee Table', material: 'Sheesham Wood', finish: 'Polished', priceRange: { min: 450, max: 650, currency: 'USD' }, images: ['/assets/coffee-table/16.png'] },
  { name: 'Geometric Design Center Table', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 380, max: 580, currency: 'USD' }, images: ['/assets/coffee-table/17.png'] },
  { name: 'Mirror Work Coffee Table', material: 'Teak Wood', finish: 'Matt', priceRange: { min: 520, max: 720, currency: 'USD' }, images: ['/assets/coffee-table/18.png'] },
  { name: 'Traditional Jharokha Center Table', material: 'Rosewood', finish: 'High Gloss', priceRange: { min: 650, max: 900, currency: 'USD' }, images: ['/assets/coffee-table/19.png'] },
  { name: 'Rajasthani Palace Coffee Table', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 550, max: 750, currency: 'USD' }, images: ['/assets/coffee-table/20.png'] }
]);

// Beds
const bedProducts = generateProducts('furniture', 'Bed', [
  { name: 'Royal King Size Bed', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 1800, max: 2500, currency: 'USD' }, images: ['/assets/bed/1.png'] },
  { name: 'Maharaja Four Poster Bed', material: 'Rosewood', finish: 'Natural Polish', priceRange: { min: 2200, max: 3000, currency: 'USD' }, images: ['/assets/bed/2.png'] },
  { name: 'Carved Headboard Bed', material: 'Sheesham Wood', finish: 'Antique', priceRange: { min: 1600, max: 2200, currency: 'USD' }, images: ['/assets/bed/3.png'] },
  { name: 'Jali Work Bed Frame', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 1700, max: 2300, currency: 'USD' }, images: ['/assets/bed/4.png'] },
  { name: 'Inlay Work Bed', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 1900, max: 2600, currency: 'USD' }, images: ['/assets/bed/5.png'] },
  { name: 'Traditional Platform Bed', material: 'Rosewood', finish: 'Matt', priceRange: { min: 1650, max: 2250, currency: 'USD' }, images: ['/assets/bed/6.png'] },
  { name: 'Palace Style Bed', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 2400, max: 3200, currency: 'USD' }, images: ['/assets/bed/7.png'] },
  { name: 'Carved Post Bed', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 1750, max: 2350, currency: 'USD' }, images: ['/assets/bed/8.png'] },
  { name: 'Brass Inlay Bed Frame', material: 'Mango Wood', finish: 'Antique', priceRange: { min: 1850, max: 2450, currency: 'USD' }, images: ['/assets/bed/9.png'] },
  { name: 'Heritage Canopy Bed', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 2000, max: 2700, currency: 'USD' }, images: ['/assets/bed/10.png'] },
  { name: 'Royal Master Bed', material: 'Rosewood', finish: 'Natural', priceRange: { min: 2100, max: 2800, currency: 'USD' }, images: ['/assets/bed/11.png'] },
  { name: 'Carved Border Bed', material: 'Sheesham Wood', finish: 'Matt', priceRange: { min: 1700, max: 2300, currency: 'USD' }, images: ['/assets/bed/12.png'] },
  { name: 'Lotus Motif Bed Frame', material: 'Mango Wood', finish: 'High Gloss', priceRange: { min: 1800, max: 2400, currency: 'USD' }, images: ['/assets/bed/13.png'] },
  { name: 'Peacock Design Bed', material: 'Teak Wood', finish: 'Natural Polish', priceRange: { min: 1950, max: 2550, currency: 'USD' }, images: ['/assets/bed/14.png'] },
  { name: 'Elephant Carved Bed', material: 'Rosewood', finish: 'Antique', priceRange: { min: 2300, max: 3100, currency: 'USD' }, images: ['/assets/bed/15.png'] },
  { name: 'Floral Pattern Bed Frame', material: 'Sheesham Wood', finish: 'Polished', priceRange: { min: 1750, max: 2350, currency: 'USD' }, images: ['/assets/bed/16.png'] },
  { name: 'Geometric Design Bed', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 1650, max: 2250, currency: 'USD' }, images: ['/assets/bed/1.png'] },
  { name: 'Mirror Work Bed Frame', material: 'Teak Wood', finish: 'Matt', priceRange: { min: 2000, max: 2700, currency: 'USD' }, images: ['/assets/bed/1.png'] },
  { name: 'Traditional Jharokha Bed', material: 'Rosewood', finish: 'High Gloss', priceRange: { min: 2500, max: 3300, currency: 'USD' }, images: ['/assets/bed/1.png'] },
  { name: 'Rajasthani Palace Bed', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 2200, max: 2900, currency: 'USD' }, images: ['/assets/bed/20.png'] }
]);

// Bedsides
const bedsideProducts = generateProducts('furniture', 'Bedside', [
  { name: 'Royal Bedside Table', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 300, max: 450, currency: 'USD' }, images: ['/assets/bedsides/1.png'] },
  { name: 'Maharaja Night Stand', material: 'Rosewood', finish: 'Natural Polish', priceRange: { min: 350, max: 500, currency: 'USD' }, images: ['/assets/bedsides/2.png'] },
  { name: 'Carved Bedside Cabinet', material: 'Sheesham Wood', finish: 'Antique', priceRange: { min: 280, max: 420, currency: 'USD' }, images: ['/assets/bedsides/3.png'] },
  { name: 'Jali Work Night Table', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 320, max: 460, currency: 'USD' }, images: ['/assets/bedsides/4.png'] },
  { name: 'Inlay Work Bedside', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 380, max: 520, currency: 'USD' }, images: ['/assets/bedsides/5.png'] },
  { name: 'Traditional Night Stand', material: 'Rosewood', finish: 'Matt', priceRange: { min: 340, max: 480, currency: 'USD' }, images: ['/assets/bedsides/6.png'] },
  { name: 'Palace Style Bedside', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 420, max: 580, currency: 'USD' }, images: ['/assets/bedsides/7.png'] },
  { name: 'Carved Leg Night Table', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 310, max: 450, currency: 'USD' }, images: ['/assets/bedsides/8.png'] },
  { name: 'Brass Inlay Bedside', material: 'Mango Wood', finish: 'Antique', priceRange: { min: 360, max: 500, currency: 'USD' }, images: ['/assets/bedsides/9.png'] },
  { name: 'Heritage Night Stand', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 400, max: 540, currency: 'USD' }, images: ['/assets/bedsides/10.png'] },
  { name: 'Royal Bedroom Cabinet', material: 'Rosewood', finish: 'Natural', priceRange: { min: 430, max: 570, currency: 'USD' }, images: ['/assets/bedsides/11.png'] },
  { name: 'Carved Border Bedside', material: 'Sheesham Wood', finish: 'Matt', priceRange: { min: 330, max: 470, currency: 'USD' }, images: ['/assets/bedsides/12.png'] },
  { name: 'Lotus Motif Night Table', material: 'Mango Wood', finish: 'High Gloss', priceRange: { min: 350, max: 490, currency: 'USD' }, images: ['/assets/bedsides/13.png'] },
  { name: 'Peacock Design Bedside', material: 'Teak Wood', finish: 'Natural Polish', priceRange: { min: 390, max: 530, currency: 'USD' }, images: ['/assets/bedsides/14.png'] },
  { name: 'Elephant Carved Night Stand', material: 'Rosewood', finish: 'Antique', priceRange: { min: 450, max: 600, currency: 'USD' }, images: ['/assets/bedsides/15.png'] },
  { name: 'Floral Pattern Bedside', material: 'Sheesham Wood', finish: 'Polished', priceRange: { min: 340, max: 480, currency: 'USD' }, images: ['/assets/bedsides/16.png'] },
  { name: 'Geometric Design Night Table', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 300, max: 440, currency: 'USD' }, images: ['/assets/bedsides/17.png'] },
  { name: 'Mirror Work Bedside', material: 'Teak Wood', finish: 'Matt', priceRange: { min: 410, max: 550, currency: 'USD' }, images: ['/assets/bedsides/18.png'] },
  { name: 'Traditional Jharokha Night Stand', material: 'Rosewood', finish: 'High Gloss', priceRange: { min: 480, max: 620, currency: 'USD' }, images: ['/assets/bedsides/19.png'] },
  { name: 'Rajasthani Palace Bedside', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 420, max: 560, currency: 'USD' }, images: ['/assets/bedsides/20.png'] }
]);

// Sideboards
const sideboardProducts = generateProducts('furniture', 'Sideboard', [
  { name: 'Royal Sideboard', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 1200, max: 1700, currency: 'USD' }, images: ['/assets/sideboards/1.png'] },
  { name: 'Maharaja Buffet Cabinet', material: 'Rosewood', finish: 'Natural Polish', priceRange: { min: 1400, max: 1900, currency: 'USD' }, images: ['/assets/sideboards/2.png'] },
  { name: 'Carved Sideboard', material: 'Sheesham Wood', finish: 'Antique', priceRange: { min: 1100, max: 1600, currency: 'USD' }, images: ['/assets/sideboards/3.png'] },
  { name: 'Jali Work Buffet', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 1150, max: 1650, currency: 'USD' }, images: ['/assets/sideboards/4.png'] },
  { name: 'Inlay Work Sideboard', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 1300, max: 1800, currency: 'USD' }, images: ['/assets/sideboards/5.png'] },
  { name: 'Traditional Buffet Cabinet', material: 'Rosewood', finish: 'Matt', priceRange: { min: 1250, max: 1750, currency: 'USD' }, images: ['/assets/sideboards/6.png'] },
  { name: 'Palace Style Sideboard', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 1500, max: 2000, currency: 'USD' }, images: ['/assets/sideboards/7.png'] },
  { name: 'Carved Door Buffet', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 1200, max: 1700, currency: 'USD' }, images: ['/assets/sideboards/8.png'] },
  { name: 'Brass Inlay Sideboard', material: 'Mango Wood', finish: 'Antique', priceRange: { min: 1350, max: 1850, currency: 'USD' }, images: ['/assets/sideboards/9.png'] },
  { name: 'Heritage Buffet Cabinet', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 1400, max: 1900, currency: 'USD' }, images: ['/assets/sideboards/10.png'] },
  { name: 'Royal Dining Sideboard', material: 'Rosewood', finish: 'Natural', priceRange: { min: 1450, max: 1950, currency: 'USD' }, images: ['/assets/sideboards/11.png'] },
  { name: 'Carved Panel Buffet', material: 'Sheesham Wood', finish: 'Matt', priceRange: { min: 1250, max: 1750, currency: 'USD' }, images: ['/assets/sideboards/12.png'] },
  { name: 'Lotus Motif Sideboard', material: 'Mango Wood', finish: 'High Gloss', priceRange: { min: 1300, max: 1800, currency: 'USD' }, images: ['/assets/sideboards/13.png'] },
  { name: 'Peacock Design Buffet', material: 'Teak Wood', finish: 'Natural Polish', priceRange: { min: 1400, max: 1900, currency: 'USD' }, images: ['/assets/sideboards/14.png'] },
  { name: 'Elephant Carved Sideboard', material: 'Rosewood', finish: 'Antique', priceRange: { min: 1600, max: 2100, currency: 'USD' }, images: ['/assets/sideboards/15.png'] },
  { name: 'Floral Pattern Buffet', material: 'Sheesham Wood', finish: 'Polished', priceRange: { min: 1300, max: 1800, currency: 'USD' }, images: ['/assets/sideboards/16.png'] },
  { name: 'Geometric Design Sideboard', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 1200, max: 1700, currency: 'USD' }, images: ['/assets/sideboards/17.png'] },
  { name: 'Mirror Work Buffet', material: 'Teak Wood', finish: 'Matt', priceRange: { min: 1450, max: 1950, currency: 'USD' }, images: ['/assets/sideboards/18.png'] },
  { name: 'Traditional Jharokha Sideboard', material: 'Rosewood', finish: 'High Gloss', priceRange: { min: 1700, max: 2200, currency: 'USD' }, images: ['/assets/sideboards/19.png'] },
  { name: 'Rajasthani Palace Buffet', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 1500, max: 2000, currency: 'USD' }, images: ['/assets/sideboards/20.png'] }
]);

// BookShelf
const bookshelfProducts = generateProducts('furniture', 'BookShelf', [
  { name: 'Royal Library Shelf', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 800, max: 1200, currency: 'USD' }, images: ['/assets/bookshelves/1.png'] },
  { name: 'Maharaja Book Cabinet', material: 'Rosewood', finish: 'Natural Polish', priceRange: { min: 950, max: 1350, currency: 'USD' }, images: ['/assets/bookshelves/2.png'] },
  { name: 'Carved Bookshelf', material: 'Sheesham Wood', finish: 'Antique', priceRange: { min: 750, max: 1150, currency: 'USD' }, images: ['/assets/bookshelves/3.png'] },
  { name: 'Jali Work Library Unit', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 800, max: 1200, currency: 'USD' }, images: ['/assets/bookshelves/4.png'] },
  { name: 'Inlay Work Bookshelf', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 900, max: 1300, currency: 'USD' }, images: ['/assets/bookshelves/5.png'] },
  { name: 'Traditional Book Cabinet', material: 'Rosewood', finish: 'Matt', priceRange: { min: 850, max: 1250, currency: 'USD' }, images: ['/assets/bookshelves/6.png'] },
  { name: 'Palace Style Library Shelf', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 1100, max: 1500, currency: 'USD' }, images: ['/assets/bookshelves/7.png'] },
  { name: 'Carved Panel Bookshelf', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 800, max: 1200, currency: 'USD' }, images: ['/assets/bookshelves/8.png'] },
  { name: 'Brass Inlay Library Unit', material: 'Mango Wood', finish: 'Antique', priceRange: { min: 950, max: 1350, currency: 'USD' }, images: ['/assets/bookshelves/9.png'] },
  { name: 'Heritage Book Cabinet', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 1000, max: 1400, currency: 'USD' }, images: ['/assets/bookshelves/10.png'] },
  { name: 'Royal Study Shelf', material: 'Rosewood', finish: 'Natural', priceRange: { min: 1050, max: 1450, currency: 'USD' }, images: ['/assets/bookshelves/11.png'] },
  { name: 'Carved Door Bookshelf', material: 'Sheesham Wood', finish: 'Matt', priceRange: { min: 850, max: 1250, currency: 'USD' }, images: ['/assets/bookshelves/12.png'] },
  { name: 'Lotus Motif Library Unit', material: 'Mango Wood', finish: 'High Gloss', priceRange: { min: 900, max: 1300, currency: 'USD' }, images: ['/assets/bookshelves/13.png'] },
  { name: 'Peacock Design Bookshelf', material: 'Teak Wood', finish: 'Natural Polish', priceRange: { min: 950, max: 1350, currency: 'USD' }, images: ['/assets/bookshelves/14.png'] },
  { name: 'Elephant Carved Book Cabinet', material: 'Rosewood', finish: 'Antique', priceRange: { min: 1200, max: 1600, currency: 'USD' }, images: ['/assets/bookshelves/15.png'] },
  { name: 'Floral Pattern Library Shelf', material: 'Sheesham Wood', finish: 'Polished', priceRange: { min: 900, max: 1300, currency: 'USD' }, images: ['/assets/bookshelves/16.png'] },
  { name: 'Geometric Design Bookshelf', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 800, max: 1200, currency: 'USD' }, images: ['/assets/bookshelves/17.png'] },
  { name: 'Mirror Work Library Unit', material: 'Teak Wood', finish: 'Matt', priceRange: { min: 1050, max: 1450, currency: 'USD' }, images: ['/assets/bookshelves/18.png'] },
  { name: 'Traditional Jharokha Bookshelf', material: 'Rosewood', finish: 'High Gloss', priceRange: { min: 1300, max: 1700, currency: 'USD' }, images: ['/assets/bookshelves/19.png'] },
  { name: 'Rajasthani Palace Book Cabinet', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 1100, max: 1500, currency: 'USD' }, images: ['/assets/bookshelves/20.png'] }
]);

// Chair
const chairProducts = generateProducts('furniture', 'Chair', [
  { name: 'Royal Throne Chair', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 400, max: 600, currency: 'USD' }, images: ['/assets/chair/1.png'] },
  { name: 'Maharaja Dining Chair', material: 'Rosewood', finish: 'Natural Polish', priceRange: { min: 450, max: 650, currency: 'USD' }, images: ['/assets/chair/2.png'] },
  { name: 'Carved Back Chair', material: 'Sheesham Wood', finish: 'Antique', priceRange: { min: 350, max: 550, currency: 'USD' }, images: ['/assets/chair/3.png'] },
  { name: 'Jali Work Chair', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 380, max: 580, currency: 'USD' }, images: ['/assets/chair/4.png'] },
  { name: 'Inlay Work Chair', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 420, max: 620, currency: 'USD' }, images: ['/assets/chair/5.png'] },
  { name: 'Traditional Arm Chair', material: 'Rosewood', finish: 'Matt', priceRange: { min: 400, max: 600, currency: 'USD' }, images: ['/assets/chair/6.png'] },
  { name: 'Palace Style Chair', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 500, max: 700, currency: 'USD' }, images: ['/assets/chair/7.png'] },
  { name: 'Carved Leg Chair', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 370, max: 570, currency: 'USD' }, images: ['/assets/chair/8.png'] },
  { name: 'Brass Inlay Chair', material: 'Mango Wood', finish: 'Antique', priceRange: { min: 440, max: 640, currency: 'USD' }, images: ['/assets/chair/9.png'] },
  { name: 'Heritage Dining Chair', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 460, max: 660, currency: 'USD' }, images: ['/assets/chair/10.png'] },
  { name: 'Royal Accent Chair', material: 'Rosewood', finish: 'Natural', priceRange: { min: 480, max: 680, currency: 'USD' }, images: ['/assets/chair/11.png'] },
  { name: 'Carved Panel Chair', material: 'Sheesham Wood', finish: 'Matt', priceRange: { min: 390, max: 590, currency: 'USD' }, images: ['/assets/chair/12.png'] },
  { name: 'Lotus Motif Chair', material: 'Mango Wood', finish: 'High Gloss', priceRange: { min: 410, max: 610, currency: 'USD' }, images: ['/assets/chair/13.png'] },
  { name: 'Peacock Design Chair', material: 'Teak Wood', finish: 'Natural Polish', priceRange: { min: 450, max: 650, currency: 'USD' }, images: ['/assets/chair/14.png'] },
  { name: 'Elephant Carved Chair', material: 'Rosewood', finish: 'Antique', priceRange: { min: 520, max: 720, currency: 'USD' }, images: ['/assets/chair/15.png'] },
  { name: 'Floral Pattern Chair', material: 'Sheesham Wood', finish: 'Polished', priceRange: { min: 420, max: 620, currency: 'USD' }, images: ['/assets/chair/16.png'] },
  { name: 'Geometric Design Chair', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 360, max: 560, currency: 'USD' }, images: ['/assets/chair/17.png'] },
  { name: 'Mirror Work Chair', material: 'Teak Wood', finish: 'Matt', priceRange: { min: 470, max: 670, currency: 'USD' }, images: ['/assets/chair/18.png'] },
  { name: 'Traditional Jharokha Chair', material: 'Rosewood', finish: 'High Gloss', priceRange: { min: 550, max: 750, currency: 'USD' }, images: ['/assets/chair/19.png'] },
  { name: 'Rajasthani Palace Chair', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 490, max: 690, currency: 'USD' }, images: ['/assets/chair/20.png'] }
]);

// Almirah
const almirahProducts = generateProducts('furniture', 'Almirah', [
  { name: 'Royal Wardrobe', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 2000, max: 2800, currency: 'USD' }, images: ['/assets/Almirah/1.png'] },
  { name: 'Maharaja Almirah', material: 'Rosewood', finish: 'Natural Polish', priceRange: { min: 2300, max: 3100, currency: 'USD' }, images: ['/assets/Almirah/2.png'] },
  { name: 'Carved Door Wardrobe', material: 'Sheesham Wood', finish: 'Antique', priceRange: { min: 1900, max: 2700, currency: 'USD' }, images: ['/assets/Almirah/3.png'] },
  { name: 'Jali Work Almirah', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 1950, max: 2750, currency: 'USD' }, images: ['/assets/Almirah/4.png'] },
  { name: 'Inlay Work Wardrobe', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 2100, max: 2900, currency: 'USD' }, images: ['/assets/Almirah/5.png'] },
  { name: 'Traditional Almirah', material: 'Rosewood', finish: 'Matt', priceRange: { min: 2050, max: 2850, currency: 'USD' }, images: ['/assets/Almirah/6.png'] },
  { name: 'Palace Style Wardrobe', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 2400, max: 3200, currency: 'USD' }, images: ['/assets/Almirah/7.png'] },
  { name: 'Carved Panel Almirah', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 2000, max: 2800, currency: 'USD' }, images: ['/assets/Almirah/8.png'] },
  { name: 'Brass Inlay Wardrobe', material: 'Mango Wood', finish: 'Antique', priceRange: { min: 2200, max: 3000, currency: 'USD' }, images: ['/assets/Almirah/9.png'] },
  { name: 'Heritage Almirah', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 2250, max: 3050, currency: 'USD' }, images: ['/assets/Almirah/10.png'] },
  { name: 'Royal Bedroom Wardrobe', material: 'Rosewood', finish: 'Natural', priceRange: { min: 2350, max: 3150, currency: 'USD' }, images: ['/assets/Almirah/11.png'] },
  { name: 'Carved Border Almirah', material: 'Sheesham Wood', finish: 'Matt', priceRange: { min: 2100, max: 2900, currency: 'USD' }, images: ['/assets/Almirah/12.png'] },
  { name: 'Lotus Motif Wardrobe', material: 'Mango Wood', finish: 'High Gloss', priceRange: { min: 2150, max: 2950, currency: 'USD' }, images: ['/assets/Almirah/13.png'] },
  { name: 'Peacock Design Almirah', material: 'Teak Wood', finish: 'Natural Polish', priceRange: { min: 2200, max: 3000, currency: 'USD' }, images: ['/assets/Almirah/14.png'] },
  { name: 'Elephant Carved Wardrobe', material: 'Rosewood', finish: 'Antique', priceRange: { min: 2500, max: 3300, currency: 'USD' }, images: ['/assets/Almirah/15.png'] },
  { name: 'Floral Pattern Almirah', material: 'Sheesham Wood', finish: 'Polished', priceRange: { min: 2150, max: 2950, currency: 'USD' }, images: ['/assets/Almirah/16.png'] },
  { name: 'Geometric Design Wardrobe', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 1950, max: 2750, currency: 'USD' }, images: ['/assets/Almirah/17.png'] },
  { name: 'Mirror Work Almirah', material: 'Teak Wood', finish: 'Matt', priceRange: { min: 2300, max: 3100, currency: 'USD' }, images: ['/assets/Almirah/18.png'] },
  { name: 'Traditional Jharokha Wardrobe', material: 'Rosewood', finish: 'High Gloss', priceRange: { min: 2600, max: 3400, currency: 'USD' }, images: ['/assets/Almirah/19.png'] },
  { name: 'Rajasthani Palace Almirah', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 2400, max: 3200, currency: 'USD' }, images: ['/assets/Almirah/20.png'] }
]);

// Bar Cabinets
const barCabinetProducts = generateProducts('furniture', 'Bar Cabinet', [
  { name: 'Royal Bar Cabinet', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 1500, max: 2100, currency: 'USD' }, images: ['/assets/bar-cabinets/1.png'] },
  { name: 'Maharaja Wine Cabinet', material: 'Rosewood', finish: 'Natural Polish', priceRange: { min: 1700, max: 2300, currency: 'USD' }, images: ['/assets/bar-cabinets/2.png'] },
  { name: 'Carved Bar Unit', material: 'Sheesham Wood', finish: 'Antique', priceRange: { min: 1400, max: 2000, currency: 'USD' }, images: ['/assets/bar-cabinets/3.png'] },
  { name: 'Jali Work Bar Cabinet', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 1450, max: 2050, currency: 'USD' }, images: ['/assets/bar-cabinets/4.png'] },
  { name: 'Inlay Work Wine Cabinet', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 1600, max: 2200, currency: 'USD' }, images: ['/assets/bar-cabinets/5.png'] },
  { name: 'Traditional Bar Unit', material: 'Rosewood', finish: 'Matt', priceRange: { min: 1550, max: 2150, currency: 'USD' }, images: ['/assets/bar-cabinets/6.png'] },
  { name: 'Palace Style Bar Cabinet', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 1800, max: 2400, currency: 'USD' }, images: ['/assets/bar-cabinets/7.png'] },
  { name: 'Carved Door Bar Unit', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 1500, max: 2100, currency: 'USD' }, images: ['/assets/bar-cabinets/8.png'] },
  { name: 'Brass Inlay Wine Cabinet', material: 'Mango Wood', finish: 'Antique', priceRange: { min: 1650, max: 2250, currency: 'USD' }, images: ['/assets/bar-cabinets/9.png'] },
  { name: 'Heritage Bar Cabinet', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 1700, max: 2300, currency: 'USD' }, images: ['/assets/bar-cabinets/10.png'] },
  { name: 'Royal Entertainment Unit', material: 'Rosewood', finish: 'Natural', priceRange: { min: 1750, max: 2350, currency: 'USD' }, images: ['/assets/bar-cabinets/11.png'] },
  { name: 'Carved Panel Bar Cabinet', material: 'Sheesham Wood', finish: 'Matt', priceRange: { min: 1550, max: 2150, currency: 'USD' }, images: ['/assets/bar-cabinets/12.png'] },
  { name: 'Lotus Motif Wine Cabinet', material: 'Mango Wood', finish: 'High Gloss', priceRange: { min: 1600, max: 2200, currency: 'USD' }, images: ['/assets/bar-cabinets/13.png'] },
  { name: 'Peacock Design Bar Unit', material: 'Teak Wood', finish: 'Natural Polish', priceRange: { min: 1650, max: 2250, currency: 'USD' }, images: ['/assets/bar-cabinets/14.png'] },
  { name: 'Elephant Carved Bar Cabinet', material: 'Rosewood', finish: 'Antique', priceRange: { min: 1900, max: 2500, currency: 'USD' }, images: ['/assets/bar-cabinets/15.png'] },
  { name: 'Floral Pattern Wine Cabinet', material: 'Sheesham Wood', finish: 'Polished', priceRange: { min: 1600, max: 2200, currency: 'USD' }, images: ['/assets/bar-cabinets/16.png'] },
  { name: 'Geometric Design Bar Unit', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 1450, max: 2050, currency: 'USD' }, images: ['/assets/bar-cabinets/17.png'] },
  { name: 'Mirror Work Bar Cabinet', material: 'Teak Wood', finish: 'Matt', priceRange: { min: 1750, max: 2350, currency: 'USD' }, images: ['/assets/bar-cabinets/18.png'] },
  { name: 'Traditional Jharokha Wine Cabinet', material: 'Rosewood', finish: 'High Gloss', priceRange: { min: 2000, max: 2600, currency: 'USD' }, images: ['/assets/bar-cabinets/19.png'] },
  { name: 'Rajasthani Palace Bar Unit', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 1800, max: 2400, currency: 'USD' }, images: ['/assets/bar-cabinets/20.png'] }
]);

// TVC (TV Cabinet)
const tvcProducts = generateProducts('furniture', 'TVC', [
  { name: 'Royal TV Cabinet', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 800, max: 1200, currency: 'USD' }, images: ['/assets/tvc/1.png'] },
  { name: 'Maharaja Entertainment Unit', material: 'Rosewood', finish: 'Natural Polish', priceRange: { min: 950, max: 1350, currency: 'USD' }, images: ['/assets/tvc/2.png'] },
  { name: 'Carved TV Stand', material: 'Sheesham Wood', finish: 'Antique', priceRange: { min: 750, max: 1150, currency: 'USD' }, images: ['/assets/tvc/3.png'] },
  { name: 'Jali Work TV Cabinet', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 800, max: 1200, currency: 'USD' }, images: ['/assets/tvc/4.png'] },
  { name: 'Inlay Work Entertainment Unit', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 900, max: 1300, currency: 'USD' }, images: ['/assets/tvc/5.png'] },
  { name: 'Traditional TV Stand', material: 'Rosewood', finish: 'Matt', priceRange: { min: 850, max: 1250, currency: 'USD' }, images: ['/assets/tvc/6.png'] },
  { name: 'Palace Style TV Cabinet', material: 'Teak Wood', finish: 'High Gloss', priceRange: { min: 1100, max: 1500, currency: 'USD' }, images: ['/assets/tvc/7.png'] },
  { name: 'Carved Door TV Unit', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 800, max: 1200, currency: 'USD' }, images: ['/assets/tvc/8.png'] },
  { name: 'Brass Inlay TV Cabinet', material: 'Mango Wood', finish: 'Antique', priceRange: { min: 950, max: 1350, currency: 'USD' }, images: ['/assets/tvc/9.png'] },
  { name: 'Heritage Entertainment Unit', material: 'Teak Wood', finish: 'Polished', priceRange: { min: 1000, max: 1400, currency: 'USD' }, images: ['/assets/tvc/10.png'] },
  { name: 'Royal Media Console', material: 'Rosewood', finish: 'Natural', priceRange: { min: 1050, max: 1450, currency: 'USD' }, images: ['/assets/tvc/11.png'] },
  { name: 'Carved Panel TV Cabinet', material: 'Sheesham Wood', finish: 'Matt', priceRange: { min: 850, max: 1250, currency: 'USD' }, images: ['/assets/tvc/12.png'] },
  { name: 'Lotus Motif TV Stand', material: 'Mango Wood', finish: 'High Gloss', priceRange: { min: 900, max: 1300, currency: 'USD' }, images: ['/assets/tvc/13.png'] },
  { name: 'Peacock Design TV Cabinet', material: 'Teak Wood', finish: 'Natural Polish', priceRange: { min: 950, max: 1350, currency: 'USD' }, images: ['/assets/tvc/14.png'] },
  { name: 'Elephant Carved Entertainment Unit', material: 'Rosewood', finish: 'Antique', priceRange: { min: 1200, max: 1600, currency: 'USD' }, images: ['/assets/tvc/15.png'] },
  { name: 'Floral Pattern TV Cabinet', material: 'Sheesham Wood', finish: 'Polished', priceRange: { min: 900, max: 1300, currency: 'USD' }, images: ['/assets/tvc/16.png'] },
  { name: 'Geometric Design TV Stand', material: 'Mango Wood', finish: 'Natural', priceRange: { min: 800, max: 1200, currency: 'USD' }, images: ['/assets/tvc/17.png'] },
  { name: 'Mirror Work TV Cabinet', material: 'Teak Wood', finish: 'Matt', priceRange: { min: 1050, max: 1450, currency: 'USD' }, images: ['/assets/tvc/18.png'] },
  { name: 'Traditional Jharokha Entertainment Unit', material: 'Rosewood', finish: 'High Gloss', priceRange: { min: 1300, max: 1700, currency: 'USD' }, images: ['/assets/tvc/19.png'] },
  { name: 'Rajasthani Palace TV Cabinet', material: 'Sheesham Wood', finish: 'Natural Polish', priceRange: { min: 1100, max: 1500, currency: 'USD' }, images: ['/assets/tvc/20.png'] }
]);

// Combine all products
export const products: Product[] = [
  ...tableProducts,
  ...sofaCumBedProducts,
  ...diningTableProducts,
  ...coffeeTableProducts,
  ...bedProducts,
  ...bedsideProducts,
  ...sideboardProducts,
  ...bookshelfProducts,
  ...chairProducts,
  ...almirahProducts,
  ...barCabinetProducts,
  ...tvcProducts
];

// Category mapping for navigation
export const categories = {
  'table': 'Table',
  'sofa-cum-bed': 'Sofa Cum Bed',
  'dining-table': 'Dining Table',
  'coffee-table': 'Coffee Table',
  'bed': 'Bed',
  'bedside': 'Bedside',
  'sideboard': 'Sideboard',
  'bookshelf': 'BookShelf',
  'chair': 'Chair',
  'almirah': 'Almirah',
  'bar-cabinet': 'Bar Cabinet',
  'tvc': 'TVC'
};

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductsBySubcategory = (subcategory: string) => {
  return products.filter(product => product.subcategory === subcategory);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};