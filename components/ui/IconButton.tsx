import React from 'react';
import { cn } from '@/utils/cn';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string; // Required for accessibility
}

export function IconButton({ icon, label, className, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        'p-2 rounded-lg transition-colors hover:bg-primary/10',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
      aria-label={label}
      {...props}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}