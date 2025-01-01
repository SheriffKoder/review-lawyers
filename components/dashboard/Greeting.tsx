import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/utils/cn';

interface GreetingProps {
  className?: string;
}

export function Greeting({ className }: GreetingProps) {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = () => {
      const hours = new Date().getHours();
      let timeGreeting = '';

      if (hours < 12) {
        timeGreeting = 'Good Morning';
      } else if (hours < 18) {
        timeGreeting = 'Good Afternoon';
      } else {
        timeGreeting = 'Good Evening';
      }

      return `${timeGreeting}, ${user?.name || 'Guest'}`;
    };

    setGreeting(getGreeting());

    // Update greeting every minute
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className={cn("space-y-1", className)}>
      <h2 className={cn(
        "text-2xl font-bold text-white",
        "animate-fade-in-up"
      )}>
        {greeting}
      </h2>
      <p className={cn(
        "text-gray-400",
        "animate-fade-in-up delay-100"
      )}>
        Welcome to your dashboard
      </p>
    </div>
  );
}