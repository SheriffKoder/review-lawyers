import React from 'react';
import { Clock, MessageSquare, AlertTriangle, ArrowRight, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { PlatformBadge } from './PlatformBadge';
import type { Review } from '@/types/review';

interface ActiveCaseProps {
  review: Review;
  onResolve: (review: Review) => void;
}

export function ActiveCase({ review, onResolve }: ActiveCaseProps) {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
      
      <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 group-hover:border-primary/50 transition-all duration-300">
        {/* Header with Platform Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Clock className="w-5 h-5 text-primary animate-pulse" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Live Monitoring</span>
              <span className="text-xs text-gray-400">Response time: 2-4 hours</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PlatformBadge platform={review.platform} />
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
              {review.status}
            </span>
          </div>
        </div>

        {/* Review Content */}
        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-white/5 rounded-lg p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium text-white">Review by {review.author}</h3>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
              <p className="text-gray-300">
                {review.content}
              </p>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="flex items-start gap-3 p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-500 mb-1">
                AI Analysis: High Priority Case
              </p>
              <p className="text-sm text-gray-400">
                Policy violation detected. Our team has already initiated action to resolve this issue.
              </p>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
              <Button 
                variant="secondary"
                className="group/btn bg-white/5 hover:bg-white/10"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Response
              </Button>
              <Button
                onClick={() => onResolve(review)}
                className="group/btn relative overflow-hidden"
              >
                <span className="relative flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Resolve Case
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
            
            {/* Case Progress */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-sm text-yellow-500">Case in progress</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}