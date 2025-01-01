import React from 'react';
import { cn } from '@/utils/cn';

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'hero' | 'primary' | 'secondary' | 'dark';
  animated?: boolean;
}

export function GradientBackground({ 
  children, 
  className,
  variant = 'primary',
  animated = true
}: GradientBackgroundProps) {
  return (
    <div className={cn(
      "relative overflow-hidden",
      // Hero variant with more complex gradient
      variant === 'hero' && [
        "bg-gradient-to-b from-black via-black/90 to-black",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-primary/10 before:via-transparent before:to-primary/10",
        animated && "before:animate-gradient-shift"
      ],
      // Other variants
      variant === 'primary' && "bg-gradient-to-br from-black via-primary/10 to-black",
      variant === 'secondary' && "bg-gradient-to-br from-black via-blue-500/10 to-black",
      variant === 'dark' && "bg-gradient-to-b from-black via-gray-900/50 to-black",
      className
    )}>
      {/* Animated glow overlay */}
      {animated && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-1000" />
      )}
      
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}