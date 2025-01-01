import React from 'react';
import { AlertTriangle, Star, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/utils/cn';

interface WidgetPickerProps {
  onSelect: (type: string) => void;
  onClose: () => void;
}

export function WidgetPicker({ onSelect, onClose }: WidgetPickerProps) {
  const widgetTypes = [
    {
      type: 'active-cases',
      title: 'Active Cases',
      icon: AlertTriangle,
      color: 'yellow-500'
    },
    {
      type: 'pending-cases',
      title: 'Pending Cases',
      icon: Users,
      color: 'blue-500'
    },
    {
      type: 'rating',
      title: 'Average Rating',
      icon: Star,
      color: 'yellow-400'
    },
    {
      type: 'success-rate',
      title: 'Success Rate',
      icon: TrendingUp,
      color: 'green-500'
    }
  ];

  return (
    <div className="absolute right-0 top-12 z-50 w-64">
      <div className={cn(
        "p-4 rounded-xl",
        "bg-gray-900/95 backdrop-blur-sm",
        "border border-white/10",
        "shadow-xl"
      )}>
        <div className="space-y-2">
          {widgetTypes.map((widget) => (
            <button
              key={widget.type}
              onClick={() => onSelect(widget.type)}
              className={cn(
                "w-full p-3 rounded-lg",
                "flex items-center gap-3",
                "text-left text-sm",
                "bg-white/5 hover:bg-white/10",
                "transition-colors duration-200"
              )}
            >
              <widget.icon className={cn("w-5 h-5", `text-${widget.color}`)} />
              <span className="text-white">{widget.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}