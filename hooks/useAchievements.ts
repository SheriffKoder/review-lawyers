import { useState, useEffect } from 'react';
import { Award, Shield, Star, Zap } from 'lucide-react';
import type { Achievement } from '@/types/achievement';

const ICONS = {
  Shield,
  Star,
  Zap,
  Award
} as const;

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-case',
      title: 'First Case Resolved',
      description: 'Successfully resolved your first review case',
      icon: Shield,
      unlocked: true
    },
    {
      id: 'five-star',
      title: 'Five Star Defender',
      description: 'Maintain a 5-star rating for 30 days',
      icon: Star,
      unlocked: false
    },
    {
      id: 'speed-master',
      title: 'Speed Master',
      description: 'Resolve 5 cases within 24 hours',
      icon: Zap,
      unlocked: false
    },
    {
      id: 'expert',
      title: 'Review Expert',
      description: 'Successfully resolve 100 cases',
      icon: Award,
      unlocked: false
    }
  ]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('achievements');
      if (saved) {
        const parsed = JSON.parse(saved);
        const rehydrated = parsed.map((achievement: any) => ({
          ...achievement,
          icon: ICONS[achievement.iconName as keyof typeof ICONS] || Shield
        }));
        setAchievements(rehydrated);
      }
    } catch (error) {
      console.error('Failed to parse achievements:', error);
    }
  }, []);

  useEffect(() => {
    try {
      const serialized = achievements.map(achievement => ({
        ...achievement,
        iconName: achievement.icon.name
      }));
      localStorage.setItem('achievements', JSON.stringify(serialized));
    } catch (error) {
      console.error('Failed to save achievements:', error);
    }
  }, [achievements]);

  return { achievements };
}