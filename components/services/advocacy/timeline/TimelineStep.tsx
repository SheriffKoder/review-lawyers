import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import type { ProcessStep } from './types';

interface TimelineStepProps {
  step: ProcessStep;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export function TimelineStep({ step, index, isActive, onClick }: TimelineStepProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = step.icon;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Connection Line */}
      <div className={cn(
        "absolute top-1/2 w-full",
        "hidden md:block",
        index === 0 ? "left-1/2" : index === 4 ? "right-1/2" : "inset-x-0",
        "h-0.5 bg-white/10"
      )}>
        <div className={cn(
          "absolute inset-y-0 left-0 bg-primary transition-all duration-500",
          isActive ? "right-0" : "right-full"
        )} />
      </div>

      {/* Step Content */}
      <div 
        onClick={onClick}
        className={cn(
          "relative cursor-pointer group",
          "transform transition-all duration-300",
          isActive && "scale-105"
        )}
      >
        {/* Connector Dot */}
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2",
          "w-4 h-4 rounded-full",
          "transition-all duration-300",
          isActive ? "bg-primary scale-125" : "bg-white/20"
        )}>
          {isActive && (
            <div className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
          )}
        </div>

        {/* Card */}
        <div className={cn(
          "mt-8 p-6 rounded-xl",
          "bg-black/40 backdrop-blur-sm",
          "border transition-all duration-300",
          isActive ? "border-primary shadow-lg shadow-primary/20" : "border-white/10",
          "hover:border-primary/50"
        )}>
          <Icon className={cn(
            "w-12 h-12 mb-4",
            "transition-all duration-300",
            isActive ? "text-primary" : "text-white/60",
            "group-hover:scale-110"
          )} />

          <h3 className={cn(
            "text-xl font-bold mb-2",
            "transition-colors duration-300",
            isActive ? "text-primary" : "text-white",
            "group-hover:text-primary"
          )}>
            {step.title}
          </h3>

          <p className={cn(
            "text-base transition-colors duration-300",
            isActive ? "text-gray-300" : "text-gray-400"
          )}>
            {step.description}
          </p>

          {/* Expanded Content */}
          <div className={cn(
            "mt-4 overflow-hidden transition-all duration-300",
            isActive ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          )}>
            <ul className="space-y-2">
              {step.details?.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-primary">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}