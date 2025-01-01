import React from 'react';
import { Html } from '@react-three/drei';
import { PROCESS_STEPS } from '../constants';

export function OrbitingIcons() {
  return (
    <>
      {PROCESS_STEPS.map((step, index) => {
        const angle = (index / PROCESS_STEPS.length) * Math.PI * 2;
        const radius = 1.5;
        const position: [number, number, number] = [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ];

        return (
          <mesh position={position} key={index}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#ff9800" />
            <Html>
              <div className="text-white text-sm bg-black/80 px-2 py-1 rounded whitespace-nowrap">
                {step.label}
              </div>
            </Html>
          </mesh>
        );
      })}
    </>
  );
}