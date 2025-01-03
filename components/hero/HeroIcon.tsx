"use client"
import React from 'react'
import dynamic from 'next/dynamic';

// avoid document not defined error when building
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
// or lottie-react - depending on what library you use
import animationData from '@/public/lottie/ai1.json'

const HeroIcon = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

  return (
            <Lottie 
            //@ts-ignore    
            options={defaultOptions}
            height={200}
            width={200}
        />

  )
}

export default HeroIcon
