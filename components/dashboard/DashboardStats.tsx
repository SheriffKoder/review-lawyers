import React from 'react';
import { Star, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { useBusinessData } from '@/hooks/useBusinessData';

interface DashboardStatsProps {
  businessType: 'rental' | 'restaurant';
  platform: string;
  rating: number | null;
  dateRange: { start: Date; end: Date };
}

export function DashboardStats({ businessType, platform, rating, dateRange }: DashboardStatsProps) {
  const { stats } = useBusinessData({ businessType, platform, rating });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard
        title="Overall Rating"
        value={stats.rating.value}
        icon={Star}
        trend={stats.rating.trend}
        color="primary"
      />
      <DashboardCard
        title="Active Reviews"
        value={stats.reviews.value}
        icon={Users}
        trend={stats.reviews.trend}
        color="success"
      />
      <DashboardCard
        title="Review Alerts"
        value={stats.alerts.value}
        icon={AlertTriangle}
        trend={stats.alerts.trend}
        color="warning"
      />
      <DashboardCard
        title="Response Rate"
        value={stats.responseRate.value}
        icon={TrendingUp}
        trend={stats.responseRate.trend}
        color="info"
      />
    </div>
  );
}