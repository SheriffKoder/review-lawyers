import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { cn } from '@/utils/cn';

interface BarChartProps {
  data: number[];
  labels: string[];
  className?: string;
}

export function BarChart({ data, labels, className }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Cases',
          data,
          backgroundColor: 'rgba(23,217,255,0.6)',
          borderColor: 'rgba(23,217,255,1)',
          borderWidth: 1,
          borderRadius: 4,
          hoverBackgroundColor: 'rgba(23,217,255,0.8)'
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
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