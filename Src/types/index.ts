export type Category =
'Native Wears' |
'Street Wears' |
'Corporate Wears' |
'Casual Wears' |
'Accessories' |
'Fabrics';

export const CATEGORIES: Category[] = [
'Native Wears',
'Street Wears',
'Corporate Wears',
'Casual Wears',
'Accessories',
'Fabrics'];


export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  createdAt: number;
}

export interface Review {
  id: string;
  productId: string;
  email: string;
  rating: number; // 1-5
  comment: string;
  date: number;
  adminReply?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}