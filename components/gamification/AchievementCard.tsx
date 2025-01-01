import React from 'react';
import { cn } from '@/utils/cn';
import type { Achievement } from '@/types/gamification';

interface AchievementCardProps {
  achievement: Achievement;
  className?: string;
}

export function AchievementCard({ achievement, className }: AchievementCardProps) {
  const { icon: Icon, title, description, unlocked, progress, maxProgress } = achievement;

  return (
    <div className={cn(
      "group relative p-4 rounded-xl",
      "bg-white/5 backdrop-blur-sm",
      "border border-white/10",
      unlocked ? "hover:border-primary/50" : "opacity-50",
      "transition-all duration-300",
      className
    )}>
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-lg",
          unlocked ? "bg-primary/20" : "bg-gray-500/20",
          "transition-colors duration-300"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            unlocked ? "text-primary" : "text-gray-500",
            "transition-colors duration-300"
          )} />
        </div>

        <div className="flex-1">
          <h3 className={cn(
            "font-medium",
            unlocked ? "text-white" : "text-gray-400",
            "transition-colors duration-300"
          )}>
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>

          {progress !== undefined && maxProgress !== undefined && (
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">{progress} / {maxProgress}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(progress / maxProgress) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}