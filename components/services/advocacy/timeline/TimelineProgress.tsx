import React from 'react';
import { cn } from '@/utils/cn';

interface TimelineProgressProps {
  progress: number;
  className?: string;
}

export function TimelineProgress({ progress, className }: TimelineProgressProps) {
  return (
    <div className={cn("relative h-0.5", className)}>
      {/* Background line */}
      <div className="absolute inset-0 bg-white/10">
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse" />
      </div>

      {/* Progress line */}
      <div 
        className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
        style={{ width: `${progress}%` }}
      >
        {/* Moving glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>
    </div>
  );
}