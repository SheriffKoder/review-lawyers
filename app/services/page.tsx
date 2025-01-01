"use client"

import React from 'react';
import { Shield, Star, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
// import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { redirect } from 'next/navigation';

const SERVICES = [
  {
    icon: Shield,
    title: 'AI-Powered Review Defense',
    description: 'Our advanced AI system automatically detects policy violations and unfair reviews, building strong cases for removal.',
    link: '/features#ai-defense'
  },
  {
    icon: Star,
    title: 'Rental Properties',
    description: 'Specialized protection for short-term rentals across Airbnb, VRBO, and Booking.com.',
    link: '/short-term-rentals'
  },
  {
    icon: FileText,
    title: 'Restaurants',
    description: 'Comprehensive review management for restaurants on Google, Yelp, and TripAdvisor.',
    link: '/restaurant'
  },
  {
    icon: MessageSquare,
    title: 'Case Studies',
    description: 'Real success stories from businesses we have helped protect and improve.',
    link: '/case-studies'
  }
] as const;

function ServiceCard({ 
  service: { icon: Icon, title, description, link },
  onClick
}: { 
  service: typeof SERVICES[number];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={cn(
        "group relative",
        "bg-white/5 backdrop-blur-sm rounded-xl p-8",
        "border border-white/10 hover:border-primary/50",
        "transition-all duration-300",
        "cursor-pointer"
      )}
    >
      {/* Glow effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
      
      <div className="relative">
        <Icon className="h-12 w-12 text-primary mb-6 transform transition-transform group-hover:scale-110" />
        
        <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
          {title}
        </h2>
        
        <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
          {description}
        </p>

        <div className="flex items-center text-primary">
          <span className="mr-2">Learn More</span>
          <svg 
            className="w-4 h-4 transform transition-transform group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function OverviewPage() {
//   const navigate = useNavigate();

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Shield className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Professional review management and reputation defense for your business
          </p>
          <Button onClick={() => redirect('/free-trial')}>
            Start Free Trial
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              onClick={() => redirect(service.link)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}