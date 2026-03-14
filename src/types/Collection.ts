export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  subcategory?: string;
  images: string[];
  material: string;
  finish: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  featured: boolean;
  tags: string[];
}