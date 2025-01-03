"use client"
import React, { useState } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { useSubscription } from '@/hooks/useSubscription';
import { PLANS } from '@/data/plans';

// Firebase, get user info depending on their 'uid' value
// import { useAuth } from '@/contexts/AuthContext';
// import {fetchUserData} from "@/firebase/fetchUserData";
import { getFirestore, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

// for backend payment handling
import { chargeAndSubscribe } from "@/app/api/Stripe/charge-and-subscribe/route";
import { getAuth } from "firebase/auth";
import ApiIntegrationBox from '@/app/test3/ApiIntegration';


// interface PlanSelectionModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   currentPlan: string;
// }

export function ProviderSelectionModal({isOpen, onClose, userData, user}) {
  
  
  const { updateSubscription } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;




  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-black/90 rounded-2xl border border-white/10 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Select a Plan</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <ApiIntegrationBox userData={userData} user={user}/>

        {/* <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative bg-white/5 rounded-xl p-6 border flex flex-col",
                "transition-all duration-300",
                plan.popular ? "border-primary" : "border-white/10",
                "hover:border-primary/50"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-black text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                // onClick={() => handlePlanSelect(plan.id)}
                variant={true ? 'secondary' : 'primary'}
                fullWidth
                disabled={loading}
                className='mt-auto'
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : true ? (
                  'Current Plan'
                ) : (
                  'Select Plan'
                )}
              </Button>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}