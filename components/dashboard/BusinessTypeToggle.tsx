import React from 'react';
import { Building2, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/utils/cn';

interface BusinessTypeToggleProps {
  type: 'rental' | 'restaurant';
  onChange: (type: 'rental' | 'restaurant') => void;
  className?: string;
}

export function BusinessTypeToggle({ type, onChange, className }: BusinessTypeToggleProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 bg-white/5 rounded-full p-1",
      "border border-white/10",
      className
    )}>
      <button 
        onClick={() => onChange('rental')}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium",
          "flex items-center gap-2",
          "transition-all duration-300",
          type === 'rental' 
            ? "bg-primary text-black" 
            : "text-gray-400 hover:text-white"
        )}
      >
        <Building2 className="w-4 h-4" />
        Rentals
      </button>
      <button 
        onClick={() => onChange('restaurant')}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium",
          "flex items-center gap-2",
          "transition-all duration-300",
          type === 'restaurant' 
            ? "bg-primary text-black" 
            : "text-gray-400 hover:text-white"
        )}
      >
        <UtensilsCrossed className="w-4 h-4" />
        Restaurants
      </button>
    </div>
  );
}