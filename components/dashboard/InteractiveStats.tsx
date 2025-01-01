// @ts-nocheck
import React from 'react';
import { StatCard } from './StatCard';
import type { IconProps } from 'lucide-react';

interface Stat {
  title: string;
  value: string | number;
  icon: React.ComponentType<IconProps>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface InteractiveStatsProps {
  stats: Stat[];
}

export function InteractiveStats({ stats }: InteractiveStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
        />
      ))}
    </div>
  );
}