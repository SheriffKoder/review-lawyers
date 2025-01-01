import React from 'react';
import { cn } from '@/utils/cn';

interface MiniGraphProps {
  data: number[];
  color: string;
  height?: number;
  className?: string;
}

export function MiniGraph({ data, color, height = 32, className }: MiniGraphProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((value - min) / range) * height;
    return `${x},${height - y}`;
  }).join(' ');

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="transition-all duration-300"
      >
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
}