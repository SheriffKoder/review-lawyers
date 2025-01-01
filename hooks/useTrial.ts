import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface TrialSignupData {
  email: string;
  password: string;
  businessName: string;
  businessType: 'rental' | 'restaurant';
  fullName: string;
}

export function useTrial() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startTrial = async (data: TrialSignupData) => {
    setLoading(true);
    setError(null);

    try {
      // Sign in the user
      const result = await signIn({
        email: data.email,
        password: data.password
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to create account');
      }

      // Save trial data to localStorage
      const trialData = {
        businessName: data.businessName,
        businessType: data.businessType,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
        status: 'active'
      };

      localStorage.setItem('trial_data', JSON.stringify(trialData));

      return { success: true };
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    startTrial,
    loading,
    error
  };
}