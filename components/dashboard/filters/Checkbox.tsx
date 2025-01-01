import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({ label, checked, onChange, className }: CheckboxProps) {
  return (
    <label className={cn("flex items-center gap-2 cursor-pointer", className)}>
      <div
        className={cn(
          "w-5 h-5 rounded border",
          "flex items-center justify-center",
          "transition-colors duration-200",
          checked ? [
            "bg-primary border-primary",
            "text-black"
          ] : [
            "border-white/20",
            "hover:border-primary/50"
          ]
        )}
      >
        {checked && <Check className="w-3 h-3" />}
      </div>
      <span className="text-sm text-gray-400">{label}</span>
    </label>
  );
}