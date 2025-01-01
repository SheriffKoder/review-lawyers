import React from 'react';
import { Brain, Shield, Star, Zap } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { cn } from '@/utils/cn';

export function HeroContent() {
  const features = [
    {
      icon: Shield,
      title: 'AI-Powered Defense',
      description: 'Advanced algorithms identify fake reviews and policy violations for immediate action, ensuring swift protection of your reputation.'
    },
    {
      icon: Star,
      title: '92% Success Rate',
      description: 'Proven track record in removing unwarranted reviews across multiple platforms, backed by data-driven strategies and legal expertise.'
    },
    {
      icon: Zap,
      title: 'Instant Response',
      description: '24/7 monitoring and rapid case initiation with automated alerts and real-time threat assessment. Our system ensures immediate action on potential issues.'
    }
  ];

  return (
    <div className="text-center space-y-16">
      {/* AI Brain Logo Animation */}
      <div className="flex items-center justify-center animate-fade-in pt-8">
        <div className="relative">
          <Brain className="h-16 w-16 text-primary animate-pulse" />
          
          {/* Neural Network Effect */}
          <div className="absolute inset-0 h-16 w-16">
            <div className="absolute inset-0 animate-ping opacity-20 rounded-full border-2 border-primary" />
            <div className="absolute inset-0 animate-pulse opacity-30">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-full w-full border-2 border-primary rounded-full"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                    animation: `pulse ${1 + i * 0.2}s cubic-bezier(0.4, 0, 0.6, 1) infinite`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Heading */}
      <div className={cn(
        "relative space-y-6 animate-fade-in-up",
        "p-8 rounded-3xl",
        "animate-gradient",
        "overflow-hidden"
      )}>
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Defend Your Reputation
            <span className="block text-primary">with AI-Powered Precision</span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto mt-6">
            Protect your business reputation with AI-driven tools, legal expertise, and instant case handling.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fade-in-up delay-100">
        {features.map((feature, index) => (
          <div key={index} className="h-full">
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}