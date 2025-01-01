"use client"
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { WidgetGrid } from '@/components/dashboard/widgets/WidgetGrid';
import { AchievementsSection } from '@/components/dashboard/achievements/AchievementsSection';
import { ProgressSection } from '@/components/dashboard/progress/ProgressSection';
import { ChallengesSection } from '@/components/dashboard/challenges/ChallengesSection';
import { PointsSummary } from '@/components/dashboard/points/PointsSummary';
import { BusinessTypeToggle } from '@/components/dashboard/BusinessTypeToggle';
import { ReviewFilters } from '@/components/dashboard/filters/ReviewFilters';

export default function DashboardPage() {
  // Business type toggle
  const [businessType, setBusinessType] = useState<'rental' | 'restaurant'>('rental');
  
  // Global filters
  const [platform, setPlatform] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  
  // Date range
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date()
  });

  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    setDateRange(range);
  };

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Business Type Toggle */}
        <div className="flex justify-between items-center mb-8">
          <DashboardHeader onDateRangeChange={handleDateRangeChange} />
          <BusinessTypeToggle 
            type={businessType}
            onChange={setBusinessType}
          />
        </div>

        {/* Global Filters */}
        <ReviewFilters
          platform={platform}
          rating={rating}
          onPlatformChange={setPlatform}
          onRatingChange={setRating}
          className="mb-8"
        />

        {/* Dashboard Content */}
        <DashboardStats 
          dateRange={dateRange} 
          businessType={businessType}
          platform={platform}
          rating={rating}
        />
        
        <WidgetGrid 
          className="mt-8" 
          // businessType={businessType}
          // platform={platform}
          // rating={rating}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <ChallengesSection 
              // businessType={businessType}
              // platform={platform}
              // rating={rating}
            />
          </div>
          <div className="space-y-8">
            <PointsSummary />
            <ProgressSection 
              // businessType={businessType}
              // platform={platform}
              // rating={rating}
            />
          </div>
        </div>
        
        <div className="mt-8">
          <AchievementsSection />
        </div>
        
        <DashboardTabs 
          className="mt-8" 
          businessType={businessType}
          platform={platform}
          rating={rating}
        />
      </div>
    </main>
  );
}