"use client"
import React, { useState } from 'react';
// import { redirect } from 'next/navigation';
import { VideoModal } from './VideoModal';
import { HeroContent } from './hero/HeroContent';
import { HeroActions } from './hero/HeroActions';
import { HeroDashboard } from './hero/HeroDashboard';
import { GradientBackground } from './effects/GradientBackground';
import Scene from './three/Scene';
import { redirect } from 'next/navigation';

export default function Hero() {
  //  
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleFreeTrial = () => {
    redirect('/free-trial');
  };

  const handleWatchDemo = () => {
    setIsVideoOpen(true);
  };

  return (
    <GradientBackground 
      variant="hero" 
      className="min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      {/* 3D Scene Background */}
      {/* <Scene /> */}

      <div className="max-w-7xl mx-auto py-24 lg:py-32 relative z-10">
        <HeroContent />
        <HeroActions 
          onFreeTrial={handleFreeTrial} 
          onWatchDemo={handleWatchDemo} 
        />
        <HeroDashboard />
      </div>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
      />
    </GradientBackground>
  );
}