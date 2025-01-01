import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SearchInputProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchInput({ onSearch, className }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("search-wrapper", className)}>
      <div className="search-container">
        {/* Glow Effects */}
        <div className="search-glow" />
        <div className="search-border-bg" />
        <div className="search-border-bg" />
        <div className="search-border-bg" />
        <div className="search-white" />
        <div className="search-border" />

        {/* Main Input Container */}
        <div className="search-main">
          {/* Search Icon */}
          <div className="search-icon">
            <Search className="w-5 h-5 text-gray-400" />
          </div>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => onSearch?.(e.target.value)}
          />

          {/* Filter Icon */}
          <div className="filter-container">
            <Filter className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}