import React from 'react';
import { cn } from '@/utils/cn';
import { MobileNav } from './MobileNav';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 md:hidden",
        "transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-sm",
          "transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Sliding panel */}
      <div
        className={cn(
          "absolute top-[64px] right-0 w-full max-w-sm h-[calc(100vh-64px)]",
          "bg-white dark:bg-black",
          "border-l border-gray-200 dark:border-gray-800",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <MobileNav onClose={onClose} />
      </div>
    </div>
  );
}