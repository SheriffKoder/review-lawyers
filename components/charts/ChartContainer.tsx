import React from 'react';
import { ResponsiveChart } from './ResponsiveChart';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { cn } from '@/utils/cn';

interface ChartContainerProps {
  title: string;
  children: (width: number, height: number) => React.ReactNode;
  isLoading?: boolean;
  aspectRatio?: number;
  className?: string;
}

export function ChartContainer({
  title,
  children,
  isLoading,
  aspectRatio,
  className
}: ChartContainerProps) {
  return (
    <div className={cn(
      "bg-white/5 backdrop-blur-sm",
      "border border-white/10 rounded-xl",
      "p-6",
      className
    )}>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg z-10">
            <LoadingSpinner size="lg" />
          </div>
        )}
        
        <ResponsiveChart aspectRatio={aspectRatio}>
          {children}
        </ResponsiveChart>
      </div>
    </div>
  );
}