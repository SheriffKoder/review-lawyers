import React from 'react';
import { Trophy } from 'lucide-react';
import { cn } from '@/utils/cn';
import { AchievementBadge } from './AchievementBadge';
import { useAchievements } from '@/hooks/useAchievements';

interface AchievementsSectionProps {
  className?: string;
}

export function AchievementsSection({ className }: AchievementsSectionProps) {
  const { achievements } = useAchievements();
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-white">Achievements</h2>
        </div>
        <span className="text-sm text-gray-400">
          {unlockedCount} / {achievements.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
          />
        ))}
      </div>
    </div>
  );
}