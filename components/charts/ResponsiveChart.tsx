import React, { useRef } from 'react';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import { cn } from '@/utils/cn';

interface ResponsiveChartProps {
  children: (width: number, height: number) => React.ReactNode;
  aspectRatio?: number;
  className?: string;
}

export function ResponsiveChart({
  children,
  aspectRatio = 16/9,
  className
}: ResponsiveChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  useResizeObserver(containerRef, (entry) => {
    const { width } = entry.contentRect;
    const height = width / aspectRatio;
    setDimensions({ width, height });
  });

  return (
    <div 
      ref={containerRef}
      className={cn("w-full relative", className)}
      style={{ height: dimensions.height }}
    >
      {dimensions.width > 0 && children(dimensions.width, dimensions.height)}
    </div>
  );
}