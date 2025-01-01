import React from 'react';
import { X } from 'lucide-react';
import { ReportBuilder } from './ReportBuilder';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportsModal({ isOpen, onClose }: ReportsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-black/90 rounded-2xl border border-white/10 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <ReportBuilder />
      </div>
    </div>
  );
}