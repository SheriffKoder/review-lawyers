export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'annually';
  description: string;
  features: string[];
  popular?: boolean;
}

export interface BillingOption {
  period: 'monthly' | 'annually';
  discount?: number;
}