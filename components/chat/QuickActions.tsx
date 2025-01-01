import React from 'react';
import { cn } from '@/utils/cn';

interface QuickAction {
  id: string;
  label: string;
  action: string;
}

const quickActions: QuickAction[] = [
  { id: 'trial', label: '🚀 Start Free Trial', action: 'How do I start a free trial?' },
  { id: 'features', label: '✨ Key Features', action: 'What are the main features?' },
  { id: 'success', label: '📈 Success Rate', action: 'What does success rate mean?' },
  { id: 'pricing', label: '💰 Pricing', action: 'Tell me about pricing plans' }
];

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {quickActions.map((action) => (
        <button
          key={action.id}
          onClick={() => onActionClick(action.action)}
          className={cn(
            "px-3 py-1.5 text-sm rounded-full",
            "bg-white/5 text-white",
            "border border-white/10",
            "hover:bg-white/10 hover:border-primary/50",
            "transition-all duration-200"
          )}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}