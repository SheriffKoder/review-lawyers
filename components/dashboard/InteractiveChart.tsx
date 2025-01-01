import React from 'react';
import { cn } from '@/utils/cn';
import type { ChartDataPoint } from '@/types/chart';

interface TooltipProps {
  data: ChartDataPoint;
  className?: string;
}

function Tooltip({ data, className }: TooltipProps) {
  return (
    <div className={cn(
      "absolute -top-16 left-1/2 -translate-x-1/2 bg-black/90 text-white",
      "text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10",
      "border border-white/10 backdrop-blur-sm",
      className
    )}>
      <div className="font-medium mb-1">Statistics for {data.date}</div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span>Total: {data.total}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span>Positive: {data.positive}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span>Negative: {data.negative}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span>Removed: {data.removed}</span>
        </div>
      </div>
    </div>
  );
}

interface InteractiveChartProps {
  data: ChartDataPoint[];
  title: string;
}

export function InteractiveChart({ data, title }: InteractiveChartProps) {
  const maxValue = Math.max(...data.map(d => Math.max(d.total, d.positive, d.negative, d.removed)));
  const getHeight = (value: number) => `${((value || 0) / maxValue) * 100}%`;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
      
      <div className="h-[300px]">
        <div className="flex h-full">
          <div className="flex flex-col justify-between pr-4 text-sm text-gray-400">
            {[...Array(6)].map((_, i) => (
              <span key={i}>{Math.round((maxValue / 5) * (5 - i))}</span>
            ))}
          </div>

          <div className="flex-1 flex items-end space-x-4">
            {data.map((item, index) => (
              <div key={index} className="flex-1 group">
                <div className="relative h-full flex flex-col justify-end space-y-1">
                  <div className="relative">
                    <div
                      className="w-full bg-primary/20 rounded-t transition-all duration-300"
                      style={{ height: getHeight(item.total) }}
                    >
                      <div
                        className="absolute bottom-0 w-full bg-primary rounded-t transition-all duration-300 group-hover:opacity-80"
                        style={{ height: '100%' }}
                      />
                    </div>
                    <Tooltip data={item} />
                  </div>

                  <div className="text-center mt-4">
                    <span className="text-sm text-gray-400">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-8 mt-6">
        <ChartLegend color="bg-primary" label="Total Reviews" />
        <ChartLegend color="bg-green-500" label="Positive" />
        <ChartLegend color="bg-red-500" label="Negative" />
        <ChartLegend color="bg-yellow-500" label="Removed" />
      </div>
    </div>
  );
}

function ChartLegend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 ${color} rounded`} />
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );
}