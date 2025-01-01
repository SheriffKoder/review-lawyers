import React from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import { redirect } from 'next/navigation';

export function BlogHeader() {
  //  

  return (
    <div className="flex justify-between items-start mb-16">
      <div className="group">
        <BookOpen className="h-16 w-16 text-primary mb-6 transform transition-transform group-hover:scale-110" />
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          Blog & Resources
        </h1>
        <p className="text-xl text-black/80 dark:text-white/80 max-w-3xl">
          Expert insights and strategies for managing your online reputation.
        </p>
      </div>
      <Button 
        onClick={() => redirect('/free-trial')}
        className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
      >
        Start Free Trial
      </Button>
    </div>
  );
}