import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { OrbitingIcons } from './OrbitingIcons';

export function AnimatedSphere() {
  const sphereRef = useRef<Mesh>(null);

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#2196f3" />
      <OrbitingIcons />
    </mesh>
  );
}