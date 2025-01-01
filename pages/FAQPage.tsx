import React from 'react';
import { HelpCircle } from 'lucide-react';
import { FaqAccordion } from '@/components/faq/FaqAccordion';
import { ConsultationButton } from '@/components/consultation/ConsultationButton';

const FAQ_SECTIONS = [
  {
    title: 'Getting Started',
    items: [
      {
        question: 'How does the free trial work?',
        answer: 'Our 14-day free trial gives you full access to all features with no credit card required. You can manage up to 5 properties and experience our AI-powered review defense system firsthand.'
      },
      {
        question: 'What happens after the trial ends?',
        answer: 'At the end of your trial, you can choose from our flexible pricing plans. Your data and settings will be preserved, ensuring a seamless transition to your chosen plan.'
      }
    ]
  },
  {
    title: 'Review Management',
    items: [
      {
        question: 'How do you remove unfair reviews?',
        answer: 'We use a combination of AI analysis and legal expertise to identify policy violations. Our team builds comprehensive cases with evidence and documentation to present to platform review teams.'
      },
      {
        question: 'What platforms do you support?',
        answer: 'We support all major platforms including Airbnb, VRBO, Booking.com, Google Reviews, and Yelp. Our system integrates seamlessly with each platform\'s specific policies and procedures.'
      }
    ]
  },
  {
    title: 'Technical Questions',
    items: [
      {
        question: 'Can I integrate with my existing tools?',
        answer: 'Yes! We offer API access and integrations with popular property management systems. Our team can help you set up custom integrations to fit your workflow.'
      },
      {
        question: 'Is my data secure?',
        answer: 'We use enterprise-grade encryption and security measures to protect your data. All information is stored in secure, SOC 2 compliant data centers with regular security audits.'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block group">
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6 transform transition-transform group-hover:scale-110" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Find answers to common questions about our review management platform
          </p>
          <ConsultationButton />
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {FAQ_SECTIONS.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">
                {section.title}
              </h2>
              <FaqAccordion items={section.items} />
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 text-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-lg blur animate-pulse" />
            <div className="relative bg-black/50 backdrop-blur-sm border border-primary/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-400 mb-6">
                Our team is here to help you with any questions about our platform
              </p>
              <ConsultationButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}