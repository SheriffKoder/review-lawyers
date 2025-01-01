import React from 'react';
import { Filter } from 'lucide-react';
import { FilterGroup } from './FilterGroup';
import { cn } from '@/utils/cn';

interface FilterSectionProps {
  className?: string;
}

export function FilterSection({ className }: FilterSectionProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        <button 
          className="text-sm text-primary hover:text-primary/80 transition-colors"
          onClick={() => {/* Clear all filters */}}
        >
          Clear All
        </button>
      </div>

      <div className="grid gap-6">
        {/* Sentiment Score Filter */}
        <FilterGroup
          title="Sentiment Score"
          type="range"
          value={[0, 100]}
          onChange={(value) => console.log('Sentiment:', value)}
          min={0}
          max={100}
          step={1}
          suffix="%"
        />

        {/* Property Groups Filter */}
        <FilterGroup
          title="Property Groups"
          type="select"
          options={[
            { label: 'All Properties', value: 'all' },
            { label: 'Luxury Rentals', value: 'luxury' },
            { label: 'Beach Houses', value: 'beach' },
            { label: 'City Apartments', value: 'city' }
          ]}
          onChange={(value) => console.log('Property Group:', value)}
        />

        {/* Review Rating Filter */}
        <FilterGroup
          title="Review Rating"
          type="range"
          value={[1, 5]}
          onChange={(value) => console.log('Rating:', value)}
          min={1}
          max={5}
          step={0.5}
          prefix="★"
        />

        {/* Cleanliness Rating Filter */}
        <FilterGroup
          title="Cleanliness Rating"
          type="range"
          value={[1, 5]}
          onChange={(value) => console.log('Cleanliness:', value)}
          min={1}
          max={5}
          step={0.5}
          prefix="★"
        />

        {/* Starred Reviews Filter */}
        <FilterGroup
          title="Starred Reviews"
          type="checkbox"
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' }
          ]}
          onChange={(value) => console.log('Starred:', value)}
        />
      </div>
    </div>
  );
}