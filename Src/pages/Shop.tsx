import React, { useEffect, useState, Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, Category } from '../types';
export const Shop = () => {
  const { products } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  // Parse category and search from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');
    if (categoryParam && CATEGORIES.includes(categoryParam as Category)) {
      setActiveCategory(categoryParam as Category);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location]);
  // Update URL when category changes
  const handleCategoryChange = (cat: Category | 'All') => {
    setActiveCategory(cat);
    if (cat === 'All') {
      navigate('/shop');
    } else {
      navigate(`/shop?category=${encodeURIComponent(cat)}`);
    }
  };
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
    activeCategory === 'All' || product.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
    product.name.toLowerCase().includes(searchLower) ||
    product.description.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });
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
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
          Collection
        </h1>
        <p className="text-brand-grayDark">
          Explore our complete range of premium fashion.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-12 space-y-6">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 bg-white text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-colors" />
          
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${activeCategory === 'All' ? 'bg-brand-dark text-white' : 'bg-white text-brand-dark border border-gray-200 hover:border-brand-dark'}`}>
            
            All
          </button>
          {CATEGORIES.map((category) =>
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${activeCategory === category ? 'bg-brand-dark text-white' : 'bg-white text-brand-dark border border-gray-200 hover:border-brand-dark'}`}>
            
              {category}
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ?
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
          {filteredProducts.map((product) =>
        <ProductCard key={product.id} product={product} />
        )}
        </div> :

      <div className="text-center py-24">
          <p className="text-xl text-brand-grayDark font-serif">
            No products found matching your criteria.
          </p>
          <button
          onClick={() => {
            setSearchQuery('');
            handleCategoryChange('All');
          }}
          className="mt-4 text-brand-gold hover:text-brand-dark font-medium uppercase tracking-wider transition-colors">
          
            Clear Filters
          </button>
        </div>
      }
    </motion.div>);

};