import React from 'react';
import { useBusinessData } from '@/hooks/useBusinessData';
import { ActiveCase } from './ActiveCase';
import { ReviewCard } from './ReviewCard';

interface ReviewManagementProps {
  businessType: 'rental' | 'restaurant';
  platform: string;
  rating: number | null;
}

export function ReviewManagement({ businessType, platform, rating }: ReviewManagementProps) {
  const { reviews } = useBusinessData({ businessType, platform, rating });
  const activeCase = reviews[0];

  const handleResolveCase = (review: any) => {
    console.log('Resolving case:', review);
  };

  return (
    <div className="space-y-8">
      {activeCase && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Latest Active Case</h2>
            <span className="text-sm text-primary">
              Response time: 2-4 hours
            </span>
          </div>
          <ActiveCase 
            review={activeCase}
            onResolve={handleResolveCase}
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Other Active Cases</h2>
          <button className="text-primary hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {reviews.slice(1).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}