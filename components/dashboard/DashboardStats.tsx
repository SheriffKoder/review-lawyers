import React, { useEffect, useState } from 'react';
import { Star, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { useBusinessData } from '@/hooks/useBusinessData';

interface DashboardStatsProps {
  businessType: 'rental' | 'restaurant';
  platform: string;
  rating: number | null;
  dateRange: { start: Date; end: Date };
  listings: any[];
  reviews: any[];
  tempListings: any[];
  tempReviews: any[];
}

export function DashboardStats({ businessType, platform, rating, dateRange, listings, reviews, tempListings, tempReviews }: DashboardStatsProps) {
  
  
  const { stats } = useBusinessData({ businessType, platform, rating });

  // console.log(tempListings[0] );

  const [averageRating, setAverageRating] = useState(0);


  useEffect(() => {
    if (tempListings && tempListings.length > 0) {
      // Calculate the average rating
      const totalRating = tempListings.reduce((sum, review) => sum + (review.averageReviewRating || 0), 0);
      const avg = totalRating / tempListings.length;

      setAverageRating(avg);
    } else {
      setAverageRating(0); // Reset if no reviews
    }
  }, [tempListings]); // Run the effect whenever tempReviews changes




  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <DashboardCard
        title="Average Listing Rating"
        value={averageRating}
        icon={Star}
        trend={stats.rating.trend}
        color="primary"
      />
      <DashboardCard
        title="Active Reviews"
        value={tempReviews.length}
        icon={Users}
        trend={stats.reviews.trend}
        color="success"
      />
      {/* <DashboardCard
        title="Review Alerts"
        value={stats.alerts.value}
        icon={AlertTriangle}
        trend={stats.alerts.trend}
        color="warning"
      /> */}
      {/* <DashboardCard
        title="Response Rate"
        value={stats.responseRate.value}
        icon={TrendingUp}
        trend={stats.responseRate.trend}
        color="info"
      /> */}
    </div>
  );
}