import React from 'react';
import { cn } from '@/utils/cn';

interface PlatformBadgeProps {
  platform?: string;
  className?: string;
}

const PLATFORM_STYLES = {
  airbnb: 'bg-[#FF385C]/10 text-[#FF385C] border-[#FF385C]/20',
  vrbo: 'bg-[#3B5998]/10 text-[#3B5998] border-[#3B5998]/20',
  'booking.com': 'bg-[#003580]/10 text-[#003580] border-[#003580]/20',
  google: 'bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/20',
  yelp: 'bg-[#FF1A1A]/10 text-[#FF1A1A] border-[#FF1A1A]/20'
} as const;

export function PlatformBadge({ platform = 'Unknown', className }: PlatformBadgeProps) {
  const platformKey = platform.toLowerCase() as keyof typeof PLATFORM_STYLES;
  const styles = PLATFORM_STYLES[platformKey] || 'bg-primary/10 text-primary border-primary/20';

  return (
    <div className={cn(
      "px-3 py-1 text-xs font-medium rounded-full border",
      styles,
      "transition-all duration-300",
      className
    )}>
      {platform}
    </div>
  );
}