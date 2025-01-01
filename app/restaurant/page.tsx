"use client"
import React from 'react';
import { Star, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { InteractiveStats } from '@/components/dashboard/InteractiveStats';
import { InteractiveChart } from '@/components/dashboard/InteractiveChart';
import { ReviewCard } from '@/components/dashboard/ReviewCard';
import { restaurantChartData } from '@/data/chartData';
import { restaurantReviews } from '@/data/reviewData';
import { Button } from '@/components/ui/Button';
import { redirect } from 'next/navigation';
// import { useNavigate } from 'react-router-dom';

export default function RestaurantsPage() {
//   const navigate = useNavigate();
  const stats = [
    {
      title: "Average Rating",
      value: "4.6",
      icon: Star,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Total Reviews",
      value: "2,547",
      icon: Users,
      trend: { value: 15, isPositive: true }
    },
    {
      title: "Review Alerts",
      value: "5",
      icon: AlertTriangle,
      trend: { value: 3, isPositive: false }
    },
    {
      title: "Response Rate",
      value: "95%",
      icon: TrendingUp,
      trend: { value: 4, isPositive: true }
    }
  ];

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Restaurant Dashboard</h1>
          <Button onClick={() => redirect('/free-trial')}>
            Start Free Trial
          </Button>
        </div>
        
        <InteractiveStats stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <InteractiveChart 
              data={restaurantChartData} 
              title="Review Analytics"
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {restaurantReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}