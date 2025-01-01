import React from 'react';
import { cn } from '@/utils/cn';

interface StatusItem {
  label: string;
  color: string;
  count?: number;
}

interface StatusLegendProps {
  items: StatusItem[];
  className?: string;
}

export function StatusLegend({ items, className }: StatusLegendProps) {
  return (
    <div className={cn(
      "flex flex-wrap items-center gap-4",
      className
    )}>
      {items.map((item) => (
        <div 
          key={item.label}
          className="flex items-center gap-2"
        >
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-gray-400">
            {item.label}
            {item.count !== undefined && (
              <span className="ml-1 text-white">
                ({item.count})
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}