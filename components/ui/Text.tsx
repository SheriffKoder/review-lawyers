// @ts-nocheck
import React from 'react';
import { cn } from '@/utils/cn';

interface TextProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'base' | 'lg';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function Text({ 
  children, 
  variant = 'primary',
  size = 'base',
  className,
  as: Component = 'p'
}: TextProps) {
  return (
    <Component
      className={cn(
        // Base styles
        "transition-colors duration-200",
        
        // Size variants
        size === 'sm' && "text-sm",
        size === 'base' && "text-base",
        size === 'lg' && "text-lg",
        
        // Color variants with improved contrast
        variant === 'primary' && "text-[var(--text-primary)]",
        variant === 'secondary' && "text-[var(--text-secondary)]",
        variant === 'tertiary' && "text-[var(--text-tertiary)]",
        
        className
      )}
    >
      {children}
    </Component>
  );
}