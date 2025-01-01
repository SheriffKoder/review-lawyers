import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import type { Challenge } from '@/types/challenge';

interface DailyChallengeProps {
  challenge: Challenge;
  onAccept: (challengeId: string) => void;
  className?: string;
}

export function DailyChallenge({ challenge, onAccept, className }: DailyChallengeProps) {
  const { id, title, description, points, timeLeft, accepted } = challenge;

  return (
    <div className={cn(
      "group relative p-6 rounded-xl",
      "bg-white/5 backdrop-blur-sm",
      "border border-white/10",
      "hover:border-primary/50",
      "transition-all duration-300",
      className
    )}>
      {/* Glow effect */}
      <div className={cn(
        "absolute -inset-px rounded-xl opacity-0 blur",
        "bg-gradient-to-r from-primary/20 to-blue-500/20",
        "group-hover:opacity-100",
        "transition-opacity duration-300"
      )} />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-white">{title}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{timeLeft}</span>
          </div>
        </div>

        <p className="text-gray-400 mb-4">{description}</p>

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
    </div>
  );
}