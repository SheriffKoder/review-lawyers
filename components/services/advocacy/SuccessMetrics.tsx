import React from 'react';
import { Star, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';
import { AnimatedNumber } from '@/components/animations/AnimatedNumber';

const metrics = [
  {
    icon: Star,
    value: 92,
    label: 'Success Rate',
    suffix: '%'
  },
  {
    icon: Clock,
    value: 24,
    label: 'Hour Response Time',
    prefix: '<'
  },
  {
    icon: TrendingUp,
    value: 50000,
    label: 'Reviews Defended',
    prefix: '>'
  }
];

interface SuccessMetricsProps {
  className?: string;
}

export function SuccessMetrics({ className }: SuccessMetricsProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={cn(
              "group relative bg-white/5 backdrop-blur-sm rounded-xl p-8",
              "border border-white/10 hover:border-primary/50",
              "transition-all duration-300",
              "text-center"
            )}
          >
            <metric.icon className="w-12 h-12 text-primary mx-auto mb-4 transform transition-transform group-hover:scale-110" />
            <div className="text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              {metric.prefix && <span>{metric.prefix}</span>}
              <AnimatedNumber value={metric.value} />
              {metric.suffix && <span>{metric.suffix}</span>}
            </div>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}