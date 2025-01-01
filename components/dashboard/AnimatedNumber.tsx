"use client"
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatter?: (value: number) => string;
}

export function AnimatedNumber({ 
  value, 
  duration = 1000,
  formatter = (val) => val.toLocaleString()
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const startValue = useRef(0);
  const frameId = useRef<number>();

  useEffect(() => {
    startValue.current = displayValue;
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const eased = 1 - Math.pow(1 - percentage, 3);
      const current = startValue.current + (value - startValue.current) * eased;
      
      setDisplayValue(current);

      if (percentage < 1) {
        frameId.current = requestAnimationFrame(animate);
      }
    };

    frameId.current = requestAnimationFrame(animate);

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [value, duration]);

  return <>{formatter(displayValue)}</>;
}