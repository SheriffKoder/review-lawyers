// @ts-nocheck
import React, { useState } from 'react';
import { TabNavigation } from '../navigation/TabNavigation';
import { ReviewManagement } from './ReviewManagement';
import { AnalyticsOverview } from './AnalyticsOverview';
import { cn } from '@/utils/cn';

interface DashboardTabsProps {
  className?: string;
  businessType: 'rental' | 'restaurant';
  platform: string;
  rating: number | null;
  tempListings: any[];
  tempReviews: any[];
}

export function DashboardTabs({ className, businessType, platform, rating, tempListings, tempReviews }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState('active');

  const tabs = [
    { id: 'active', label: 'Active Cases', count: 5 },
    { id: 'resolved', label: 'Resolved Cases', count: 12 },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      /> */}

      <div className="transition-all duration-300">
        {activeTab === 'active' && (
          <ReviewManagement 
            businessType={businessType}
            platform={platform}
            rating={rating}
            tempReviews={tempReviews}
            tempListings={tempListings}
          />
        )}
        {/* {activeTab === 'resolved' && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Resolved Cases</h2>

          </div>
        )} */}
        {/* {activeTab === 'analytics' && (
          <AnalyticsOverview 
            businessType={businessType}
            platform={platform}
            rating={rating}
          />
        )} */}
      </div>
    </div>
  );
}