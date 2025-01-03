import React from 'react';
import { DateRangeSelector } from './DateRangeSelector';
import { ReportsButton } from './ReportsButton';
import { Button } from '../ui/Button';
import { redirect } from 'next/navigation';
import { cn } from '@/utils/cn';

interface DashboardHeaderProps {
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
  className?: string;
  reviews_temp_switch: (reviews: any[]) => void;
  tempReviews: any[];
}

export function DashboardHeader({ onDateRangeChange, className, reviews_temp_switch, tempReviews }: DashboardHeaderProps) {
   

  return (
    <div className={cn("space-y-6", className)}>


      <DateRangeSelector onRangeChange={onDateRangeChange} reviews_temp_switch={reviews_temp_switch} tempReviews={tempReviews}
      />
    </div>
  );
}