import React from 'react';
import { cn } from '@/utils/cn';

interface LoadingStatsProps {
  count?: number;
  className?: string;
}

export function LoadingStats({ count = 4, className }: LoadingStatsProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
      className
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-[150px] p-6 rounded-xl",
            "bg-white/5 animate-pulse",
            "border border-white/10"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-white/10 rounded" />
                <div className="h-3 w-16 bg-white/10 rounded" />
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <div className="h-8 w-32 bg-white/10 rounded mt-6" />
          </div>
        </div>
      ))}
    </div>
  );
}