import React from 'react';
import { cn } from '@/utils/cn';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  className?: string;
}

export function TestimonialCard({ quote, author, role, className }: TestimonialCardProps) {
  return (
    <div className={cn(
      "group relative p-6 rounded-xl",
      "bg-white/5 backdrop-blur-sm",
      "border border-white/10",
      "hover:border-primary/50",
      "transition-all duration-300",
      className
    )}>
      <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
      
      <div className="relative">
        <Quote className="w-8 h-8 text-primary mb-4 transform transition-transform group-hover:scale-110" />
        <blockquote className="text-lg text-gray-300 mb-4">
          "{quote}"
        </blockquote>
        <cite className="flex items-center gap-2 not-italic">
          <span className="w-8 h-px bg-primary/50" />
          <div>
            <div className="font-medium text-white">{author}</div>
            <div className="text-sm text-gray-400">{role}</div>
          </div>
        </cite>
      </div>
    </div>
  );
}