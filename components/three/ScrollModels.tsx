import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { PROCESS_STEPS } from './constants';
import { ProcessStep } from './models/ProcessStep';

export function ScrollModels() {
  const group = useRef<THREE.Group>(null);
  const data = useScroll();

  useFrame((state) => {
    if (!group.current || !data) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth rotation based on scroll
    const targetRotation = data.offset * Math.PI * 2;
    group.current.rotation.y += (targetRotation - group.current.rotation.y) * 0.1;
    
    // Floating animation
    group.current.position.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <ScrollControls pages={5} damping={0.3}>
      <group ref={group}>
        {PROCESS_STEPS.map((step, index) => {
          const angle = (index / PROCESS_STEPS.length) * Math.PI * 2;
          const radius = 2;
          const position: [number, number, number] = [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          ];

          return (
            <ProcessStep
              key={index}
              position={position}
              color={step.color}
              label={step.label}
              index={index}
            />
          );
        })}
      </group>
    </ScrollControls>
  );
}