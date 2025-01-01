import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { WidgetPicker } from './WidgetPicker';

interface AddWidgetButtonProps {
  onAdd: (widgetType: string) => void;
}

export function AddWidgetButton({ onAdd }: AddWidgetButtonProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsPickerOpen(true)}
        className="group"
      >
        <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
        Add Widget
      </Button>

      {isPickerOpen && (
        <WidgetPicker
          onSelect={(type) => {
            onAdd(type);
            setIsPickerOpen(false);
          }}
          onClose={() => setIsPickerOpen(false)}
        />
      )}
    </div>
  );
}