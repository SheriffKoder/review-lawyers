import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PricingFeatureProps {
  feature: string;
  included?: boolean;
  className?: string;
}

export function PricingFeature({ feature, included = true, className }: PricingFeatureProps) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <Check 
        className={cn(
          "w-5 h-5 mt-0.5 shrink-0",
          "transition-all duration-300",
          included ? "text-primary" : "text-gray-400 opacity-50"
        )}
      />
      <span className={cn(
        "text-gray-300 group-hover:text-gray-200 transition-colors",
        !included && "opacity-50"
      )}>
        {feature}
      </span>
    </li>
  );
}