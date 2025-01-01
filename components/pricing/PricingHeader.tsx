import React, { useState } from 'react';
import { CreditCard, Calculator } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ConsultationButton } from '../consultation/ConsultationButton';
import { RoiCalculator } from './RoiCalculator';
import { ANNUAL_DISCOUNT } from '@/data/pricing';

interface PricingHeaderProps {
  billingPeriod: 'monthly' | 'annually';
  onBillingPeriodChange: (period: 'monthly' | 'annually') => void;
}

export function PricingHeader({ billingPeriod, onBillingPeriodChange }: PricingHeaderProps) {
  const [isRoiCalculatorOpen, setIsRoiCalculatorOpen] = useState(false);
  const discount = Math.round(ANNUAL_DISCOUNT * 100);

  return (
    <div className="text-center mb-16">
      <div className="inline-block group">
        <CreditCard className="h-16 w-16 text-primary mx-auto mb-6 transform transition-transform group-hover:scale-110" />
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          Choose the perfect plan for your business needs
        </p>

        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-2 bg-white/5 rounded-full p-1">
            <button 
              onClick={() => onBillingPeriodChange('monthly')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium",
                "transition-all duration-300",
                billingPeriod === 'monthly' 
                  ? "bg-primary text-black" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button 
              onClick={() => onBillingPeriodChange('annually')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium",
                "transition-all duration-300",
                billingPeriod === 'annually' 
                  ? "bg-primary text-black" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              Annual (Save {discount}%)
            </button>
          </div>

          <button
            onClick={() => setIsRoiCalculatorOpen(true)}
            className={cn(
              "px-4 py-2 rounded-lg",
              "bg-white/5 text-gray-400",
              "border border-white/10",
              "hover:bg-white/10 hover:text-white",
              "transition-all duration-200",
              "flex items-center gap-2"
            )}
          >
            <Calculator className="w-5 h-5" />
            ROI Calculator
          </button>

          <ConsultationButton />
        </div>
      </div>

      <RoiCalculator 
        isOpen={isRoiCalculatorOpen}
        onClose={() => setIsRoiCalculatorOpen(false)}
      />
    </div>
  );
}