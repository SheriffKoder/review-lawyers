import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/utils/cn';

interface SavedFiltersProps {
  currentFilter: string;
  onFilterSelect: (filter: string) => void;
  className?: string;
}

export function SavedFilters({ currentFilter, onFilterSelect, className }: SavedFiltersProps) {
  const [savedFilters, setSavedFilters] = useState<string[]>([]);

  // Load saved filters on mount
  useEffect(() => {
    const filters = localStorage.getItem('savedFilters');
    if (filters) {
      setSavedFilters(JSON.parse(filters));
    }
  }, []);

  const saveCurrentFilter = () => {
    if (!currentFilter || savedFilters.includes(currentFilter)) return;
    
    const newFilters = [...savedFilters, currentFilter];
    setSavedFilters(newFilters);
    localStorage.setItem('savedFilters', JSON.stringify(newFilters));
  };

  const removeFilter = (filterToRemove: string) => {
    const newFilters = savedFilters.filter(filter => filter !== filterToRemove);
    setSavedFilters(newFilters);
    localStorage.setItem('savedFilters', JSON.stringify(newFilters));
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-4">
        <Button
          onClick={saveCurrentFilter}
          variant="secondary"
          className="group"
          disabled={!currentFilter || savedFilters.includes(currentFilter)}
        >
          <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Save Current Filter
        </Button>
      </div>

      {savedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {savedFilters.map((filter) => (
            <div
              key={filter}
              className={cn(
                "group flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all",
                "border border-white/10 hover:border-primary/50",
                "bg-white/5 hover:bg-white/10",
                "cursor-pointer",
                filter === currentFilter && "border-primary bg-primary/10"
              )}
            >
              <span
                onClick={() => onFilterSelect(filter)}
                className="text-white group-hover:text-primary transition-colors"
              >
                {filter}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFilter(filter);
                }}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}