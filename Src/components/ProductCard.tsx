import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { formatPrice } from '../utils/format';
import { StarRating } from './StarRating';
import { useReviews } from '../context/ReviewContext';
interface ProductCardProps {
  product: Product;
}
export const ProductCard = ({ product }: ProductCardProps) => {
  const { getReviewsByProduct } = useReviews();
  const reviews = getReviewsByProduct(product.id);
  const avgRating =
  reviews.length > 0 ?
  reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length :
  0;
  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{
          y: -5
        }}
        className="group cursor-pointer flex flex-col h-full">
        
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-gray mb-4">
          <img
            src={
            product.images[0] ||
            'https://via.placeholder.com/400x600?text=No+Image'
            }
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium uppercase tracking-wider">
            {product.category}
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <h3 className="font-serif text-lg text-brand-dark mb-1 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={Math.round(avgRating)} size={14} />
            <span className="text-xs text-brand-grayDark">
              ({reviews.length})
            </span>
          </div>
          <p className="mt-auto font-medium text-brand-dark">
            {formatPrice(product.price)}
          </p>
        </div>
      </motion.div>
    </Link>);

};