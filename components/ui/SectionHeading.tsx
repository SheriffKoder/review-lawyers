import React from 'react';
import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionHeading({ 
  title, 
  subtitle,
  className,
  align = 'center'
}: SectionHeadingProps) {
  return (
    <div className={cn(
      "mb-16",
      align === 'center' && "text-center",
      align === 'left' && "text-left",
      align === 'right' && "text-right",
      className
    )}>
      <h2 className={cn(
        "heading-2 text-white",
        "border-b-[3px] border-primary",
        "inline-block pb-2",
        "relative",
        "after:absolute after:inset-0 after:bg-primary/20",
        "after:blur-lg after:opacity-0 after:transition-opacity",
        "hover:after:opacity-100"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-400 mt-4 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}