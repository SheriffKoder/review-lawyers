// @ts-nocheck
import { useState } from 'react';
import { useSupabaseAuth } from '@/lib/supabase/hooks';
import { authService, type AuthCredentials } from '@/lib/supabase/services/auth';

export function useAuth() {
  const { user, loading } = useSupabaseAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (credentials: AuthCredentials) => {
    setIsLoading(true);
    setError(null);
    
    const result = await authService.signIn(credentials);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setIsLoading(false);
    return result;
  };

  const signUp = async (credentials: AuthCredentials) => {
    setIsLoading(true);
    setError(null);
    
    const result = await authService.signUp(credentials);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setIsLoading(false);
    return result;
  };

  const signOut = async () => {
    setIsLoading(true);
    setError(null);
    
    const result = await authService.signOut();
    
    if (!result.success) {
      setError(result.error);
    }
    
    setIsLoading(false);
    return result;
  };

  return {
    user,
    error,
    loading: loading || isLoading,
    signIn,
    signUp,
    signOut
  };
}