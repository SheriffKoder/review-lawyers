// @ts-nocheck
import React from 'react';
import { redirect } from 'next/navigation';
import { cn } from '@/utils/cn';
import { Button } from '../ui/Button';
import { calculateAnnualPrice } from '@/data/pricing';
import type { PricingPlan } from '@/types/pricing';
import { ConsultationButton } from '../consultation/ConsultationButton';

interface PricingCardProps {
  plan: PricingPlan;
  billingPeriod: 'monthly' | 'annually';
  propertyCount: number;
}

export function PricingCard({ plan, billingPeriod, propertyCount }: PricingCardProps) {
   

  // Get base price with annual discount if applicable
  const basePrice = billingPeriod === 'annually' 
    ? calculateAnnualPrice(plan.price) / 12 
    : plan.price;

  // Calculate additional properties pricing
  const includedProperties = (() => {
    switch (plan.id) {
      case 'starter': return 2;
      case 'professional': return 15;
      case 'enterprise': return 50;
      default: return 0;
    }
  })();

  const pricePerProperty = (() => {
    switch (plan.id) {
      case 'starter': return 4.99;
      case 'professional': return 9.99;
      case 'enterprise': return 14.99;
      default: return 0;
    }
  })();

  const additionalProperties = Math.max(0, propertyCount - includedProperties);
  const additionalCost = additionalProperties * pricePerProperty;
  const totalPrice = basePrice + additionalCost;

  // Calculate annual price if needed
  const annualPrice = billingPeriod === 'annually' 
    ? calculateAnnualPrice(totalPrice * 12)
    : null;

  const handleAction = () => {
    if (plan.id === 'enterprise') {
      // For enterprise plan, show consultation modal
      return;
    }
    // For other plans, redirect to free trial
    redirect('/free-trial', {
      state: {
        selectedPlan: plan.id,
        billingPeriod,
        propertyCount
      }
    });
  };

  return (
    <div 
      className={cn(
        "group relative bg-white/5 backdrop-blur-sm rounded-xl p-8",
        "transform transition-all duration-300",
        "hover:shadow-xl hover:shadow-primary/10",
        "hover:-translate-y-2",
        "border",
        plan.popular && "scale-105",
        plan.popular ? "border-primary hover:border-primary/80" : "border-white/10 hover:border-primary/20"
      )}
    >
      {plan.popular && (
        <div className={cn(
          "absolute -top-4 left-1/2 -translate-x-1/2",
          "px-4 py-1.5 rounded-full",
          "bg-primary text-black font-medium text-sm",
          "transform transition-transform duration-300",
          "group-hover:scale-105"
        )}>
          Most Popular
        </div>
      )}
      
      <div className="relative flex flex-col  h-full">
        <h2 className="text-2xl font-bold text-white mb-2 transition-colors group-hover:text-primary">
          {plan.name}
        </h2>
        
        <p className="text-gray-400 mb-6 transition-colors group-hover:text-gray-300">
          {plan.description}
        </p>
        
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white transition-colors group-hover:text-primary">
              ${totalPrice.toFixed(2)}
            </span>
            <span className="text-gray-400">/mo</span>
          </div>
          
          {billingPeriod === 'annually' && annualPrice && (
            <p className="mt-2 text-sm">
              <span className="text-primary">Billed annually</span>
              <span className="text-gray-400"> (${annualPrice.toFixed(2)}/year)</span>
            </p>
          )}

          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-400">
              Includes {includedProperties} properties
            </p>
            {additionalProperties > 0 && (
              <p className="text-sm text-primary">
                +${additionalCost.toFixed(2)}/mo for {additionalProperties} additional properties
              </p>
            )}
          </div>
        </div>
        
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 group/feature">
              <svg
                className="w-5 h-5 mt-0.5 shrink-0 text-primary transition-all duration-300 group-hover/feature:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-300 group-hover:text-gray-200 transition-colors">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {plan.id === 'enterprise' ? (
          <ConsultationButton className="w-full" />
        ) : (
          <Button 
            onClick={handleAction}
            fullWidth
            variant={plan.popular ? 'primary' : 'secondary'}
            className={cn(
              "transform transition-all duration-300 mt-auto",
              "group-hover:scale-[1.02]",
              "group-hover:shadow-lg",
              plan.popular ? "group-hover:shadow-primary/20" : "group-hover:shadow-white/10"
            )}
          >
            Get Started
          </Button>
        )}

        <p className="mt-4 text-center text-sm text-gray-400">
          30-day money-back guarantee
        </p>
      </div>
    </div>
  );
}