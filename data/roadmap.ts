import { LucideIcon, Star, Shield, Zap, Brain, MessageSquare, Award } from 'lucide-react';

export interface RoadmapItem {
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'launched' | 'in-progress' | 'planned';
  date: string;
  category: 'ai' | 'security' | 'integration' | 'user-experience';
}

export const roadmapItems: RoadmapItem[] = [
  // {
  //   title: 'Enhanced Security Protocols',
  //   description: 'Advanced encryption and security measures to protect sensitive business data.',
  //   icon: Shield,
  //   status: 'in-progress',
  //   date: 'Q1 2024',
  //   category: 'security'
  // },
  // {
  //   title: 'Smart Response Templates',
  //   description: 'AI-generated response templates based on historical success rates.',
  //   icon: MessageSquare,
  //   status: 'in-progress',
  //   date: 'Q2 2024',
  //   category: 'ai'
  // },
  {
    title: 'AI-Powered Review Analysis',
    description: 'Advanced machine learning algorithms to automatically detect policy violations and optimize review defense strategies.',
    icon: Brain,
    status: 'in-progress',
    date: 'Q1 2025',
    category: 'ai'
  },
  {
    title: 'Real-Time Response System',
    description: 'Instant notification and response system for new reviews across all platforms.',
    icon: Zap,
    status: 'in-progress',
    date: 'Q1 2025',
    category: 'integration'
  },

  {
    title: 'Reputation Score Analytics',
    description: 'Comprehensive analytics dashboard with predictive insights.',
    icon: Star,
    status: 'planned',
    date: 'Q1 2025',
    category: 'user-experience'
  },
  {
    title: 'Advanced Gamification',
    description: 'Enhanced reward system with custom achievements and challenges.',
    icon: Award,
    status: 'planned',
    date: 'Q2 2025',
    category: 'user-experience'
  }
];