import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface PricingSliderProps {
  onChange: (value: number) => void;
  className?: string;
}

export function PricingSlider({ onChange, className }: PricingSliderProps) {
  const [value, setValue] = useState(27);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={cn("max-w-3xl mx-auto text-center space-y-8", className)}>
      <h2 className="text-3xl font-bold text-white">
        How many properties do you manage?
      </h2>
      
      <p className="text-primary">
        Drag the slider to tell us how many properties you manage.
      </p>

      <div className="relative py-8">
        {/* Slider Track Background */}
        <div className="absolute inset-0 h-2 top-1/2 -translate-y-1/2 bg-white/10 rounded-full" />
        
        {/* Custom Slider */}
        <input
          type="range"
          min="1"
          max="100"
          value={value}
          onChange={handleChange}
          className={cn(
            "w-full appearance-none bg-transparent cursor-pointer relative z-10",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-8",
            "[&::-webkit-slider-thumb]:h-8",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-primary",
            "[&::-webkit-slider-thumb]:shadow-lg",
            "[&::-webkit-slider-thumb]:shadow-primary/30",
            "[&::-webkit-slider-thumb]:border-4",
            "[&::-webkit-slider-thumb]:border-white",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:transition-all",
            "[&::-webkit-slider-thumb]:hover:shadow-xl",
            "[&::-webkit-slider-thumb]:hover:shadow-primary/40",
            "[&::-moz-range-thumb]:appearance-none",
            "[&::-moz-range-thumb]:w-8",
            "[&::-moz-range-thumb]:h-8",
            "[&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-primary",
            "[&::-moz-range-thumb]:shadow-lg",
            "[&::-moz-range-thumb]:shadow-primary/30",
            "[&::-moz-range-thumb]:border-4",
            "[&::-moz-range-thumb]:border-white",
            "[&::-moz-range-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:transition-all",
            "[&::-moz-range-thumb]:hover:shadow-xl",
            "[&::-moz-range-thumb]:hover:shadow-primary/40"
          )}
        />

        {/* Active Track */}
        <div 
          className="absolute inset-0 h-2 top-1/2 -translate-y-1/2 bg-primary rounded-full origin-left"
          style={{ transform: `scaleX(${value / 100})` }}
        />

        {/* Value Display */}
        <div 
          className="absolute top-0 left-0 bg-primary text-black font-bold px-3 py-1 rounded-full transform -translate-y-full"
          style={{ left: `${value}%`, transform: `translateX(-50%) translateY(-10px)` }}
        >
          {value}
        </div>
      </div>

      <p className="text-gray-400">
        As you grow beyond the included number of properties,
        <br />
        <span className="text-primary font-medium">
          you only pay for additional properties with check-ins
        </span>
        {' '}in the past 30 days.
      </p>
    </div>
  );
}