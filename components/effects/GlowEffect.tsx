import React from 'react';
import { cn } from '@/utils/cn';

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function GlowEffect({ 
  children, 
  className,
  color = 'primary'
}: GlowEffectProps) {
  return (
    <div className={cn(
      "relative group",
      className
    )}>
      {/* Glow backdrop */}
      <div className={cn(
        "absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur-lg",
        color === 'primary' && "bg-primary/20",
        color === 'blue' && "bg-blue-500/20",
        color === 'purple' && "bg-purple-500/20"
      )} />
      
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}