import type { Addon } from '@/types/addon';

export const addons: Addon[] = [
  {
    id: 'custom-ai-training',
    name: 'Custom AI Training',
    description: 'Tailor the AI to specific business needs or unique customer scenarios',
    price: 949,
    category: 'ai',
    features: [
      'Customized AI model training',
      'Business-specific scenarios',
      'Custom response templates',
      'Performance optimization'
    ],
    compatiblePlans: ['professional', 'enterprise']
  },
  {
    id: 'ai-removal-advocacy',
    name: 'AI Removal Advocacy',
    description: 'Enhanced AI-powered review removal assistance',
    price: 99,
    category: 'ai',
    features: [
      'AI-powered review analysis',
      'Automated removal requests',
      'Policy violation detection',
      'Success tracking'
    ],
    compatiblePlans: ['starter', 'professional', 'enterprise']
  },
  {
    id: 'custom-api',
    name: 'Custom API Integration',
    description: 'Custom API integration for your specific needs',
    price: 499,
    category: 'technical',
    features: [
      'Custom API endpoints',
      'Integration support',
      'Technical documentation',
      'Developer assistance'
    ],
    compatiblePlans: ['professional', 'enterprise']
  },
  {
    id: 'white-label-reports',
    name: 'White-Label Reports',
    description: 'Branded reports for clients and stakeholders',
    price: 499,
    category: 'reporting',
    features: [
      'Custom branding',
      'Advanced analytics',
      'Export capabilities',
      'Custom templates'
    ],
    compatiblePlans: ['professional', 'enterprise']
  },
  {
    id: 'custom-alerts',
    name: 'Customizable Alerts',
    description: 'Set specific triggers for review alerts',
    price: 499,
    category: 'monitoring',
    features: [
      'Keyword monitoring',
      'Priority listings',
      'Custom notification rules',
      'Real-time alerts'
    ],
    compatiblePlans: ['starter', 'professional', 'enterprise']
  },
  {
    id: 'vip-onboarding',
    name: 'VIP Onboarding',
    description: 'Personalized setup assistance and training',
    price: 249,
    category: 'support',
    features: [
      'Dedicated onboarding specialist',
      'Custom setup assistance',
      'Platform training',
      'Best practices guidance'
    ],
    compatiblePlans: ['starter', 'professional', 'enterprise']
  },
  {
    id: 'strategy-sessions',
    name: 'Periodic Strategy Sessions',
    description: 'Regular consultations to optimize review strategies',
    price: 249,
    category: 'consulting',
    features: [
      'Monthly strategy calls',
      'Performance review',
      'Optimization recommendations',
      'Trend analysis'
    ],
    compatiblePlans: ['professional', 'enterprise']
  },
  {
    id: 'one-on-one-consultation',
    name: 'One-on-One Review Strategy',
    description: 'Personalized consultation with a review expert',
    price: 249,
    category: 'consulting',
    features: [
      'Expert consultation',
      'Custom strategy development',
      'Implementation guidance',
      'Follow-up support'
    ],
    compatiblePlans: ['starter', 'professional', 'enterprise']
  },
  {
    id: 'team-training',
    name: 'Team Training Workshops',
    description: 'Live or recorded sessions for team training',
    price: 499,
    category: 'training',
    features: [
      'Live training sessions',
      'Recorded workshops',
      'Training materials',
      'Q&A sessions'
    ],
    compatiblePlans: ['professional', 'enterprise']
  }
];

export const addonCategories = {
  ai: 'AI & Automation',
  technical: 'Technical Integration',
  reporting: 'Reporting & Analytics',
  monitoring: 'Monitoring & Alerts',
  support: 'Support & Onboarding',
  consulting: 'Consulting Services',
  training: 'Training & Education'
} as const;