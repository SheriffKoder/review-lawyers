import React from 'react';
import { cn } from '@/utils/cn';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  threshold = 0.1
}: StaggerChildrenProps) {
  const { elementRef, isInView } = useIntersectionObserver({ threshold });

  return (
    <div
      ref={elementRef as React.Ref<HTMLDivElement>}
      className={cn(
        isInView && 'stagger-children',
        className
      )}
      style={{
        '--stagger-delay': `${staggerDelay}s`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}