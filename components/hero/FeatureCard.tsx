import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="card">
      <div className="content">
        {/* Back of card */}
        <div className="back">
          <div className="back-content">
            <Icon className="w-12 h-12 text-white mb-4" />
            <strong className="text-white">{title}</strong>
          </div>
        </div>

        {/* Front of card */}
        <div className="front">
          <div className="img">
            <div className="circle" />
            <div className="circle" id="right" />
            <div className="circle" id="bottom" />
          </div>

          <div className="front-content">
            <small className="badge">Feature</small>
            <div className="description">
              <div className="title">
                <p className="title">
                  <strong>{title}</strong>
                </p>
              </div>
              <p className="text-sm text-gray-300 mt-2">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}