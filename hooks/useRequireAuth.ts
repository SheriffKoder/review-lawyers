// @ts-nocheck
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function useRequireAuth(redirectTo: string = '/login') {
  const { user, loading } = useAuth();
   

  useEffect(() => {
    if (!loading && !user) {
      redirect(redirectTo);
    }
  }, [user, loading, navigate, redirectTo]);

  return { user, loading };
}