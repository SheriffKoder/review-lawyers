import React, { useState } from 'react';
import { PieChart } from '../charts/PieChart';
import { LineChart } from '../charts/LineChart';
import { BarChart } from '../charts/BarChart';
import { ChartFilters } from './ChartFilters';
import { StatusLegend } from './StatusLegend';
import { STATUS_COLORS } from '../charts/ChartConfig';
import { cn } from '@/utils/cn';

interface ChartSectionProps {
  className?: string;
}

export function ChartSection({ className }: ChartSectionProps) {
  const [timeRange, setTimeRange] = useState('week');
  const [caseType, setCaseType] = useState('all');

  const timeRangeOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const caseTypeOptions = [
    { value: 'all', label: 'All Cases', count: 100 },
    { value: 'resolved', label: 'Resolved', count: 30 },
    { value: 'active', label: 'Active', count: 40 },
    { value: 'pending', label: 'Pending', count: 30 }
  ];

  const statusItems = [
    { label: 'Resolved Cases', color: STATUS_COLORS.resolved, count: 30 },
    { label: 'Active Cases', color: STATUS_COLORS.active, count: 40 },
    { label: 'Pending Cases', color: STATUS_COLORS.pending, count: 30 }
  ];

  const caseDistribution = {
    data: [30, 40, 30],
    labels: ['Resolved', 'Active', 'Pending'],
    colors: [STATUS_COLORS.resolved, STATUS_COLORS.active, STATUS_COLORS.pending]
  };

  const trendData = {
    data: [45, 52, 49, 62, 58, 55, 60],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ChartFilters
          options={timeRangeOptions}
          value={timeRange}
          onChange={setTimeRange}
        />
        <ChartFilters
          options={caseTypeOptions}
          value={caseType}
          onChange={setCaseType}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Case Distribution</h3>
            <StatusLegend items={statusItems} />
          </div>
          <PieChart {...caseDistribution} />
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Case Trend</h3>
          <LineChart {...trendData} />
        </div>
      </div>
    </div>
  );
}