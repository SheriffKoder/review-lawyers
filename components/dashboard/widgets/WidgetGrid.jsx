import React from 'react';
import { cn } from '@/utils/cn';
import { useWidgets } from '@/hooks/useWidgets';
import { Widget } from './Widget';
import { AddWidgetButton } from './AddWidgetButton';

export function WidgetGrid({ className }) {
  const { widgets, addWidget, removeWidget } = useWidgets();

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">My Quick Stats</h3>
        <AddWidgetButton onAdd={addWidget} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={() => removeWidget(widget.id)}
          />
        ))}
      </div>
    </div>
  );
}