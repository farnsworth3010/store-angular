import { review } from './review';

export interface Product {
  ID: number;
  title: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  price: number;
  off: number;
  reviews: review[];
  colors: string[];
  short_description: string;
  description: string;
  images: string[];
  sizes: string[];
  composition: string[];
  localStores: string[];
  brand_id: number;
}

export interface NewProductInput {
  title: string;
  price: number;
  short_description: string;
  description: string;
  brand_id: number;
}

export interface EditProductInput {
  ID: number;
  title: string;
  price: number;
  short_description: string;
  description: string;
  brand_id: number;
}
