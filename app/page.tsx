"use client"
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Timeline from '../components/Timeline';
import ReviewList from '../components/ReviewList';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';
import { GradientBackground } from '../components/effects/GradientBackground';

export default function HomePage() {
  return (
    <GradientBackground 
    variant="hero" 
    className="min-h-screen"
    
  >
    <main className="w-full h-full">

      <Hero />
      <Partners />
      <Timeline />
      {/* <ReviewList /> */}
      <TestimonialsSection />
    </main>
    </GradientBackground>

  );
}