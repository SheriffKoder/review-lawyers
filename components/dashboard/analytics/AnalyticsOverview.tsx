import React from 'react';
import { Star, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/utils/cn';
import { StatCard } from './StatCard';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsOverviewProps {
  className?: string;
}

export function AnalyticsOverview({ className }: AnalyticsOverviewProps) {
  const { stats } = useAnalytics();

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      <StatCard
        title="Overall Rating"
        value={4.8}
        icon={Star}
        trend={{ value: 12, isPositive: true }}
        color="primary"
      />
      <StatCard
        title="Active Reviews"
        value={1284}
        icon={Users}
        trend={{ value: 8, isPositive: true }}
        color="success"
      />
      <StatCard
        title="Pending Cases"
        value={5}
        icon={AlertTriangle}
        trend={{ value: 2, isPositive: false }}
        color="warning"
      />
      <StatCard
        title="Success Rate"
        value="92%"
        icon={TrendingUp}
        trend={{ value: 5, isPositive: true }}
        color="info"
      />
    </div>
  );
}