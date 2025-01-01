import { LucideIcon } from 'lucide-react';

export type WidgetType = 'active-cases' | 'pending-cases' | 'rating' | 'success-rate';

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}