import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/utils/cn';

interface ScheduleDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleDemo({ isOpen, onClose }: ScheduleDemoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-black/90 rounded-2xl border border-white/10 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Schedule a Demo</h2>
          <p className="text-gray-400">See how our AI-powered review defense system works.</p>
        </div>

        {/* Embed your preferred scheduling tool (e.g., Calendly) */}
        <div className="aspect-video w-full">
          <iframe
            src="https://calendly.com/your-scheduling-link"
            className="w-full h-full rounded-xl"
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
}