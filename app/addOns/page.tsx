"use client"
import React from 'react';
import { Plus } from 'lucide-react';
import { AddonCategorySection } from '@/components/pricing/addons/AddonCategorySection';
import { addons, addonCategories } from '@/data/addons';
import type { Addon, AddonCategory } from '@/types/addon';

export default function AddOnsPage() {
  const handleSelectAddon = (addon: Addon) => {
    // Handle addon selection - this would integrate with your subscription system
    console.log('Selected addon:', addon);
  };

  // Group addons by category
  const addonsByCategory = addons.reduce((acc, addon) => {
    if (!acc[addon.category]) {
      acc[addon.category] = [];
    }
    acc[addon.category].push(addon);
    return acc;
  }, {} as Record<AddonCategory, Addon[]>);

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-xl bg-primary/10 mb-4 group">
            <Plus className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Enhance Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Add powerful features to your subscription with our premium add-ons
          </p>
        </div>

        <div className="space-y-16">
          {Object.entries(addonCategories).map(([category, title]) => (
            addonsByCategory[category as AddonCategory] && (
              <AddonCategorySection
                key={category}
                title={title}
                addons={addonsByCategory[category as AddonCategory]}
                onSelectAddon={handleSelectAddon}
              />
            )
          ))}
        </div>
      </div>
    </main>
  );
}