import { review } from './review';

export interface Product {
  title: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  price: number;
  off: number;
  reviews: review[];
  colors: string[];
  shortDescription: string;
  description: string;
  images: string[];
  composition: string[];
  localStores: string[];
}
