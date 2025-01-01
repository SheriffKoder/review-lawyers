import React from 'react';
import { Layers } from 'lucide-react';
import { RoadmapSection } from '@/components/roadmap/RoadmapSection';
import { roadmapItems } from '@/data/roadmap';

export default function RoadmapPage() {
  const launched = roadmapItems.filter(item => item.status === 'launched');
  const inProgress = roadmapItems.filter(item => item.status === 'in-progress');
  const planned = roadmapItems.filter(item => item.status === 'planned');

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Layers className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Product Roadmap
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover what we're building to make your review management even better
          </p>
        </div>

        <div className="space-y-16">
          <RoadmapSection 
            title="Recently Launched" 
            items={launched}
          />
          <RoadmapSection 
            title="In Progress" 
            items={inProgress}
          />
          <RoadmapSection 
            title="Coming Soon" 
            items={planned}
          />
        </div>
      </div>
    </main>
  );
}