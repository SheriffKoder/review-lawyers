import React from 'react';
import { cn } from '@/utils/cn';

interface ScaleOnHoverProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

export function ScaleOnHover({ 
  children, 
  className,
  scale = 1.05,
  duration = 0.2
}: ScaleOnHoverProps) {
  const style = {
    '--scale': scale,
    '--duration': `${duration}s`
  } as React.CSSProperties;

  return (
    <div 
      className={cn(
        "transition-transform",
        "hover:scale-[var(--scale)]",
        "duration-[var(--duration)]",
        "ease-[cubic-bezier(0.34,1.56,0.64,1)]", // Bounce effect
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}