import React from 'react';
import { cn } from '@/utils/cn';

interface ChartTooltipProps {
  title: string;
  value: string | number;
  label?: string;
  color?: string;
  className?: string;
}

export function ChartTooltip({ 
  title, 
  value, 
  label,
  color = '#17D9FF',
  className 
}: ChartTooltipProps) {
  return (
    <div className={cn(
      "px-3 py-2 rounded-lg",
      "bg-black/90 backdrop-blur-sm",
      "border border-white/10",
      "shadow-lg",
      className
    )}>
      <div className="flex items-center gap-2 mb-1">
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-medium text-white">{title}</span>
      </div>
      <div className="text-lg font-bold text-white">
        {value}
        {label && (
          <span className="text-sm font-normal text-gray-400 ml-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}