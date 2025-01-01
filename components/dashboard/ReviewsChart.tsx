import React from 'react';
import { ChartStats } from './chart/ChartStats';
import { calculatePercentageChange } from '@/utils/numbers';
import type { ChartDataPoint } from '@/types/chart';

interface ReviewsChartProps {
  data: ChartDataPoint[];
}

export function ReviewsChart({ data }: ReviewsChartProps) {
  // Ensure we have at least 2 data points for comparison
  const latestMonth = data[data.length - 1] || { total: 0, positive: 0, negative: 0, removed: 0 };
  const previousMonth = data[data.length - 2] || { total: 0, positive: 0, negative: 0, removed: 0 };
  
  const monthlyChange = {
    total: calculatePercentageChange(latestMonth.total, previousMonth.total),
    positive: calculatePercentageChange(latestMonth.positive, previousMonth.positive),
    negative: calculatePercentageChange(latestMonth.negative, previousMonth.negative),
    removed: calculatePercentageChange(latestMonth.removed, previousMonth.removed)
  };

  return (
    <div className="space-y-6">
      <ChartStats monthlyChange={monthlyChange} latestData={latestMonth} />
      {/* Chart rendering code... */}
    </div>
  );
}