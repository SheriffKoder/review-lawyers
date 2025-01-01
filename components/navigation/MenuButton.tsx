import React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function MenuButton({ isOpen, onClick, className }: MenuButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-2 rounded-lg",
        "text-black dark:text-white",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "transition-colors duration-200",
        "md:hidden",
        className
      )}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <X className="h-6 w-6 transition-transform duration-200" />
      ) : (
        <Menu className="h-6 w-6 transition-transform duration-200" />
      )}
    </button>
  );
}