import { useMemo } from 'react';
import type { Review } from '@/types/review';

export function useFilteredReviews(
  reviews: Review[],
  platform: string,
  rating: number | null
) {
  return useMemo(() => {
    return reviews.filter((review) => {
      const platformMatch = !platform || review.platform === platform;
      const ratingMatch = rating === null || review.rating === rating;
      return platformMatch && ratingMatch;
    });
  }, [reviews, platform, rating]);
}