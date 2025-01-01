import { AuthError } from '@supabase/supabase-js';

export function handleAuthError(error: unknown): string {
  if (error instanceof AuthError) {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Invalid email or password';
      case 'Email not confirmed':
        return 'Please confirm your email address';
      case 'User already registered':
        return 'An account with this email already exists';
      case 'Invalid email':
        return 'Please enter a valid email address';
      case 'Password is too short':
        return 'Password must be at least 6 characters';
      case 'Rate limit exceeded':
        return 'Too many attempts. Please try again later';
      default:
        return error.message;
    }
  }
  return 'An unexpected error occurred. Please try again.';
}