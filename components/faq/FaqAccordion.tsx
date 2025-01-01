import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative",
            "bg-white/5 backdrop-blur-sm",
            "border border-white/10 rounded-xl",
            "overflow-hidden",
            "transition-all duration-300",
            openIndex === index && "border-primary/50"
          )}
        >
          {/* Glow effect */}
          <div className={cn(
            "absolute -inset-px rounded-xl opacity-0 blur",
            "bg-gradient-to-r from-primary/20 to-blue-500/20",
            "transition-opacity duration-300",
            openIndex === index && "opacity-100"
          )} />

          {/* Question button */}
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="relative w-full px-6 py-4 text-left flex items-center justify-between"
          >
            <span className="font-medium text-white">{item.question}</span>
            <ChevronDown className={cn(
              "w-5 h-5 text-gray-400 transition-transform duration-300",
              openIndex === index && "rotate-180"
            )} />
          </button>

          {/* Answer panel */}
          <div className={cn(
            "relative px-6 transition-all duration-300 ease-in-out",
            "transform origin-top",
            openIndex === index ? "py-4 border-t border-white/10" : "max-h-0"
          )}>
            <p className="text-gray-400">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}