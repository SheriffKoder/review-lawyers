// @ts-nocheck
import React from 'react';
import Link from 'next/link'
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  as?: typeof Link;
  to?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  icon,
  fullWidth,
  size = 'md',
  loading,
  as: Component = 'button',
  to,
  className,
  ...props 
}: ButtonProps) {
  const buttonClasses = cn(
    // Base styles
    "relative overflow-hidden rounded-lg font-semibold",
    "inline-flex items-center justify-center gap-2",
    "transform transition-all duration-300",
    
    // Size variants
    size === 'sm' && "px-4 py-2 text-sm",
    size === 'md' && "px-6 py-3 text-base",
    size === 'lg' && "px-8 py-4 text-lg",
    
    // Color variants with enhanced hover effects
    variant === 'primary' && [
      "bg-primary text-black",
      "hover:bg-primary/90",
      "hover:shadow-lg hover:shadow-primary/25",
      "hover:-translate-y-0.5",
      "active:translate-y-0",
      "disabled:bg-primary/50"
    ],
    variant === 'secondary' && [
      "bg-white/10 text-white",
      "border border-white/20",
      "hover:bg-white/20",
      "hover:border-white/30",
      "hover:shadow-lg hover:shadow-white/10",
      "hover:-translate-y-0.5",
      "active:translate-y-0",
      "disabled:bg-white/5"
    ],
    
    fullWidth && "w-full",
    loading && "cursor-not-allowed",
    className
  );

  if (Component === Link && to) {
    return (
      <Component to={to} className={buttonClasses}>
        {icon}
        {children}
      </Component>
    );
  }

  return (
    <button
      className={buttonClasses}
      // disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}