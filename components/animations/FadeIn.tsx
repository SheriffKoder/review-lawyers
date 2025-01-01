import React from 'react';
import { cn } from '@/utils/cn';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  threshold?: number;
}

export function FadeIn({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1
}: FadeInProps) {
  const { elementRef, isInView } = useIntersectionObserver({ threshold });

  return (
    <div
    // @ts-ignore
      ref={elementRef}
      className={cn(
        'opacity-0',
        isInView && 'animate-fade-in',
        className
      )}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  );
}