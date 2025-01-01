import React from 'react';
import { cn } from '@/utils/cn';

interface StackProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Stack({ children, className, size = 'md' }: StackProps) {
  return (
    <div className={cn(
      size === 'sm' && 'stack-sm',
      size === 'md' && 'stack',
      size === 'lg' && 'stack-lg',
      className
    )}>
      {children}
    </div>
  );
}