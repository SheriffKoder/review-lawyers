import React from 'react';
import { cn } from '@/utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animate?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  color = 'primary',
  size = 'md',
  showLabel = true,
  animate = true,
  className
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm font-medium text-white">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}

      <div className={cn(
        "relative w-full overflow-hidden rounded-full bg-white/10",
        size === 'sm' && "h-1",
        size === 'md' && "h-2",
        size === 'lg' && "h-3"
      )}>
        <div
          className={cn(
            "h-full transition-all duration-500",
            animate && "animate-[progress_1s_ease-in-out]",
            color === 'primary' && "bg-primary",
            color === 'success' && "bg-green-500",
            color === 'warning' && "bg-yellow-500",
            color === 'error' && "bg-red-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}