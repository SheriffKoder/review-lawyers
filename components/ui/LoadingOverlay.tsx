import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '@/utils/cn';

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export function LoadingOverlay({ 
  isLoading, 
  children,
  className 
}: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      
      {isLoading && (
        <div className={cn(
          "absolute inset-0",
          "flex items-center justify-center",
          "bg-black/50 backdrop-blur-sm",
          "rounded-lg",
          "transition-opacity duration-200",
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <LoadingSpinner size="lg" />
        </div>
      )}
    </div>
  );
}