import React, { useState } from 'react';
import { ArrowRight, Play, Info, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { redirect } from 'next/navigation';
import { ScheduleDemo } from '../scheduling/ScheduleDemo';
import { cn } from '@/utils/cn';

interface HeroActionsProps {
  onFreeTrial: () => void;
  onWatchDemo: () => void;
}

export function HeroActions({ onFreeTrial, onWatchDemo }: HeroActionsProps) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  //  

  return (
    <div className="mt-16 flex flex-col items-center animate-fade-in-up delay-200">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
        <Button 
          onClick={onFreeTrial} 
          size="lg"
          className="group relative min-w-[200px] hover:scale-105 hover:-translate-y-1"
          icon={<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
        >
          Start Free Trial
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={() => setIsScheduleOpen(true)}
          size="lg"
          className="group min-w-[200px] hover:scale-105"
          icon={<Calendar className="w-5 h-5 transition-transform group-hover:scale-110" />}
        >
          Schedule Demo
        </Button>

        <Button 
          variant="secondary" 
          onClick={onWatchDemo} 
          size="lg"
          className="group min-w-[200px] hover:scale-105"
          icon={<Play className="w-5 h-5 transition-transform group-hover:scale-110" />}
        >
          Watch Demo
        </Button>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="secondary"
          size="sm"
          className="group text-sm opacity-80 hover:opacity-100"
          icon={<Info className="w-4 h-4" />}
          onClick={() => redirect('/features')}
        >
          Learn More
        </Button>
        <p className="text-sm text-gray-400">
          Get started in{' '}
          <span className={cn(
            "text-primary font-semibold",
            "relative inline-block",
            "after:content-[''] after:absolute after:left-0 after:right-0",
            "after:bottom-0 after:h-[2px] after:bg-primary",
            "after:transform after:scale-x-100",
            "after:transition-transform after:duration-300",
            "hover:after:scale-x-0"
          )}>
            29 seconds
          </span>
          {' '}• No credit card required
        </p>
      </div>

      <ScheduleDemo 
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
    </div>
  );
}