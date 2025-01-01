import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { AnimatedNumber } from '@/components/animations/AnimatedNumber';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'info';
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  color = 'primary',
  className 
}: StatCardProps) {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const isPercentage = typeof value === 'string' && value.includes('%');

  return (
    <div className={cn(
      "relative group p-6 rounded-xl",
      "bg-white/5 backdrop-blur-sm",
      "border border-white/10",
      "hover:border-primary/50",
      "transition-all duration-300",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
            {title}
          </p>
          <p className="text-2xl font-bold text-white mt-2 group-hover:text-primary transition-colors">
            <AnimatedNumber 
              value={numericValue}
              formatter={(val) => isPercentage ? `${val.toFixed(0)}%` : val.toLocaleString()}
            />
          </p>
          {trend && (
            <p className={cn(
              "text-sm mt-2 flex items-center gap-1 transition-colors",
              trend.isPositive ? "text-green-400 group-hover:text-green-300" : "text-red-400 group-hover:text-red-300"
            )}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg transition-all duration-300 group-hover:scale-110",
          color === 'primary' && "bg-primary/20",
          color === 'success' && "bg-green-500/20",
          color === 'warning' && "bg-yellow-500/20",
          color === 'info' && "bg-blue-500/20"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            color === 'primary' && "text-primary",
            color === 'success' && "text-green-500",
            color === 'warning' && "text-yellow-500",
            color === 'info' && "text-blue-500"
          )} />
        </div>
      </div>
    </div>
  );
}