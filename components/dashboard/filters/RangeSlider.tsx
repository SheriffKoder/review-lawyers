import React from 'react';
import { cn } from '@/utils/cn';

interface RangeSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function RangeSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  prefix,
  suffix,
  className
}: RangeSliderProps) {
  const percentage = (val: number) => ((val - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative h-2 bg-white/10 rounded-full">
        <div
          className="absolute h-full bg-primary rounded-full"
          style={{
            left: `${percentage(value[0])}%`,
            right: `${100 - percentage(value[1])}%`
          }}
        />
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => onChange([Number(e.target.value), value[1]])}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => onChange([value[0], Number(e.target.value)])}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex justify-between text-sm text-gray-400">
        <span>{prefix}{value[0]}{suffix}</span>
        <span>{prefix}{value[1]}{suffix}</span>
      </div>
    </div>
  );
}