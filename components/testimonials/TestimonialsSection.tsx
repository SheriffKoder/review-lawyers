import React from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/utils/cn';

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <MessageSquare className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-400">
            Join thousands of satisfied businesses managing their online reputation
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              quote: "This platform improved our review management process by 50%!",
              author: "Jane Doe",
              role: "CEO, Luxury Rentals",
              delay: "0"
            },
            {
              quote: "The AI-powered analysis helped us identify and resolve issues faster than ever.",
              author: "John Smith",
              role: "Operations Manager",
              delay: "100"
            },
            {
              quote: "Our rating improved from 4.2 to 4.8 in just three months.",
              author: "Sarah Wilson",
              role: "Restaurant Owner",
              delay: "200"
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "relative group p-6 rounded-xl",
                "bg-white/5 backdrop-blur-sm",
                "border border-white/10",
                "hover:border-primary/50",
                "transition-all duration-300",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${testimonial.delay}ms` }}
            >
              <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
              <div className="relative">
                <blockquote className="text-lg text-gray-300 mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-primary/50" />
                  <div>
                    <div className="font-medium text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}