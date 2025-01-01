import React from 'react';
import { StatCard } from './StatCard';
import { cn } from '@/utils/cn';
import type { LucideIcon } from 'lucide-react';

interface Stat {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    data?: number[];
  };
}

interface StatsGridProps {
  stats: Stat[];
  className?: string;
}

export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <div className={cn(
      "flex flex-wrap justify-center gap-6",
      "p-6 rounded-xl bg-white/5",
      className
    )}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          {...stat}
        />
      ))}
    </div>
  );
}