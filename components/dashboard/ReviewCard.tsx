import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ReviewCardProps {
  review: {
    author: string;
    rating: number;
    date: string;
    content: string;
    platform: string;
  };
  tempReviews?: any[];
  tempListings?: any[];
}

export function ReviewCard({ review, tempReviews, tempListings }: ReviewCardProps) {

  // console.log(tempReviews[1])



    if (!tempReviews?.length) {
      return <div></div>;
    } else {
      return (
        tempReviews.map((review) => (
          <div key={review.id} className="dashboardReview group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                {review.type}
              </span>
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                {review.submittedAt}
              </span>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4 transition-all",
                    i < (review.rating / 2)  // Divide the 0-10 rating by 2
                      ? "text-yellow-400 group-hover:text-yellow-300 group-hover:scale-110" 
                      : "text-gray-600"
                  )}
                  fill={i < (review.rating / 2) ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>
          
          <h3 className="font-medium text-white mb-2 group-hover:text-primary transition-colors">
            {review.guestName}
          </h3>
          
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors dashboardReview_text">
            {review.publicReview}
          </p>
        </div>
    
    
    
    
        ))
    
    
    
      );
    }


}