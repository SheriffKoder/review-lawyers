import React from 'react';
// import Link from 'next/link'
import { FileText, Shield, Star, MessageSquare, Book, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import Link from 'next/link'

const quickLinks = [
  {
    icon: Shield,
    label: 'Getting Started',
    description: 'Quick setup guide',
    href: '/docs/getting-started',
    primary: true
  },
  {
    icon: Star,
    label: 'Features',
    description: 'Platform capabilities',
    href: '/features'
  },
  {
    icon: FileText,
    label: 'API Reference',
    description: 'API documentation',
    href: '/docs/api'
  },
  {
    icon: MessageSquare,
    label: 'Support',
    description: '24/7 assistance',
    href: '/support'
  },
  {
    icon: Book,
    label: 'Guides',
    description: 'Best practices',
    href: '/docs/guides'
  }
];

export function QuickLinks() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
      
      <div className="grid gap-3">
        {quickLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group relative flex items-center gap-4 p-4 rounded-lg",
                "bg-white/5 border border-white/10",
                "hover:border-primary/50 hover:bg-white/10",
                "transition-all duration-300",
                link.primary && "border-primary/30 bg-primary/5"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg",
                "transition-colors duration-300",
                "bg-primary/10 text-primary",
                "group-hover:scale-110 transform"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div>
                <h3 className="font-medium text-white group-hover:text-primary transition-colors">
                  {link.label}
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {link.description}
                </p>
              </div>
              
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 ml-auto" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}