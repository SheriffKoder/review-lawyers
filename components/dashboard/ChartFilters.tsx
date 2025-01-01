import React from 'react';
import { cn } from '@/utils/cn';
import { SavedFilters } from './SavedFilters';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface ChartFiltersProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ChartFilters({ 
  options, 
  value, 
  onChange,
  className 
}: ChartFiltersProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className={cn(
        "flex flex-wrap gap-2",
      )}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg",
              "text-sm font-medium",
              "transition-all duration-200",
              "flex items-center gap-2",
              value === option.value ? [
                "bg-primary text-black",
                "shadow-lg shadow-primary/25"
              ] : [
                "bg-white/5 text-gray-400",
                "hover:bg-white/10 hover:text-white",
                "border border-white/10"
              ]
            )}
          >
            {option.label}
            {option.count !== undefined && (
              <span className={cn(
                "px-1.5 py-0.5 rounded-full text-xs",
                value === option.value ? "bg-black/20" : "bg-white/10"
              )}>
                {option.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <SavedFilters
        currentFilter={value}
        onFilterSelect={onChange}
        className="pt-2"
      />
    </div>
  );
}