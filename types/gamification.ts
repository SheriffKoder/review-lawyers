import { LucideIcon } from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  timeLeft: string;
  accepted: boolean;
  progress?: number;
  target?: number;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: LucideIcon;
  available: boolean;
}