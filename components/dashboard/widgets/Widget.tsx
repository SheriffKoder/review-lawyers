import React from 'react';
import { cn } from '@/utils/cn';
import type { Widget as WidgetType } from '@/types/widget';

interface WidgetProps {
  widget: WidgetType;
  onRemove: () => void;
}

export function Widget({ widget, onRemove }: WidgetProps) {
  const Icon = widget.icon;

  return (
    <div className={cn(
      "group relative p-6 rounded-xl",
      "bg-white/5 backdrop-blur-sm",
      "border border-white/10",
      "hover:border-primary/50",
      "transition-all duration-300"
    )}>
      <button
        onClick={onRemove}
        className={cn(
          "absolute top-2 right-2",
          "opacity-0 group-hover:opacity-100",
          "text-gray-400 hover:text-red-400",
          "transition-all duration-300"
        )}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-lg",
          "transition-all duration-300",
          "group-hover:scale-110",
          `bg-${widget.color}/10`
        )}>
          <Icon className={cn("w-6 h-6", `text-${widget.color}`)} />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-400">{widget.title}</p>
          <p className="text-2xl font-bold text-white mt-1">{widget.value}</p>
        </div>
      </div>
    </div>
  );
}