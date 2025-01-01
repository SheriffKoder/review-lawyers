import React from 'react';
import { Award, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';
import { usePoints } from '@/hooks/usePoints';
import { AnimatedNumber } from '@/components/animations/AnimatedNumber';

interface PointsSummaryProps {
  className?: string;
}

export function PointsSummary({ className }: PointsSummaryProps) {
  const { points, level, nextLevelPoints } = usePoints();
  const progress = (points % 100) / 100;

  return (
    <div className={cn(
      "bg-white/5 backdrop-blur-sm",
      "border border-white/10 rounded-xl",
      "p-6",
      className
    )}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-white">Your Progress</h3>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400">+25 today</span>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-white mb-2">
          <AnimatedNumber value={points} />
        </div>
        <p className="text-gray-400">Total Points</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Level {level}</span>
          <span className="text-white">{points} / {nextLevelPoints}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}