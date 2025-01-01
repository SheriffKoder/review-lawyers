import React, { useState } from 'react';
import { Shield, FileText, Scale, MessageSquare, CheckCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

const PROCESS_STEPS = [
  {
    icon: Shield,
    title: 'Case Initiation',
    description: 'We receive and analyze your review case, identifying potential policy violations.',
    color: '23, 217, 255'  // Primary blue
  },
  {
    icon: FileText,
    title: 'Evidence Collection',
    description: 'Our team gathers comprehensive documentation and evidence.',
    color: '76, 175, 80'  // Green
  },
  {
    icon: Scale,
    title: 'Legal Analysis',
    description: 'Expert review of platform policies and legal documentation.',
    color: '255, 152, 0'  // Orange
  },
  {
    icon: MessageSquare,
    title: 'Platform Engagement',
    description: 'Professional presentation of your case to platform review teams.',
    color: '156, 39, 176'  // Purple
  },
  {
    icon: CheckCircle,
    title: 'Case Resolution',
    description: 'Successful removal or modification of the review.',
    color: '33, 150, 243'  // Blue
  }
];

export function ProcessCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="wrapper">
      <div className="inner" style={{ '--quantity': PROCESS_STEPS.length } as React.CSSProperties}>
        {PROCESS_STEPS.map((step, index) => (
          <div 
            key={index}
            className={cn(
              "process-card",
              hoveredIndex === index && "process-card-hovered"
            )}
            style={{ 
              '--index': index,
              '--color-card': step.color 
            } as React.CSSProperties}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="process-card-content">
              <step.icon className="process-card-icon" />
              <h3 className="process-card-title">{step.title}</h3>
              <p className="process-card-description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}