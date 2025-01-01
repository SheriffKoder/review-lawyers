import { supabase } from '@/lib/supabase/client';
import { PLANS } from '@/data/plans';
import type { Subscription, SubscriptionUpdate } from '@/types/subscription';

export const subscriptionService = {
  async getCurrentSubscription(userId: string): Promise<Subscription | null> {
    try {
      // Get user's subscription with plan details
      const { data: subData, error: subError } = await supabase
        .from('subscriptions')
        .select('*, plan:subscription_plans(*)')
        .eq('user_id', userId)
        .maybeSingle();

      if (subError) throw subError;

      // If subscription exists, return it
      if (subData) return subData;

      // If no subscription, create default Professional plan subscription
      const { data: planData, error: planError } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('name', 'Professional')
        .single();

      if (planError) throw planError;
      if (!planData) throw new Error('Professional plan not found');

      // Create new subscription
      const { data: newSub, error: createError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan_id: planData.id,
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .select('*, plan:subscription_plans(*)')
        .single();

      if (createError) throw createError;
      return newSub;
    } catch (err) {
      console.error('Error getting subscription:', err);
      return null;
    }
  },

  async updateSubscription(userId: string, planId: string): Promise<SubscriptionUpdate> {
    try {
      // Get plan details from frontend config
      const plan = PLANS.find(p => p.id === planId);
      if (!plan) {
        throw new Error('Invalid plan selected');
      }

      // Get database plan record
      const { data: planData, error: planError } = await supabase
        .from('subscription_plans')
        .select('id')
        .eq('name', plan.name)
        .single();

      if (planError) throw planError;
      if (!planData) throw new Error(`${plan.name} plan not found in database`);

      // Update subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          plan_id: planData.id,
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        subscription: {
          id: data.id,
          planId: data.plan_id,
          status: data.status
        }
      };
    } catch (err) {
      console.error('Failed to update subscription:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to update subscription'
      };
    }
  }
};