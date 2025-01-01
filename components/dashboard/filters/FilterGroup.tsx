import React from 'react';
import { cn } from '@/utils/cn';
import { RangeSlider } from './RangeSlider';
import { Select } from './Select';
import { Checkbox } from './Checkbox';

interface FilterGroupProps {
  title: string;
  type: 'range' | 'select' | 'checkbox';
  value?: number[] | string | string[];
  onChange: (value: any) => void;
  options?: Array<{ label: string; value: string }>;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function FilterGroup({
  title,
  type,
  value,
  onChange,
  options = [],
  min,
  max,
  step,
  prefix,
  suffix,
  className
}: FilterGroupProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-medium text-gray-400">{title}</h4>
      
      {type === 'range' && (
        <RangeSlider
          value={value as number[]}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          prefix={prefix}
          suffix={suffix}
        />
      )}

      {type === 'select' && (
        <Select
          options={options}
          value={value as string}
          onChange={onChange}
        />
      )}

      {type === 'checkbox' && (
        <div className="space-y-2">
          {options.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={(value as string[])?.includes(option.value)}
              onChange={(checked) => {
                const newValue = checked
                  ? [...(value as string[]), option.value]
                  : (value as string[]).filter(v => v !== option.value);
                onChange(newValue);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}