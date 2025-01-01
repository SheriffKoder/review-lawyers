import React from 'react';
import { Target } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgress } from '@/hooks/useProgress';

interface ProgressSectionProps {
  className?: string;
}

export function ProgressSection({ className }: ProgressSectionProps) {
  const { goals } = useProgress();

  return (
    <div className={cn(
      "bg-white/5 backdrop-blur-sm",
      "border border-white/10 rounded-xl",
      "p-6",
      className
    )}>
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-white">Monthly Goals</h3>
      </div>

      <div className="space-y-6">
        {goals.map((goal, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{goal.label}</span>
              <span className="text-white font-medium">
                {goal.current} / {goal.target}
              </span>
            </div>
            
            <ProgressBar
              value={goal.current}
              max={goal.target}
              color={goal.color}
              size="md"
              showLabel={false}
              animate
            />
          </div>
        ))}
      </div>
    </div>
  );
}