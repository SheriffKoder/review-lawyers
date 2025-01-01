import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ className, placeholder = 'Search...', onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to blur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch?.('');
    inputRef.current?.focus();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "relative group",
        className
      )}
    >
      {/* Search Icon */}
      <Search className={cn(
        "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
        "text-gray-400 transition-colors duration-200",
        isFocused && "text-primary"
      )} />
      
      {/* Input Field */}
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        className={cn(
          "w-full h-10 pl-10 pr-10",
          "bg-white/5 backdrop-blur-sm",
          "border border-white/10",
          "rounded-xl",
          "text-sm text-white",
          "placeholder:text-gray-500",
          "transition-all duration-200",
          "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
          "hover:bg-white/10",
          // Glow effect on focus
          isFocused && [
            "shadow-[0_0_20px_rgba(23,217,255,0.2)]",
            "border-primary"
          ]
        )}
      />

      {/* Clear Button */}
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "text-gray-400 hover:text-white",
            "transition-colors duration-200"
          )}
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}