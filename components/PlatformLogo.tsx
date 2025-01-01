import React from 'react';
import { cn } from '@/utils/cn';
import { ScaleOnHover } from './animations/ScaleOnHover';

interface PlatformLogoProps {
  name: string;
  logo: string;
  width: number;
  className?: string;
}

export function PlatformLogo({ name, logo, width, className }: PlatformLogoProps) {
  return (
    <ScaleOnHover>
      <div 
        className={cn(
          "relative group cursor-pointer transition-all duration-300",
          "w-[280px] h-[120px]", // Fixed dimensions for all logos
          className
        )}
        role="img"
        aria-label={`${name} integration`}
      >
        <div 
          className="absolute -inset-4 bg-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />
        
        <div className={cn(
          "relative h-full",
          "bg-white/5 rounded-xl p-6 backdrop-blur-sm",
          "border border-white/10 shadow-lg",
          "group-hover:border-primary/50 group-hover:shadow-xl",
          "transition-all duration-300 ease-out",
          "flex items-center justify-center"
        )}>
          <img
            src={logo}
            alt={`${name} logo`}
            className={cn(
              "max-w-[200px] max-h-[60px]", // Control image dimensions
              "transition-all duration-300",
              "group-hover:brightness-110",
              name.toLowerCase() === 'vrbo' ? 'brightness-0 invert opacity-70 group-hover:opacity-100' : 'opacity-70 group-hover:opacity-100'
            )}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </ScaleOnHover>
  );
}