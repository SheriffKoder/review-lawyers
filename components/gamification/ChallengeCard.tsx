import React from 'react';
import { cn } from '@/utils/cn';
import { Button } from '../ui/Button';
import type { Challenge } from '@/types/gamification';

interface ChallengeCardProps {
  challenge: Challenge;
  onAccept: (id: string) => void;
  className?: string;
}

export function ChallengeCard({ challenge, onAccept, className }: ChallengeCardProps) {
  const { id, title, description, points, timeLeft, accepted, progress, target } = challenge;

  return (
    <div className={cn(
      "group relative p-6 rounded-xl",
      "bg-white/5 backdrop-blur-sm",
      "border border-white/10",
      "hover:border-primary/50",
      "transition-all duration-300",
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="text-gray-400 mt-1">{description}</p>
        </div>
        <div className="text-sm text-primary">{timeLeft}</div>
      </div>

      {progress !== undefined && target !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Progress</span>
            <span className="text-white">{progress} / {target}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(progress / target) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
          +{points} points
        </div>
        <Button
          variant="secondary"
          onClick={() => onAccept(id)}
          disabled={accepted}
        >
          {accepted ? 'In Progress' : 'Accept Challenge'}
        </Button>
      </div>
    </div>
  );
}