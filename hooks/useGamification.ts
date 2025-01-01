// @ts-nocheck
import { useState, useEffect } from 'react';
import { Shield, Star, Award, Zap } from 'lucide-react';
import type { Achievement, Challenge, Reward } from '@/types/gamification';

const STORAGE_KEY = 'gamification_data';

interface GamificationData {
  points: number;
  level: number;
  streak: number;
  achievements: Achievement[];
  challenges: Challenge[];
  rewards: Reward[];
}

export function useGamification() {
  const [data, setData] = useState<GamificationData>({
    points: 0,
    level: 1,
    streak: 0,
    achievements: [
      {
        id: 'first-case',
        title: 'First Case Resolved',
        description: 'Successfully resolve your first review case',
        icon: Shield,
        unlocked: false
      },
      {
        id: 'five-star',
        title: 'Five Star Defender',
        description: 'Maintain a 5-star rating for 30 days',
        icon: Star,
        unlocked: false,
        progress: 15,
        maxProgress: 30
      }
    ],
    challenges: [
      {
        id: 'daily-1',
        title: 'Resolution Streak',
        description: 'Resolve 5 cases today',
        points: 50,
        timeLeft: '23h 45m',
        accepted: false,
        progress: 2,
        target: 5
      }
    ],
    rewards: [
      {
        id: 'premium-discount',
        title: '50% Off Premium',
        description: 'Get 50% off your next month of Premium',
        cost: 1000,
        icon: Award,
        available: true
      }
    ]
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Rehydrate icon components
        const rehydrated = {
          ...parsed,
          achievements: parsed.achievements.map((a: any) => ({
            ...a,
            icon: { Shield, Star, Award, Zap }[a.iconName] || Shield
          }))
        };
        setData(rehydrated);
      }
    } catch (error) {
      console.error('Failed to load gamification data:', error);
    }
  }, []);

  const saveData = (newData: GamificationData) => {
    try {
      const serialized = {
        ...newData,
        achievements: newData.achievements.map(a => ({
          ...a,
          iconName: a.icon.name
        }))
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
      setData(newData);
    } catch (error) {
      console.error('Failed to save gamification data:', error);
    }
  };

  const addPoints = (amount: number) => {
    saveData({
      ...data,
      points: data.points + amount
    });
  };

  const acceptChallenge = (challengeId: string) => {
    saveData({
      ...data,
      challenges: data.challenges.map(c =>
        c.id === challengeId ? { ...c, accepted: true } : c
      )
    });
  };

  const unlockAchievement = (achievementId: string) => {
    if (data.achievements.find(a => a.id === achievementId)?.unlocked) return;

    saveData({
      ...data,
      achievements: data.achievements.map(a =>
        a.id === achievementId ? { ...a, unlocked: true } : a
      ),
      points: data.points + 100 // Bonus points for achievement
    });
  };

  return {
    ...data,
    addPoints,
    acceptChallenge,
    unlockAchievement
  };
}