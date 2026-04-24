import React, { useState, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../types';
export const Home = () => {
  const { products } = useProducts();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const featuredProducts = [...products].
  sort((a, b) => b.createdAt - a.createdAt).
  slice(0, 8);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  const categoryImages: Record<string, string> = {
    'Native Wears':
    'https://images.unsplash.com/photo-1580526141565-17730e161f43?auto=format&fit=crop&q=80&w=800',
    'Street Wears':
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    'Corporate Wears':
    'https://images.unsplash.com/photo-1594938298596-70f56fb3cecb?auto=format&fit=crop&q=80&w=800',
    'Casual Wears':
    'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=800',
    Accessories:
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    Fabrics:
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800'
  };
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
            alt="Fashion Background"
            className="w-full h-full object-cover" />
          
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{
              y: 20,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            transition={{
              delay: 0.2
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight">
            
            FEMOUS<span className="text-brand-gold">.</span>
          </motion.h1>
          <motion.p
            initial={{
              y: 20,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            transition={{
              delay: 0.4
            }}
            className="text-lg md:text-2xl text-gray-200 mb-10 font-light tracking-wide uppercase">
            
            Redefining Fashion, Worldwide
          </motion.p>
          <motion.div
            initial={{
              y: 20,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            transition={{
              delay: 0.6
            }}>
            
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-brand-gold text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-colors duration-300">
              
              Shop Collection <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto -mt-8 relative z-20">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-24 py-4 bg-white border border-gray-200 shadow-lg text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-colors" />
          
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-dark text-white px-5 py-2 text-sm font-bold uppercase tracking-wider hover:bg-brand-gold transition-colors">
            
            Search
          </button>
        </form>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-2">
              New Arrivals
            </h2>
            <p className="text-brand-grayDark">
              The latest additions to our collection.
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-dark hover:text-brand-gold transition-colors">
            
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
          {featuredProducts.map((product) =>
          <ProductCard key={product.id} product={product} />
          )}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-dark hover:text-brand-gold transition-colors border-b border-brand-dark pb-1">
            
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-12 text-center">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) =>
            <Link
              key={category}
              to={`/shop?category=${encodeURIComponent(category)}`}
              className="group relative h-80 overflow-hidden">
              
                <img
                src={categoryImages[category]}
                alt={category}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-3 transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="font-serif text-xl font-bold text-brand-dark uppercase tracking-wider">
                      {category}
                    </h3>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">
          Our Story
        </h2>
        <p className="text-lg text-brand-grayDark leading-relaxed mb-8">
          Born in Ado Ekiti, Femous Fashion brings classic, elegant, and
          high-end fashion to the world. We believe in quality craftsmanship,
          timeless designs, and the power of a perfect fit. Whether it's
          traditional native wear or sharp corporate attire, we dress you for
          success.
        </p>
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000"
          alt="Fashion Studio"
          className="w-full h-64 md:h-96 object-cover" />
        
      </section>
    </motion.div>);

};