import React from 'react';
import { Brain, Shield, Scale, FileText } from 'lucide-react';
import { cn } from '@/utils/cn';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Our advanced AI system automatically identifies policy violations and unfair reviews.'
  },
  {
    icon: Shield,
    title: 'Professional Defense',
    description: 'Expert representation across all major review platforms.'
  },
  {
    icon: Scale,
    title: 'Legal Expertise',
    description: 'Deep understanding of platform policies and review guidelines.'
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Comprehensive evidence packages and professional documentation.'
  }
];

interface AdvocacyFeaturesProps {
  className?: string;
}

export function AdvocacyFeatures({ className }: AdvocacyFeaturesProps) {
  return (
    <div className={className}>
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Why Choose Our Advocacy Service
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "group relative bg-white/5 backdrop-blur-sm rounded-xl p-6",
              "border border-white/10 hover:border-primary/50",
              "transition-all duration-300"
            )}
          >
            <feature.icon className="w-12 h-12 text-primary mb-4 transform transition-transform group-hover:scale-110" />
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}