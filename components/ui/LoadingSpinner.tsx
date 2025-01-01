import React from 'react';
import { cn } from '@/utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div className={cn(
      "spinner",
      size === 'sm' && "w-6 h-6",
      size === 'md' && "w-8 h-8",
      size === 'lg' && "w-12 h-12",
      className
    )}>
      <div className="spinnerin" />
    </div>
  );
}