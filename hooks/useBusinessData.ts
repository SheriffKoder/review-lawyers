// @ts-nocheck
import { useMemo } from 'react';
import { rentalChartData, restaurantChartData } from '@/data/chartData';
import { rentalReviews, restaurantReviews } from '@/data/reviewData';
import { useFilteredReviews } from './useFilteredReviews';

interface UseBusinessDataProps {
  businessType: 'rental' | 'restaurant';
  platform?: string;
  rating?: number | null;
}

export function useBusinessData({ businessType, platform = '', rating = null }: UseBusinessDataProps) {
  const baseData = useMemo(() => {
    return businessType === 'rental' 
      ? { chartData: rentalChartData, reviews: rentalReviews }
      : { chartData: restaurantChartData, reviews: restaurantReviews };
  }, [businessType]);

  const filteredReviews = useFilteredReviews(baseData.reviews, platform, rating);

  // Calculate stats based on filtered reviews
  const stats = useMemo(() => {
    const avgRating = filteredReviews.reduce((acc, r) => acc + r.rating, 0) / filteredReviews.length;
    
    return {
      rating: { 
        value: avgRating.toFixed(1), 
        trend: { value: 8, isPositive: true } 
      },
      reviews: { 
        value: filteredReviews.length.toString(), 
        trend: { value: 15, isPositive: true } 
      },
      alerts: { 
        value: Math.floor(filteredReviews.length * 0.1).toString(), 
        trend: { value: 3, isPositive: false } 
      },
      responseRate: { 
        value: "95%", 
        trend: { value: 4, isPositive: true } 
      }
    };
  }, [filteredReviews]);

  return {
    stats,
    chartData: baseData.chartData,
    reviews: filteredReviews
  };
}