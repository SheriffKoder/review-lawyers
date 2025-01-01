import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionService } from '@/services/subscriptionService';
import type { Subscription } from '@/types/subscription';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const loadSubscription = async () => {
      try {
        const data = await subscriptionService.getCurrentSubscription(user.id);
        setSubscription(data);
      } catch (err) {
        console.error('Failed to load subscription:', err);
        setError('Failed to load subscription details');
      } finally {
        setLoading(false);
      }
    };

    loadSubscription();
  }, [user?.id]);

  const updateSubscription = async (planId: string) => {
    if (!user?.id) {
      return { success: false, error: 'User not authenticated' };
    }
    
    setLoading(true);
    setError(null);

    try {
      const result = await subscriptionService.updateSubscription(user.id, planId);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      // Refresh subscription data
      const updated = await subscriptionService.getCurrentSubscription(user.id);
      setSubscription(updated);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update subscription';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    subscription,
    loading,
    error,
    updateSubscription
  };
}