import React, { useState } from 'react';
import { pricingPlans } from '../data/pricing';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { PricingCard } from '@/components/pricing/PricingCard';
import { PricingSlider } from '@/components/pricing/PricingSlider';
import { TrustSection } from '@/components/pricing/TrustSection';
import { FAQSection } from '@/components/pricing/FAQSection';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');
  const [propertyCount, setPropertyCount] = useState(27);

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingHeader 
          billingPeriod={billingPeriod}
          onBillingPeriodChange={setBillingPeriod}
        />

        {/* Interactive Pricing Slider */}
        <PricingSlider 
          onChange={setPropertyCount}
          className="mb-16"
        />
        
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard 
              key={plan.id} 
              plan={plan}
              billingPeriod={billingPeriod}
              propertyCount={propertyCount}
            />
          ))}
        </div>

        <TrustSection />
        <FAQSection />
      </div>
    </main>
  );
}