
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Lighting } from './Lighting';
import { ServiceModels } from './ServiceModels';
import { ScrollModels } from './ScrollModels';

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        gl={{ 
          alpha: false,
          antialias: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 10], fov: 75 }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 5, 15]} />
        
        <Lighting />
        <ServiceModels />
        <ScrollModels />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}