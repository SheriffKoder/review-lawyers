import React, { useState } from 'react';
import { Calculator, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/utils/cn';

interface RoiCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoiCalculator({ isOpen, onClose }: RoiCalculatorProps) {
  const [formData, setFormData] = useState({
    averageNightlyRate: 200,
    occupancyRate: 75,
    propertyCount: 5,
    negativeReviewsPerMonth: 2,
    averageBookingLoss: 3
  });

  const calculateRoi = () => {
    const monthlyRevenue = formData.averageNightlyRate * (formData.occupancyRate / 100) * 30 * formData.propertyCount;
    const lostRevenuePerReview = monthlyRevenue * (formData.averageBookingLoss / 100);
    const monthlyLoss = lostRevenuePerReview * formData.negativeReviewsPerMonth;
    const annualLoss = monthlyLoss * 12;
    const subscriptionCost = 19.99 * 12; // Basic plan annual cost
    const potentialSavings = annualLoss - subscriptionCost;

    return {
      monthlyLoss,
      annualLoss,
      subscriptionCost,
      potentialSavings
    };
  };

  const roi = calculateRoi();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-black/90 rounded-2xl border border-white/10 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">ROI Calculator</h2>
          <p className="text-gray-400">See how much revenue you could protect with our review management system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Average Nightly Rate ($)</label>
              <input
                type="number"
                value={formData.averageNightlyRate}
                onChange={(e) => setFormData(prev => ({ ...prev, averageNightlyRate: Number(e.target.value) }))}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Occupancy Rate (%)</label>
              <input
                type="number"
                value={formData.occupancyRate}
                onChange={(e) => setFormData(prev => ({ ...prev, occupancyRate: Number(e.target.value) }))}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Number of Properties</label>
              <input
                type="number"
                value={formData.propertyCount}
                onChange={(e) => setFormData(prev => ({ ...prev, propertyCount: Number(e.target.value) }))}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Negative Reviews per Month</label>
              <input
                type="number"
                value={formData.negativeReviewsPerMonth}
                onChange={(e) => setFormData(prev => ({ ...prev, negativeReviewsPerMonth: Number(e.target.value) }))}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Average Booking Loss per Review (%)</label>
              <input
                type="number"
                value={formData.averageBookingLoss}
                onChange={(e) => setFormData(prev => ({ ...prev, averageBookingLoss: Number(e.target.value) }))}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Potential Impact</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Monthly Revenue Loss</p>
                  <p className="text-2xl font-bold text-red-400">
                    ${roi.monthlyLoss.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Annual Revenue Loss</p>
                  <p className="text-2xl font-bold text-red-400">
                    ${roi.annualLoss.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400">Annual Subscription Cost</p>
                  <p className="text-xl font-bold text-primary">
                    ${roi.subscriptionCost.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400">Potential Annual Savings</p>
                  <p className="text-3xl font-bold text-green-400">
                    ${roi.potentialSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={onClose} fullWidth>
              Close Calculator
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}