import React from 'react';
import { FooterContent } from './FooterContent';
import { FooterCopyright } from './FooterCopyright';
import { GradientBackground } from '../effects/GradientBackground';
import { cn } from '@/utils/cn';

export function FooterSection() {
  return (
    <GradientBackground 
      variant="dark" 
      className={cn(
        "border-t border-gray-800",
        "bg-black/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <FooterContent />
        <FooterCopyright />
      </div>
    </GradientBackground>
  );
}