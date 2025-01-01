import React from 'react';
import { Link2 } from 'lucide-react';
import { PlatformLogo } from './PlatformLogo';
import { FadeIn } from './animations/FadeIn';
import { StaggerChildren } from './animations/StaggerChildren';
import { SectionHeading } from './ui/SectionHeading';
import { partners } from '@/data/partners';

export default function Partners() {
  return (
    <div className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary/5 to-black" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn direction="up" duration={0.6}>
          <div className="inline-block relative mb-8">
            <Link2 className="h-16 w-16 text-primary mx-auto relative z-10" />
            <div className="absolute inset-0 bg-primary/20 blur-xl" />
          </div>
          
          <SectionHeading
            title="Trusted Platform Integrations"
            subtitle="Seamlessly integrated with all major booking and review platforms"
          />
        </FadeIn>

        <StaggerChildren staggerDelay={0.1}>
          <div className="logo-carousel">
            <div className="logo-track">
              {/* First set of logos */}
              {partners.map((partner) => (
                <div key={partner.name} className="logo-slide">
                  <PlatformLogo {...partner} />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner) => (
                <div key={`${partner.name}-dup`} className="logo-slide">
                  <PlatformLogo {...partner} />
                </div>
              ))}
            </div>
          </div>
        </StaggerChildren>
      </div>
    </div>
  );
}