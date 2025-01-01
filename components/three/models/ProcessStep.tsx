// @ts-nocheck
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useHover } from '../hooks/useHover';

interface ProcessStepProps {
  position: [number, number, number];
  color: string;
  label: string;
  index: number;
}

export function ProcessStep({ position, color, label, index }: ProcessStepProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const { hovered, handlers } = useHover();

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    
    // Individual rotation
    mesh.current.rotation.x = time * 0.2 + index * Math.PI / 5;
    mesh.current.rotation.z = time * 0.1 + index * Math.PI / 3;
    
    // Scale on hover
    const scale = hovered ? 1.2 : 1;
    mesh.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  return (
    <group position={position}>
      <mesh 
        ref={mesh}
        {...handlers}
      >
        <octahedronGeometry args={[0.5]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.8}
          metalness={0.5}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
      
      <Text
        position={[0, 1, 0]}
        fontSize={0.2}
        color={color}
        anchorX="center"
        anchorY="middle"
        opacity={hovered ? 1 : 0.7}
        scale={hovered ? 1.1 : 1}
      >
        {label}
      </Text>
    </group>
  );
}