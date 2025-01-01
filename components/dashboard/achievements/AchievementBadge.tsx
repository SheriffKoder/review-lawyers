import React from 'react';
import { cn } from '@/utils/cn';
import type { Achievement } from '@/types/achievement';

interface AchievementBadgeProps {
  achievement: Achievement;
  className?: string;
}

export function AchievementBadge({ achievement, className }: AchievementBadgeProps) {
  const { icon: Icon, title, description, unlocked } = achievement;

  return (
    <div className={cn(
      "group relative p-4 rounded-xl",
      "bg-white/5 backdrop-blur-sm",
      "border border-white/10",
      unlocked ? "hover:border-primary/50" : "opacity-50",
      "transition-all duration-300",
      className
    )}>
      {/* Glow effect */}
      <div className={cn(
        "absolute -inset-px rounded-xl opacity-0 blur",
        "bg-gradient-to-r from-primary/20 to-blue-500/20",
        unlocked && "group-hover:opacity-100",
        "transition-opacity duration-300"
      )} />

      <div className="relative flex items-start gap-4">
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

        <div>
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
        </div>

        {unlocked && (
          <div className={cn(
            "absolute top-2 right-2",
            "text-xs text-primary",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300"
          )}>
            Unlocked!
          </div>
        )}
      </div>
    </div>
  );
}