import React from 'react';
import { DateRangeSelector } from './DateRangeSelector';
import { ReportsButton } from './ReportsButton';
import { Button } from '../ui/Button';
import { redirect } from 'next/navigation';
import { cn } from '@/utils/cn';

interface DashboardHeaderProps {
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
  className?: string;
}

export function DashboardHeader({ onDateRangeChange, className }: DashboardHeaderProps) {
   

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-white">Dashboard Demo</h1>
        <div className="flex items-center gap-4">
          <ReportsButton />
          <Button 
            onClick={() => redirect('/free-trial')}
            className="bg-primary text-black hover:bg-primary/90"
          >
            Start Free Trial
          </Button>
        </div>
      </div>

      <DateRangeSelector onRangeChange={onDateRangeChange} />
    </div>
  );
}