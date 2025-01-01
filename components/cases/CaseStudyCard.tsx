import React from 'react';
import { Star, MessageSquare, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { CaseStudy } from '@/data/caseStudies';

interface CaseStudyCardProps {
  study: CaseStudy;
  onClick: () => void;
}

export function CaseStudyCard({ study, onClick }: CaseStudyCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden",
        "border border-white/10 hover:border-primary/50",
        "transform transition-all duration-300",
        "hover:scale-[1.02] hover:-translate-y-1",
        "hover:shadow-xl hover:shadow-primary/10",
        "cursor-pointer"
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={study.image}
          alt={study.title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
            {study.category}
          </span>
          <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
            {study.business}
          </h3>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
          {study.title}
        </h2>

        <p className="text-gray-400 mb-6 line-clamp-2">
          {study.challenge}
        </p>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <MetricCard
            icon={Star}
            label="Rating Improved"
            value={`+${study.metrics.ratingImprovement}`}
          />
          <MetricCard
            icon={MessageSquare}
            label="Reviews Removed"
            value={study.metrics.reviewsRemoved}
          />
          <MetricCard
            icon={TrendingUp}
            label="Response Rate"
            value={`${study.metrics.responseRate}%`}
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="text-center group/metric">
      <Icon className="h-5 w-5 mx-auto mb-2 text-primary transition-transform group-hover/metric:scale-110" />
      <p className="text-sm text-gray-400 transition-colors group-hover/metric:text-gray-300">
        {label}
      </p>
      <p className="text-lg font-bold text-white transition-colors group-hover/metric:text-primary">
        {value}
      </p>
    </div>
  );
}