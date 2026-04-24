import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
export const Navbar = () => {
  const { cartCount } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Shop',
    path: '/shop'
  }];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };
  return (
    <header className="sticky top-0 z-50 bg-brand-light/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-dark hover:text-brand-gold transition-colors">
              
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-brand-dark">
              FEMOUS<span className="text-brand-gold">.</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-brand-gold ${isActive(link.path) ? 'text-brand-gold' : 'text-brand-dark'}`}>
              
                {link.name}
              </Link>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link
              to="/cart"
              className="text-brand-dark hover:text-brand-gold transition-colors relative">
              
              <ShoppingBag size={20} />
              {cartCount > 0 &&
              <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              }
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden bg-white border-b border-gray-200 overflow-hidden">
          
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-4 text-base font-medium uppercase tracking-wider border-b border-gray-100 ${isActive(link.path) ? 'text-brand-gold' : 'text-brand-dark'}`}>
              
                  {link.name}
                </Link>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

};