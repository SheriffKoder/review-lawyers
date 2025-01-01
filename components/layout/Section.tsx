import React from 'react';
import { cn } from '@/utils/cn';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Section({ children, className, size = 'md' }: SectionProps) {
  return (
    <section className={cn(
      size === 'sm' && 'section-sm',
      size === 'md' && 'section',
      size === 'lg' && 'section-lg',
      className
    )}>
      {children}
    </section>
  );
}