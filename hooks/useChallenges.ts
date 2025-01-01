import { useState, useEffect } from 'react';
import type { Challenge } from '@/types/challenge';

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'daily-1',
      title: 'Resolution Streak',
      description: 'Resolve 5 cases today',
      points: 50,
      timeLeft: '23h 45m',
      accepted: false
    },
    {
      id: 'daily-2',
      title: 'Quick Response',
      description: 'Respond to 3 reviews within 1 hour',
      points: 30,
      timeLeft: '23h 45m',
      accepted: false
    },
    {
      id: 'daily-3',
      title: 'Perfect Rating',
      description: 'Maintain 5-star rating for all responses today',
      points: 100,
      timeLeft: '23h 45m',
      accepted: false
    }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('challenges');
    if (saved) {
      setChallenges(JSON.parse(saved));
    }
  }, []);

  const acceptChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId
        ? { ...challenge, accepted: true }
        : challenge
    ));
  };

  useEffect(() => {
    localStorage.setItem('challenges', JSON.stringify(challenges));
  }, [challenges]);

  return { challenges, acceptChallenge };
}