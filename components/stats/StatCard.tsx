import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { AnimatedNumber } from '../animations/AnimatedNumber';
import { TrendIndicator } from './TrendIndicator';
import { MiniGraph } from './MiniGraph';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    data?: number[];
  };
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  className 
}: StatCardProps) {
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const isPercentage = typeof value === 'string' && value.includes('%');

  return (
    <div 
      className={cn(
        // Base card styles
        "w-[250px] h-[150px] p-5",
        "bg-black/50 backdrop-blur-sm",
        "border border-white/10",
        "rounded-xl",
        // Hover effects
        "hover:border-primary/50",
        "hover:shadow-lg hover:shadow-primary/10",
        "hover:-translate-y-1",
        "group transition-all duration-300",
        // Flex layout
        "flex flex-col justify-between",
        // Divider styles
        "relative",
        "after:absolute after:right-0 after:top-1/4 after:h-1/2",
        "after:w-px after:bg-white/10",
        "last:after:hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icon className="w-8 h-8 text-primary transition-all duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        </div>
        {trend && <TrendIndicator {...trend} />}
      </div>

      {/* Value */}
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-white">
          <AnimatedNumber 
            value={numericValue}
            formatter={(val) => isPercentage ? `${val.toFixed(0)}%` : val.toLocaleString()}
          />
        </p>
        
        {/* Mini Graph */}
        {trend?.data && (
          <MiniGraph 
            data={trend.data}
            color={trend.isPositive ? '#4ADE80' : '#F87171'}
            height={24}
            className="w-24 opacity-50 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>
    </div>
  );
}