import React, { useState, useEffect } from 'react';
import { Shield, FileText, Scale, MessageSquare, CheckCircle } from 'lucide-react';
import { TimelineStep } from './timeline/TimelineStep';
import { TimelineProgress } from './timeline/TimelineProgress';
import type { ProcessStep } from './timeline/types';

const steps: ProcessStep[] = [
  {
    icon: Shield,
    title: 'Case Initiation',
    description: 'Our AI system automatically detects potentially unfair reviews and policy violations.',
    details: [
      'Automated policy violation detection',
      'Initial case assessment',
      'Priority scoring',
      'Risk evaluation'
    ]
  },
  {
    icon: FileText,
    title: 'Evidence Collection',
    description: 'We gather comprehensive documentation and evidence to support your case.',
    details: [
      'Platform policy analysis',
      'Historical data collection',
      'Pattern identification',
      'Documentation preparation'
    ]
  },
  {
    icon: Scale,
    title: 'Legal Analysis',
    description: 'Our experts analyze platform policies and prepare legal-style documentation.',
    details: [
      'Policy compliance review',
      'Case strength assessment',
      'Strategy development',
      'Success probability analysis'
    ]
  },
  {
    icon: MessageSquare,
    title: 'Platform Engagement',
    description: 'We professionally present your case to platform review teams.',
    details: [
      'Professional communication',
      'Evidence submission',
      'Follow-up management',
      'Status tracking'
    ]
  },
  {
    icon: CheckCircle,
    title: 'Case Resolution',
    description: 'We track the case through to successful resolution.',
    details: [
      'Resolution confirmation',
      'Impact assessment',
      'Success documentation',
      'Prevention recommendations'
    ]
  }
];

interface ProcessStepsProps {
  className?: string;
}

export function ProcessSteps({ className }: ProcessStepsProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-advance steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update progress based on active step
  useEffect(() => {
    setProgress((activeStep / (steps.length - 1)) * 100);
  }, [activeStep]);

  return (
    <div className={className}>
      <h2 className="text-3xl font-bold text-white text-center mb-16">
        Our Advocacy Process
      </h2>

      <div className="relative max-w-6xl mx-auto">
        {/* Timeline Progress */}
        <div className="absolute top-28 left-0 right-0 hidden md:block">
          <TimelineProgress progress={progress} />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              step={step}
              index={index}
              isActive={index === activeStep}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}