import React from 'react';
import { useScrollTo } from '@/hooks/useScrollTo';
import { cn } from '@/utils/cn';

interface ScrollLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
}

export function ScrollLink({ 
  to, 
  children, 
  className,
  onClick,
  asChild = false
}: ScrollLinkProps) {
  const { scrollToElement } = useScrollTo();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToElement(to);
    onClick?.();
  };

  if (asChild) {
    return (
      <span 
        onClick={handleClick}
        className={className}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick(e as any)}
      >
        {children}
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "text-sm font-medium transition-colors duration-200",
        "hover:text-primary focus:text-primary",
        "cursor-pointer",
        className
      )}
      type="button"
    >
      {children}
    </button>
  );
}