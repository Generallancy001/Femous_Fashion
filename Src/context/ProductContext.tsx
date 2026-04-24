import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  memo } from
'react';
import { Product, Category } from '../types';
interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);
const SEED_PRODUCTS: Product[] = [
{
  id: '1',
  name: 'Classic Agbada Set',
  description:
  'Premium quality native wear for special occasions. Features intricate embroidery and matching trousers.',
  price: 150000,
  category: 'Native Wears',
  images: [
  'https://images.unsplash.com/photo-1580526141565-17730e161f43?auto=format&fit=crop&q=80&w=800'],

  createdAt: Date.now() - 100000
},
{
  id: '2',
  name: 'Urban Oversized Tee',
  description:
  'Comfortable and stylish oversized t-shirt perfect for streetwear enthusiasts. 100% heavy cotton.',
  price: 15000,
  category: 'Street Wears',
  images: [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'],

  createdAt: Date.now() - 90000
},
{
  id: '3',
  name: 'Executive Three-Piece Suit',
  description:
  'Tailored to perfection. This corporate suit commands respect in any boardroom.',
  price: 250000,
  category: 'Corporate Wears',
  images: [
  'https://images.unsplash.com/photo-1594938298596-70f56fb3cecb?auto=format&fit=crop&q=80&w=800'],

  createdAt: Date.now() - 80000
},
{
  id: '4',
  name: 'Linen Summer Shirt',
  description:
  'Breathable linen shirt for casual outings. Lightweight and comfortable.',
  price: 25000,
  category: 'Casual Wears',
  images: [
  'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=800'],

  createdAt: Date.now() - 70000
},
{
  id: '5',
  name: 'Gold Plated Cufflinks',
  description: 'Elegant accessories to complete your corporate look.',
  price: 35000,
  category: 'Accessories',
  images: [
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'],

  createdAt: Date.now() - 60000
},
{
  id: '6',
  name: 'Premium Senator Material',
  description:
  'High-quality fabric for sewing your custom native wears. 4 yards.',
  price: 45000,
  category: 'Fabrics',
  images: [
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800'],

  createdAt: Date.now() - 50000
}];

export const ProductProvider = ({ children }: {children: ReactNode;}) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem('femous_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(SEED_PRODUCTS);
      localStorage.setItem('femous_products', JSON.stringify(SEED_PRODUCTS));
    }
  }, []);
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('femous_products', JSON.stringify(newProducts));
    } catch (e) {
      console.warn('localStorage quota exceeded, data saved in memory only');
    }
  };
  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    saveProducts([newProduct, ...products]);
  };
  const updateProduct = (id: string, updates: Partial<Product>) => {
    saveProducts(
      products.map((p) =>
      p.id === id ?
      {
        ...p,
        ...updates
      } :
      p
      )
    );
  };
  const deleteProduct = (id: string) => {
    saveProducts(products.filter((p) => p.id !== id));
  };
  const getProduct = (id: string) => products.find((p) => p.id === id);
  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct
      }}>
      
      {children}
    </ProductContext.Provider>);

};
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context)
  throw new Error('useProducts must be used within ProductProvider');
  return context;
};