export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  current_period_start: string;
  current_period_end: string;
  plan?: {
    id: string;
    name: string;
    price: number;
    interval: 'month' | 'year';
    features: string[];
  };
}

export interface SubscriptionUpdate {
  success: boolean;
  error?: string;
  subscription?: {
    id: string;
    planId: string;
    status: string;
  };
}