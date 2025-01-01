import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Timeline from '../components/Timeline';
import ReviewList from '../components/ReviewList';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Partners />
      <Timeline />
      <ReviewList />
      <TestimonialsSection />
    </main>
  );
}