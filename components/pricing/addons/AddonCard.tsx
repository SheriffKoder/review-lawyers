import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import type { Addon } from '@/types/addon';

interface AddonCardProps {
  addon: Addon;
  onSelect: (addon: Addon) => void;
  className?: string;
}

export function AddonCard({ addon, onSelect, className }: AddonCardProps) {
  return (
    <div className={cn(
      "group relative bg-white/5 backdrop-blur-sm rounded-xl p-6",
      "border border-white/10 hover:border-primary/50",
      "transition-all duration-300",
      className
    )}>
      {/* Glow effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
      
      <div className="relative">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {addon.name}
          </h3>
          <p className="text-gray-400 mt-2 group-hover:text-gray-300 transition-colors">
            {addon.description}
          </p>
        </div>

        <div className="text-2xl font-bold text-white mb-6 group-hover:text-primary transition-colors">
          ${addon.price}<span className="text-sm text-gray-400">/mo</span>
        </div>

        <ul className="space-y-3 mb-6">
          {addon.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-gray-300 group-hover:text-gray-200 transition-colors">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button 
          onClick={() => onSelect(addon)}
          fullWidth
          variant="secondary"
          className="group-hover:border-primary/50"
        >
          Add to Plan
        </Button>
      </div>
    </div>
  );
}