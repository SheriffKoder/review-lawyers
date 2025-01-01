import { useState, useEffect } from 'react';
import { AlertTriangle, Star, TrendingUp, Users } from 'lucide-react';
import type { Widget } from '@/types/widget';

const STORAGE_KEY = 'dashboard_widgets';

const WIDGET_CONFIGS = {
  'active-cases': {
    title: 'Active Cases',
    value: '12',
    icon: AlertTriangle,
    color: 'yellow-500'
  },
  'pending-cases': {
    title: 'Pending Cases',
    value: '5',
    icon: Users,
    color: 'blue-500'
  },
  'rating': {
    title: 'Average Rating',
    value: '4.8',
    icon: Star,
    color: 'yellow-400'
  },
  'success-rate': {
    title: 'Success Rate',
    value: '92%',
    icon: TrendingUp,
    color: 'green-500'
  }
} as const;

export function useWidgets() {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  useEffect(() => {
    try {
      const savedWidgets = localStorage.getItem(STORAGE_KEY);
      if (savedWidgets) {
        const parsed = JSON.parse(savedWidgets);
        // Rehydrate icons from configs
        const rehydrated = parsed.map((widget: any) => ({
          ...widget,
          icon: WIDGET_CONFIGS[widget.type as keyof typeof WIDGET_CONFIGS].icon
        }));
        setWidgets(rehydrated);
      }
    } catch (error) {
      console.error('Failed to load widgets:', error);
    }
  }, []);

  const saveWidgets = (newWidgets: Widget[]) => {
    try {
      // Store widgets with type instead of icon component
      const serialized = newWidgets.map(widget => ({
        ...widget,
        type: widget.type // Store type for icon rehydration
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
      setWidgets(newWidgets);
    } catch (error) {
      console.error('Failed to save widgets:', error);
    }
  };

  const addWidget = (type: keyof typeof WIDGET_CONFIGS) => {
    const config = WIDGET_CONFIGS[type];
    if (!config) return;

    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      type,
      ...config
    };

    saveWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id: string) => {
    saveWidgets(widgets.filter(w => w.id !== id));
  };

  return { widgets, addWidget, removeWidget };
}