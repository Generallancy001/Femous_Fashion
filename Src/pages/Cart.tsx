import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { formatPrice, WHATSAPP_NUMBER } from '../utils/format';
export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { getProduct } = useProducts();
  const cartItems = cart.
  map((item) => ({
    ...item,
    product: getProduct(item.productId)
  })).
  filter((item) => item.product !== undefined);
  const subtotal = cartItems.reduce((total, item) => {
    return total + item.product!.price * item.quantity;
  }, 0);
  const handleCheckout = () => {
    let message = 'Hello Femous Fashion, I would like to place an order:\n\n';
    cartItems.forEach((item) => {
      message += `- ${item.quantity}x ${item.product!.name} (${formatPrice(item.product!.price)})\n`;
    });
    message += `\nTotal: ${formatPrice(subtotal)}\n\nPlease let me know the payment and delivery details.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
    clearCart();
  };
  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        
        <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-brand-grayDark mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors duration-300">
          
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </motion.div>);

  }
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <h1 className="text-4xl font-serif font-bold text-brand-dark mb-12">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) =>
          <div
            key={item.productId}
            className="flex flex-col sm:flex-row gap-6 border-b border-gray-200 pb-6">
            
              <div className="w-full sm:w-32 aspect-[3/4] bg-brand-gray flex-shrink-0">
                <img
                src={
                item.product!.images[0] || 'https://via.placeholder.com/150'
                }
                alt={item.product!.name}
                className="w-full h-full object-cover" />
              
              </div>

              <div className="flex flex-col flex-grow justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">
                      {item.product!.category}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
                      <Link
                      to={`/product/${item.productId}`}
                      className="hover:text-brand-gold transition-colors">
                      
                        {item.product!.name}
                      </Link>
                    </h3>
                    <p className="text-brand-dark font-medium">
                      {formatPrice(item.product!.price)}
                    </p>
                  </div>
                  <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center border border-gray-300">
                    <button
                    onClick={() =>
                    updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={item.quantity <= 1}>
                    
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                    onClick={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="p-2 hover:bg-gray-100 transition-colors">
                    
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="text-right flex-grow font-bold text-brand-dark">
                    {formatPrice(item.product!.price * item.quantity)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-brand-gray p-8 sticky top-28">
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-brand-dark">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-brand-grayDark text-sm">
                <span>Shipping</span>
                <span>Calculated on WhatsApp</span>
              </div>
              <div className="border-t border-gray-300 pt-4 flex justify-between text-brand-dark font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-colors duration-300">
              
              <MessageCircle size={18} /> Complete Order via WhatsApp
            </button>
            <p className="text-xs text-center text-brand-grayDark mt-4">
              You will be redirected to WhatsApp to finalize your order and
              arrange payment and delivery.
            </p>
          </div>
        </div>
      </div>
    </motion.div>);

};