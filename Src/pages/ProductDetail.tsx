import React, { useState, Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  MessageCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight } from
'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useReviews } from '../context/ReviewContext';
import {
  formatPrice,
  extractNameFromEmail,
  WHATSAPP_NUMBER } from
'../utils/format';
import { StarRating } from '../components/StarRating';
import { toast } from 'sonner';
export const ProductDetail = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const { getReviewsByProduct, addReview } = useReviews();
  const product = id ? getProduct(id) : undefined;
  const reviews = id ? getReviewsByProduct(id) : [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    email: '',
    rating: 5,
    comment: ''
  });
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/shop')}
          className="text-brand-gold hover:underline">
          
          Return to Shop
        </button>
      </div>);

  }
  const avgRating =
  reviews.length > 0 ?
  reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length :
  0;
  const handleWhatsAppEnquiry = () => {
    const message = `Hello Femous Fashion, I am interested in the ${product.name} (${formatPrice(product.price)}). Is it available?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.email || !reviewForm.comment) {
      toast.error('Please fill in all fields');
      return;
    }
    addReview({
      productId: product.id,
      email: reviewForm.email,
      rating: reviewForm.rating,
      comment: reviewForm.comment
    });
    setReviewForm({
      email: '',
      rating: 5,
      comment: ''
    });
    toast.success('Review submitted successfully');
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
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-brand-grayDark hover:text-brand-dark transition-colors mb-8 uppercase tracking-wider text-sm font-medium">
        
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {/* Image Gallery with Swipe */}
        <div className="space-y-4">
          <div
            className="relative aspect-[3/4] bg-brand-gray overflow-hidden touch-pan-y"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              (e.currentTarget as any)._touchStartX = touch.clientX;
            }}
            onTouchEnd={(e) => {
              const startX = (e.currentTarget as any)._touchStartX;
              const endX = e.changedTouches[0].clientX;
              const diff = startX - endX;
              if (Math.abs(diff) > 50) {
                if (diff > 0 && activeImageIndex < product.images.length - 1) {
                  setActiveImageIndex(activeImageIndex + 1);
                } else if (diff < 0 && activeImageIndex > 0) {
                  setActiveImageIndex(activeImageIndex - 1);
                }
              }
            }}>
            
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                transition={{
                  duration: 0.2
                }}
                src={
                product.images[activeImageIndex] ||
                'https://via.placeholder.com/800x1200?text=No+Image'
                }
                alt={product.name}
                className="w-full h-full object-cover" />
              
            </AnimatePresence>
            {/* Arrow Navigation */}
            {product.images.length > 1 &&
            <>
                {activeImageIndex > 0 &&
              <button
                onClick={() => setActiveImageIndex(activeImageIndex - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm w-10 h-10 flex items-center justify-center hover:bg-white transition-colors">
                
                    <ChevronLeft size={20} />
                  </button>
              }
                {activeImageIndex < product.images.length - 1 &&
              <button
                onClick={() => setActiveImageIndex(activeImageIndex + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm w-10 h-10 flex items-center justify-center hover:bg-white transition-colors">
                
                    <ChevronRight size={20} />
                  </button>
              }
                {/* Dot Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, idx) =>
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${idx === activeImageIndex ? 'bg-brand-gold' : 'bg-white/60'}`} />

                )}
                </div>
              </>
            }
          </div>
          {product.images.length > 1 &&
          <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, idx) =>
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`aspect-square overflow-hidden border-2 transition-colors ${activeImageIndex === idx ? 'border-brand-gold' : 'border-transparent hover:border-gray-300'}`}>
              
                  <img
                src={img}
                alt={`${product.name} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover" />
              
                </button>
            )}
            </div>
          }
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 text-sm font-bold uppercase tracking-widest text-brand-gold">
            {product.category}
          </div>
          <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-medium text-brand-dark">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-sm text-brand-grayDark">
                ({reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="prose prose-sm text-brand-grayDark mb-10">
            <p className="leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4 mt-auto">
            <button
              onClick={() => addToCart(product.id)}
              className="w-full flex items-center justify-center gap-2 bg-brand-dark text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors duration-300">
              
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-colors duration-300">
              
              <MessageCircle size={18} /> Enquire on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-gray-200 pt-16">
        <h2 className="text-3xl font-serif font-bold text-brand-dark mb-12 text-center">
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Review Form */}
          <div className="lg:col-span-1">
            <div className="bg-brand-gray p-6">
              <h3 className="font-serif text-xl font-bold mb-6">
                Write a Review
              </h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={reviewForm.email}
                    onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      email: e.target.value
                    })
                    }
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:border-brand-gold bg-white"
                    placeholder="your@email.com" />
                  
                  <p className="text-xs text-gray-500 mt-1">
                    Only your name will be displayed.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Rating
                  </label>
                  <StarRating
                    rating={reviewForm.rating}
                    readonly={false}
                    size={24}
                    onChange={(r) =>
                    setReviewForm({
                      ...reviewForm,
                      rating: r
                    })
                    } />
                  
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewForm.comment}
                    onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      comment: e.target.value
                    })
                    }
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:border-brand-gold bg-white resize-none"
                    placeholder="What do you think about this product?" />
                  
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-dark text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors">
                  
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-8">
            {reviews.length === 0 ?
            <p className="text-brand-grayDark italic">
                No reviews yet. Be the first to review this product!
              </p> :

            reviews.map((review) =>
            <div
              key={review.id}
              className="border-b border-gray-200 pb-8 last:border-0">
              
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold text-brand-dark mr-3 capitalize">
                        {extractNameFromEmail(review.email)}
                      </span>
                      <span className="text-sm text-brand-grayDark">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <StarRating rating={review.rating} size={14} />
                  </div>
                  <p className="text-brand-dark mb-4">{review.comment}</p>

                  {review.adminReply &&
              <div className="ml-8 bg-brand-gray p-4 border-l-2 border-brand-gold">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-brand-gold text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                          Admin
                        </span>
                      </div>
                      <p className="text-sm text-brand-dark">
                        {review.adminReply}
                      </p>
                    </div>
              }
                </div>
            )
            }
          </div>
        </div>
      </div>
    </motion.div>);

};