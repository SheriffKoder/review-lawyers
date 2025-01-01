import React from 'react';
import { FileText } from 'lucide-react';
import { FadeIn } from './animations/FadeIn';
import { SectionHeading } from './ui/SectionHeading';
import { GradientBackground } from './effects/GradientBackground';
import { ProcessCards } from './process/ProcessCards';

export default function Timeline() {
  return (
    <GradientBackground variant="primary">
      <div className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn direction="up" duration={0.6}>
            <div className="text-center mb-16">
              <FileText className="h-16 w-16 text-primary mx-auto mb-6 transform transition-transform group-hover:scale-110" />
              <SectionHeading
                title="Our Process"
                subtitle="Professional review defense, step by step"
              />
            </div>
          </FadeIn>

          {/* 3D Rotating Process Cards */}
          <div className="mt-16">
            <ProcessCards />
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}