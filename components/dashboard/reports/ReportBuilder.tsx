import React, { useState } from 'react';
import { FileText, ChevronDown, Plus, X } from 'lucide-react';
import { Button } from '../../ui/Button';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { cn } from '@/utils/cn';

interface ReportMetric {
  id: string;
  label: string;
  selected: boolean;
}

const AVAILABLE_METRICS: ReportMetric[] = [
  { id: 'rating', label: 'Overall Rating', selected: true },
  { id: 'reviews', label: 'Review Count', selected: true },
  { id: 'response_rate', label: 'Response Rate', selected: true },
  { id: 'resolution_time', label: 'Average Resolution Time', selected: false },
  { id: 'success_rate', label: 'Case Success Rate', selected: false },
  { id: 'platform_breakdown', label: 'Platform Breakdown', selected: false },
  { id: 'sentiment_analysis', label: 'Sentiment Analysis', selected: false },
  { id: 'common_topics', label: 'Common Topics', selected: false },
  { id: 'trend_analysis', label: 'Trend Analysis', selected: false }
];

export function ReportBuilder() {
  const [metrics, setMetrics] = useState(AVAILABLE_METRICS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [includeAiInsights, setIncludeAiInsights] = useState(true);

  const toggleMetric = (id: string) => {
    setMetrics(prev => prev.map(metric => 
      metric.id === id ? { ...metric, selected: !metric.selected } : metric
    ));
  };

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedMetrics = metrics.filter(m => m.selected);
    const reportData = {
      timestamp: new Date().toISOString(),
      metrics: selectedMetrics.map(m => m.id),
      includeAiInsights,
      data: {
        // Mock data for demonstration
        rating: 4.8,
        reviews: 1284,
        response_rate: "98%",
        ai_insights: includeAiInsights ? {
          trends: "Positive trend in customer satisfaction over the last 30 days",
          recommendations: [
            "Focus on response time during peak hours",
            "Address common concerns about check-in process",
            "Highlight positive experiences in responses"
          ]
        } : null
      }
    };

    // Create and download report
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `custom-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Custom Report Builder</h3>
          <p className="text-sm text-gray-400">Select metrics to include in your report</p>
        </div>
        <Button
          onClick={generateReport}
          disabled={isGenerating || !metrics.some(m => m.selected)}
          className="relative group"
        >
          {isGenerating ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Generating Report...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
              Generate Report
            </>
          )}
        </Button>
      </div>

      {/* Metrics Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <button
            key={metric.id}
            onClick={() => toggleMetric(metric.id)}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg",
              "border transition-all duration-200",
              "hover:shadow-lg",
              metric.selected ? [
                "bg-primary/10 border-primary",
                "hover:bg-primary/20"
              ] : [
                "bg-white/5 border-white/10",
                "hover:bg-white/10 hover:border-white/20"
              ]
            )}
          >
            <span className="text-white">{metric.label}</span>
            {metric.selected ? (
              <X className="w-5 h-5 text-primary" />
            ) : (
              <Plus className="w-5 h-5 text-gray-400" />
            )}
          </button>
        ))}
      </div>

      {/* AI Insights Toggle */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
        <div>
          <h4 className="text-white font-medium">Include AI Insights</h4>
          <p className="text-sm text-gray-400">Add AI-powered analysis and recommendations</p>
        </div>
        <button
          onClick={() => setIncludeAiInsights(!includeAiInsights)}
          className={cn(
            "relative w-12 h-6 rounded-full transition-colors duration-200",
            includeAiInsights ? "bg-primary" : "bg-gray-600"
          )}
        >
          <div
            className={cn(
              "absolute w-4 h-4 bg-white rounded-full top-1",
              "transition-transform duration-200",
              includeAiInsights ? "translate-x-7" : "translate-x-1"
            )}
          />
        </button>
      </div>
    </div>
  );
}