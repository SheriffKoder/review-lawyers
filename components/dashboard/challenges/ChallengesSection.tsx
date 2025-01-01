import React from 'react';
import { Trophy } from 'lucide-react';
import { cn } from '@/utils/cn';
import { DailyChallenge } from './DailyChallenge';
import { useChallenges } from '@/hooks/useChallenges';

interface ChallengesSectionProps {
  className?: string;
}

export function ChallengesSection({ className }: ChallengesSectionProps) {
  const { challenges, acceptChallenge } = useChallenges();

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-white">Daily Challenges</h2>
        </div>
      </div>

      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <DailyChallenge
            key={challenge.id}
            challenge={challenge}
            onAccept={acceptChallenge}
          />
        ))}
      </div>
    </div>
  );
}