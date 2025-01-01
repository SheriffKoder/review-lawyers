import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ProcessCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function ProcessCard({
  icon: Icon,
  title,
  description,
  color,
  isActive,
  onClick
}: ProcessCardProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className={cn(
        "group cursor-pointer card-hover hover-focus-ring",
        "outline-none",
        isActive && "scale-105"
      )}
    >
      <div className={cn(
        "relative flex items-start gap-4 p-6 rounded-xl",
        "bg-gray-900/50 backdrop-blur-sm",
        "border-2 border-transparent",
        isActive && [
          "border-primary",
          "shadow-[0_0_15px_rgba(23,217,255,0.3)]"
        ],
        "group-hover:border-primary",
        "group-hover:shadow-[0_0_15px_rgba(23,217,255,0.3)]",
        "transition-all duration-300"
      )}>
        {/* Icon container */}
        <div
          className={cn(
            "relative p-3 rounded-lg",
            "transition-all duration-300",
            "group-hover:scale-110",
            "bg-gradient-to-br"
          )}
          style={{ 
            backgroundColor: `${color}20`,
            boxShadow: `0 0 20px ${color}20`
          }}
        >
          <Icon
            className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
            style={{ color }}
          />
        </div>
        
        {/* Content */}
        <div className="relative flex-1">
          <h3 className={cn(
            "text-xl font-bold text-white mb-2",
            "transition-colors duration-300",
            "group-hover:text-primary"
          )}>
            {title}
          </h3>
          
          <p className={cn(
            "text-gray-400",
            "transition-colors duration-300",
            "group-hover:text-gray-300"
          )}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}