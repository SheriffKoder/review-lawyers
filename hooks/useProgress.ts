import { useState, useEffect } from 'react';

interface Goal {
  label: string;
  current: number;
  target: number;
  color: 'primary' | 'success' | 'warning' | 'error';
}

export function useProgress() {
  const [goals] = useState<Goal[]>([
    {
      label: 'Cases Resolved',
      current: 45,
      target: 100,
      color: 'primary'
    },
    {
      label: 'Response Rate',
      current: 92,
      target: 100,
      color: 'success'
    },
    {
      label: 'Average Rating',
      current: 4,
      target: 5,
      color: 'warning'
    }
  ]);

  return { goals };
}