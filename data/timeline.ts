import { Shield, FileText, Scale, MessageSquare, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TimelineStep {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export const timelineSteps: TimelineStep[] = [
  {
    icon: Shield,
    title: 'Case Initiation',
    description: 'We receive and analyze your review case, identifying potential policy violations.',
    color: '#17D9FF'
  },
  {
    icon: FileText,
    title: 'Evidence Collection',
    description: 'Our team gathers comprehensive documentation and evidence.',
    color: '#4CAF50'
  },
  {
    icon: Scale,
    title: 'Legal Analysis',
    description: 'Expert review of platform policies and legal documentation.',
    color: '#FF9800'
  },
  {
    icon: MessageSquare,
    title: 'Platform Engagement',
    description: 'Professional presentation of your case to platform review teams.',
    color: '#9C27B0'
  },
  {
    icon: CheckCircle,
    title: 'Case Resolution',
    description: 'Successful removal or modification of the review.',
    color: '#2196F3'
  }
];