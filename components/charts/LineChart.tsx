import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { cn } from '@/utils/cn';

interface LineChartProps {
  data: number[];
  labels: string[];
  className?: string;
}

export function LineChart({ data, labels, className }: LineChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(23,217,255,0.4)');
    gradient.addColorStop(1, 'rgba(23,217,255,0.0)');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Trend',
          data,
          borderColor: '#17D9FF',
          backgroundColor: gradient,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#17D9FF',
          pointBorderColor: '#17D9FF',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#17D9FF',
          pointRadius: 4,
          pointHoverRadius: 6
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
              color: 'rgba(255, 255, 255, 0.1)'
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