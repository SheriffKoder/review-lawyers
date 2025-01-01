// @ts-nocheck
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link'
import { cn } from '@/utils/cn';

const services = [
  { label: 'Rental Properties', href: '/short-term-rentals' },
  { label: 'Restaurants', href: '/restaurant' },
  { label: 'Case Studies', href: '/case-studies' }
];

export function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        className={cn(
          "flex items-center space-x-1 text-sm font-medium",
          "text-gray-400 hover:text-primary transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        )}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Services</span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "absolute top-full left-0 mt-2 w-48",
          "bg-white dark:bg-gray-800 rounded-lg shadow-lg",
          "border border-gray-200 dark:border-gray-700",
          "transition-all duration-200 origin-top-left",
          "z-50",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {services.map((service) => (
          <Link
            key={service.href}
            to={service.href}
            className={cn(
              "block px-4 py-2 text-sm",
              "text-gray-700 dark:text-gray-300",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              "transition-colors duration-150",
              "first:rounded-t-lg last:rounded-b-lg"
            )}
            onClick={() => setIsOpen(false)}
          >
            {service.label}
          </Link>
        ))}
      </div>
    </div>
  );
}