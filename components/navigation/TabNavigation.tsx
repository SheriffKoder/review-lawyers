import React from 'react';
import { cn } from '@/utils/cn';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function TabNavigation({ 
  tabs, 
  activeTab, 
  onChange,
  className 
}: TabNavigationProps) {
  return (
    <div className={cn(
      "flex gap-2 p-1",
      "bg-white/5 backdrop-blur-sm",
      "border border-white/10 rounded-lg",
      className
    )}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-4 py-2 rounded-lg",
            "text-sm font-medium",
            "transition-all duration-300",
            "relative group",
            activeTab === tab.id ? [
              "bg-primary text-black",
              "shadow-lg shadow-primary/25"
            ] : [
              "text-gray-400 hover:text-white",
              "hover:bg-white/5"
            ]
          )}
        >
          <span className="relative z-10 flex items-center gap-2">
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "px-2 py-0.5 text-xs rounded-full",
                "transition-colors duration-300",
                activeTab === tab.id ? [
                  "bg-black/20 text-black"
                ] : [
                  "bg-white/10 text-gray-400",
                  "group-hover:bg-white/20 group-hover:text-white"
                ]
              )}>
                {tab.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}