import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

const faqs = [
  {
    question: 'What happens after I subscribe?',
    answer: 'You\'ll get immediate access to all features included in your plan. Our team will help you get started and set up your account.'
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! We offer a 14-day free trial on all plans. No credit card required.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-16 pt-16 border-t border-white/10">
      <h2 className="text-2xl font-bold text-white text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={cn(
              "bg-white/5 backdrop-blur-sm rounded-xl",
              "border border-white/10",
              "overflow-hidden",
              "transition-all duration-300",
              openIndex === index && "border-primary/50"
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between"
            >
              <span className="font-medium text-white">{faq.question}</span>
              <ChevronDown className={cn(
                "w-5 h-5 text-gray-400 transition-transform duration-300",
                openIndex === index && "rotate-180"
              )} />
            </button>
            <div className={cn(
              "px-6 transition-all duration-300",
              openIndex === index ? "py-4 border-t border-white/10" : "max-h-0"
            )}>
              <p className="text-gray-400">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}