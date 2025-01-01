import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link'
import { cn } from '@/utils/cn';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
}

export function NavDropdown({ label, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const mousePositionRef = useRef({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Get dropdown position
    const rect = dropdownRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Check if mouse is moving towards the dropdown
    const mouseX = mousePositionRef.current.x;
    const mouseY = mousePositionRef.current.y;
    const isMovingTowards = 
      mouseX >= rect.left && 
      mouseX <= rect.right && 
      mouseY >= rect.top && 
      mouseY <= rect.bottom;

    // Add longer delay if mouse is moving towards dropdown
    const delay = isMovingTowards ? 400 : 150;

    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, delay);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-4 py-2",
          "text-gray-400 hover:text-primary",
          "transition-colors duration-200",
          isOpen && "text-primary"
        )}
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      <div
        className={cn(
          "absolute left-0 mt-1 w-64",
          "bg-black border border-white/10 rounded-xl",
          "shadow-xl shadow-primary/10",
          "backdrop-blur-xl",
          "transform transition-all duration-200 origin-top-left",
          "z-50",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="p-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-4 py-3 rounded-lg",
                "hover:bg-white/5",
                "transition-colors duration-200",
                "group"
              )}
              onClick={() => setIsOpen(false)}
            >
              <div className="font-medium text-white group-hover:text-primary transition-colors">
                {item.label}
              </div>
              {item.description && (
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {item.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}