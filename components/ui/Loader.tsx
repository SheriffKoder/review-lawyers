import React from 'react';
import { cn } from '@/utils/cn';

interface LoaderProps {
  words?: string[];
  className?: string;
}

export function Loader({ 
  words = ['loading', 'analyzing', 'processing', 'reviewing', 'loading'],
  className 
}: LoaderProps) {
  return (
    <div className={cn("bg-black/90 backdrop-blur-sm rounded-xl p-6", className)}>
      <div className="loader">
        <p className="text-gray-400 font-medium text-2xl">loading</p>
        <div className="words">
          {words.map((word, index) => (
            <span key={index} className="word text-primary">
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}