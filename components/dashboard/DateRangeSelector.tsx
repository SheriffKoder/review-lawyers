// @ts-nocheck
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DateRangeProps {
  onRangeChange: (range: { start: Date; end: Date }) => void;
  className?: string;
}

const PRESET_RANGES = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
  { label: 'Year to date', days: 'ytd' },
  { label: 'Custom', days: 'custom' }
] as const;

export function DateRangeSelector({ onRangeChange, className }: DateRangeProps) {
  const [selectedRange, setSelectedRange] = useState(PRESET_RANGES[1].label);
  const [customDates, setCustomDates] = useState({
    start: new Date(),
    end: new Date()
  });
  const [isCustom, setIsCustom] = useState(false);

  const handleRangeSelect = (range: typeof PRESET_RANGES[number]) => {
    setSelectedRange(range.label);
    
    if (range.days === 'custom') {
      setIsCustom(true);
      return;
    }
    
    setIsCustom(false);
    const end = new Date();
    const start = new Date();

    if (range.days === 'ytd') {
      start.setMonth(0, 1); // January 1st of current year
    } else {
      start.setDate(start.getDate() - range.days);
    }

    onRangeChange({ start, end });
  };

  const handleCustomDateChange = (type: 'start' | 'end', value: string) => {
    const newDates = {
      ...customDates,
      [type]: new Date(value)
    };
    setCustomDates(newDates);
    onRangeChange(newDates);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Preset Range Buttons */}
      <div className="flex flex-wrap gap-2">
        {PRESET_RANGES.map((range) => (
          <button
            key={range.label}
            onClick={() => handleRangeSelect(range)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium",
              "transition-all duration-200",
              "flex items-center gap-2",
              selectedRange === range.label ? [
                "bg-primary text-black",
                "shadow-lg shadow-primary/25"
              ] : [
                "bg-white/5 text-gray-400",
                "hover:bg-white/10 hover:text-white",
                "border border-white/10"
              ]
            )}
          >
            <Calendar className="w-4 h-4" />
            {range.label}
          </button>
        ))}
      </div>

      {/* Custom Date Range Inputs */}
      {isCustom && (
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Start Date</label>
            <input
              type="date"
              value={customDates.start.toISOString().split('T')[0]}
              onChange={(e) => handleCustomDateChange('start', e.target.value)}
              max={customDates.end.toISOString().split('T')[0]}
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "bg-black/50 border border-white/10",
                "text-white",
                "focus:outline-none focus:border-primary",
                "transition-colors"
              )}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">End Date</label>
            <input
              type="date"
              value={customDates.end.toISOString().split('T')[0]}
              onChange={(e) => handleCustomDateChange('end', e.target.value)}
              min={customDates.start.toISOString().split('T')[0]}
              max={new Date().toISOString().split('T')[0]}
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "bg-black/50 border border-white/10",
                "text-white",
                "focus:outline-none focus:border-primary",
                "transition-colors"
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}