import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { cn } from '@/utils/cn';

interface PieChartProps {
  data: number[];
  labels: string[];
  className?: string;
}

export function PieChart({ data, labels, className }: PieChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            'rgba(30, 144, 255, 0.8)',
            'rgba(34, 139, 34, 0.8)',
            'rgba(255, 99, 71, 0.8)'
          ],
          borderColor: [
            'rgba(30, 144, 255, 1)',
            'rgba(34, 139, 34, 1)',
            'rgba(255, 99, 71, 1)'
          ],
          borderWidth: 1,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'rgb(255, 255, 255)',
              padding: 20,
              font: {
                size: 14
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels]);

  return (
    <div className={cn("relative p-4", className)}>
      <canvas ref={chartRef} />
    </div>
  );
}