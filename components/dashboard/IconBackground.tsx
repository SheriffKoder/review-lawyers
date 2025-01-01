import React from 'react';
import { cn } from '@/utils/cn';

interface IconBackgroundProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function IconBackground({ 
  children, 
  color = 'primary',
  className 
}: IconBackgroundProps) {
  return (
    <div className={cn(
      "relative group",
      className
    )}>
      {/* Radial gradient background */}
      <div className={cn(
        "absolute inset-0 rounded-full transition-opacity duration-300",
        "opacity-20 group-hover:opacity-30",
        color === 'primary' && "bg-radial-primary",
        color === 'warning' && "bg-radial-warning",
        color === 'success' && "bg-radial-success",
        color === 'info' && "bg-radial-info"
      )} />
      
      {/* Icon */}
      <div className="relative p-3">
        {children}
      </div>
    </div>
  );
}