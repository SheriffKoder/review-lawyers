import React from 'react';
import { cn } from '@/utils/cn';
import type { RoadmapItem } from '@/data/roadmap';

interface RoadmapSectionProps {
  title: string;
  items: RoadmapItem[];
  className?: string;
}

export function RoadmapSection({ title, items, className }: RoadmapSectionProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300"
          >
            <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-sm text-gray-400">{item.date}</span>
                </div>
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}