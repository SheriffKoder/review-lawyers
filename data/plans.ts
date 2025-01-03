import type { PricingPlan } from '@/types/pricing';

export const PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9.99,
    billing: 'monthly',
    description: 'Perfect for small businesses just getting started.',
    features: [
      'Dashboard Analytics: Basic Insights',
      'Automatic Email Alerts',
      'Standard support',
      'Single platform integration'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 19.99,
    billing: 'monthly',
    description: 'Ideal for growing businesses with active review management.',
    features: [
      "Everything in Starter +",
      "Actionable Insights: Recommendations for improving reviews based on common trends.",
      "Global Review Management: Address reviews in multiple languages with AI translation and sentiment analysis.",
      "Collaboration Tools: Ability to share reports and insights with team members or stakeholders.",
      "Review Sentiment Analysis",
      "Multiple Platform Integration (3)",
      "AI Insights",
      "Monthly Perfomance Reports",
      "AI Automated Generated Reports"
    ],
    popular: true
  },
  {
    id: 'Professional+',
    name: 'Professional+',
    price: 29.99,
    billing: 'monthly',
    description: 'Complete solution for large businesses and franchises.',
    features: [
      'Everything in Professional +',
      'Advanced Sentiment Analysis: Break down reviews into themes or categories for deeper understanding.',
      'Unlimited Review Monitoring',
      'Priority Review Removal',
      'AI Review Removal Assistance',
      'Custom Training Sessions for the team',
      'All Platform Integration: Priority API Support: Faster turnaround for custom API integrations or troubleshooting.',
      'Dedicated Support Rep & Account Manager: Only for 10+ Listings',
      // 'Team collaboration tools',
      // 'Custom training sessions'
    ]
  }
];