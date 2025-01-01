import React from 'react';
import { Filter } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ReviewFiltersProps {
  platform: string;
  rating: number | null;
  onPlatformChange: (platform: string) => void;
  onRatingChange: (rating: number | null) => void;
  className?: string;
}

const PLATFORMS = ['All', 'Airbnb', 'VRBO', 'Booking.com', 'Google', 'Yelp'];
const RATINGS = [5, 4, 3, 2, 1];

export function ReviewFilters({ 
  platform, 
  rating, 
  onPlatformChange, 
  onRatingChange,
  className 
}: ReviewFiltersProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Platform Filter */}
      <div className="flex items-center gap-4">
        <Filter className="w-5 h-5 text-primary" />
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => onPlatformChange(p === 'All' ? '' : p)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium",
                "transition-all duration-200",
                platform === (p === 'All' ? '' : p)
                  ? "bg-primary text-black"
                  : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="flex items-center gap-4">
        <div className="w-5 h-5" /> {/* Spacer for alignment */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onRatingChange(null)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium",
              "transition-all duration-200",
              rating === null
                ? "bg-primary text-black"
                : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
            )}
          >
            All Stars
          </button>
          {RATINGS.map((r) => (
            <button
              key={r}
              onClick={() => onRatingChange(r)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium",
                "transition-all duration-200",
                "flex items-center gap-1",
                rating === r
                  ? "bg-primary text-black"
                  : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
              )}
            >
              {r} <span className="text-yellow-400">★</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}