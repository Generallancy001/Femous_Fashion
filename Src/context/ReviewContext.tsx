import React, { useEffect, useState, createContext, useContext } from 'react';
import { Review } from '../types';
interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  addAdminReply: (reviewId: string, reply: string) => void;
  getReviewsByProduct: (productId: string) => Review[];
}
const ReviewContext = createContext<ReviewContextType | undefined>(undefined);
export const ReviewProvider = ({ children }: {children: ReactNode;}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem('femous_reviews');
    if (stored) {
      setReviews(JSON.parse(stored));
    }
  }, []);
  const saveReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    localStorage.setItem('femous_reviews', JSON.stringify(newReviews));
  };
  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      date: Date.now()
    };
    saveReviews([newReview, ...reviews]);
  };
  const addAdminReply = (reviewId: string, reply: string) => {
    saveReviews(
      reviews.map((r) =>
      r.id === reviewId ?
      {
        ...r,
        adminReply: reply
      } :
      r
      )
    );
  };
  const getReviewsByProduct = (productId: string) => {
    return reviews.
    filter((r) => r.productId === productId).
    sort((a, b) => b.date - a.date);
  };
  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        addAdminReply,
        getReviewsByProduct
      }}>
      
      {children}
    </ReviewContext.Provider>);

};
export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) throw new Error('useReviews must be used within ReviewProvider');
  return context;
};