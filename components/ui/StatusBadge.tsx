import React from 'react';
import { cn } from '@/utils/cn';

type StatusType = 'pending' | 'in-progress' | 'resolved' | 'error';

interface StatusBadgeProps {
  status: StatusType;
  count?: number;
  className?: string;
}

export function StatusBadge({ status, count, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      // Status-specific styles
      status === 'pending' && "bg-red-500/10 text-red-500 border border-red-500/20",
      status === 'in-progress' && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
      status === 'resolved' && "bg-green-500/10 text-green-500 border border-green-500/20",
      status === 'error' && "bg-red-600/10 text-red-600 border border-red-600/20",
      // Animation
      "transition-all duration-200",
      "hover:bg-opacity-20",
      className
    )}>
      {count !== undefined && (
        <span className="mr-1 font-bold">{count}</span>
      )}
      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
    </span>
  );
}