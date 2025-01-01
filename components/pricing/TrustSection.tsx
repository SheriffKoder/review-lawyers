import React from 'react';
import { Shield, Clock, CreditCard } from 'lucide-react';
import { cn } from '@/utils/cn';

export function TrustSection() {
  const benefits = [
    {
      icon: Shield,
      title: 'Satisfaction Guaranteed',
      description: '30-day money-back guarantee'
    },
    {
      icon: Clock,
      title: 'Cancel Anytime',
      description: 'No long-term contracts'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'SSL encrypted checkout'
    }
  ];

  return (
    <div className="mt-16 pt-16 border-t border-white/10">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4">
          Trusted by 500+ Businesses
        </h3>
        <p className="text-gray-400">
          Join thousands of satisfied customers protecting their online reputation
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className={cn(
              "group text-center p-6 rounded-xl",
              "bg-white/5 backdrop-blur-sm",
              "border border-white/10",
              "hover:border-primary/50",
              "transition-all duration-300"
            )}
          >
            <benefit.icon className="w-8 h-8 mx-auto mb-4 text-primary transition-transform group-hover:scale-110" />
            <h4 className="text-lg font-semibold text-white mb-2">
              {benefit.title}
            </h4>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}