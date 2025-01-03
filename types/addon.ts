export type AddonCategory = 'ai' | 'technical' | 'reporting' | 'monitoring' | 'support' | 'consulting' | 'training';

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  category: AddonCategory;
  features: string[];
  compatiblePlans: string[];
}