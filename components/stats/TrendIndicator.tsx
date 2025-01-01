import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TrendIndicatorProps {
  value: number;
  isPositive: boolean;
  className?: string;
}

export function TrendIndicator({ value, isPositive, className }: TrendIndicatorProps) {
  return (
    <div className={cn(
      "flex items-center gap-1 text-sm font-medium",
      "transition-all duration-300",
      isPositive ? "text-green-400" : "text-red-400",
      className
    )}>
      {isPositive ? (
        <TrendingUp className="w-4 h-4 animate-pulse" />
      ) : (
        <TrendingDown className="w-4 h-4 animate-pulse" />
      )}
      <span>{Math.abs(value)}%</span>
    </div>
  );
}