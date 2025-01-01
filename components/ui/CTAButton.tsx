import React from 'react';
import { cn } from '@/utils/cn';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function CTAButton({ children, className, ...props }: CTAButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "relative px-6 py-2 rounded-lg font-semibold",
        "bg-primary text-black",
        
        // Enhanced hover effects
        "shadow-lg shadow-primary/25",
        "hover:shadow-xl hover:shadow-primary/30",
        "hover:-translate-y-1 hover:scale-105",
        "active:translate-y-0 active:scale-100",
        
        // Glow effect on hover
        "after:absolute after:inset-0",
        "after:bg-primary/20 after:rounded-lg",
        "after:opacity-0 after:blur-xl",
        "hover:after:opacity-100",
        
        // Animation
        "transform transition-all duration-300",
        "after:transition-opacity after:duration-300",
        
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}