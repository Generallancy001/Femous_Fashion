import React, { useEffect, useState, createContext, useContext } from 'react';
import { CartItem } from '../types';
import { toast } from 'sonner';
interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider = ({ children }: {children: ReactNode;}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem('femous_cart');
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('femous_cart', JSON.stringify(newCart));
  };
  const addToCart = (productId: string, quantity: number = 1) => {
    const existing = cart.find((item) => item.productId === productId);
    if (existing) {
      saveCart(
        cart.map((item) =>
        item.productId === productId ?
        {
          ...item,
          quantity: item.quantity + quantity
        } :
        item
        )
      );
    } else {
      saveCart([
      ...cart,
      {
        productId,
        quantity
      }]
      );
    }
    toast.success('Added to cart');
  };
  const removeFromCart = (productId: string) => {
    saveCart(cart.filter((item) => item.productId !== productId));
    toast.success('Removed from cart');
  };
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    saveCart(
      cart.map((item) =>
      item.productId === productId ?
      {
        ...item,
        quantity
      } :
      item
      )
    );
  };
  const clearCart = () => {
    saveCart([]);
  };
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount
      }}>
      
      {children}
    </CartContext.Provider>);

};
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};