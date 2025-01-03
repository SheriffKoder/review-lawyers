import React from 'react';
import { AddonCard } from './AddonCard';
import { cn } from '@/utils/cn';
import type { Addon } from '@/types/addon';

interface AddonCategorySectionProps {
  title: string;
  addons: Addon[];
  onSelectAddon: (addon: Addon) => void;
  className?: string;
}

export function AddonCategorySection({ 
  title, 
  addons, 
  onSelectAddon,
  className 
}: AddonCategorySectionProps) {
  return (
    <section className={cn("space-y-6", className)}>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addons.map((addon) => (
          <AddonCard
            key={addon.id}
            addon={addon}
            onSelect={onSelectAddon}
          />
        ))}
      </div>
    </section>
  );
}