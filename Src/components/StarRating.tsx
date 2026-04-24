import React from 'react';
import { Star } from 'lucide-react';
interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}
export const StarRating = ({
  rating,
  max = 5,
  size = 16,
  onChange,
  readonly = true
}: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({
        length: max
      }).map((_, i) => {
        const filled = i < rating;
        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(i + 1)}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'}`}>
            
            <Star
              size={size}
              className={`${filled ? 'fill-brand-gold text-brand-gold' : 'text-gray-300'} transition-colors`} />
            
          </button>);

      })}
    </div>);

};