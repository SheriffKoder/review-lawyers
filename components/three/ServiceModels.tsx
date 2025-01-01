// @ts-nocheck
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

const SERVICES = [
  {
    geometry: 'shield',
    position: [-2, 1, 0],
    color: '#17D9FF',
    title: 'Protection',
    description: 'AI-Powered Defense'
  },
  {
    geometry: 'scale',
    position: [0, -1, 0],
    color: '#4CAF50',
    title: 'Analysis',
    description: 'Evidence-Based Review'
  },
  {
    geometry: 'document',
    position: [2, 1, 0],
    color: '#FF9800',
    title: 'Documentation',
    description: 'Legal-Style Reports'
  }
] as const;

export function ServiceModels() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += 0.005;
    group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <group ref={group}>
      {SERVICES.map((service, index) => (
        <ServiceModel
          key={index}
          {...service}
          delay={index * 0.2}
        />
      ))}
    </group>
  );
}

interface ServiceModelProps {
  geometry: string;
  position: [number, number, number];
  color: string;
  title: string;
  description: string;
  delay: number;
}

function ServiceModel({ geometry, position, color, title, description, delay }: ServiceModelProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    mesh.current.position.y = initialY + Math.sin(time * 0.5 + delay) * 0.2;
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.z += 0.01;
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <Geometry type={geometry} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.8}
          metalness={0.5}
          roughness={0.2}
          envMapIntensity={1}
        />
        
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.2}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
        
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          opacity={0.7}
        >
          {description}
        </Text>
      </mesh>
      
      <Points count={20} color={color} size={0.02} />
    </group>
  );
}

function Geometry({ type }: { type: string }) {
  switch (type) {
    case 'shield':
      return <dodecahedronGeometry args={[1]} />;
    case 'scale':
      return <octahedronGeometry args={[1]} />;
    case 'document':
      return <boxGeometry args={[0.8, 1, 0.1]} />;
    default:
      return null;
  }
}

function Points({ count, color, size }: { count: number; color: string; size: number }) {
  const points = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.x += 0.001;
    points.current.rotation.y += 0.002;
  });

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 1.5;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = 0;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}