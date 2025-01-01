import { useFrame } from '@react-three/fiber';
import { RefObject } from 'react';
import { Mesh } from 'three';
import { ANIMATION_CONFIG } from '../constants';

export function useRotation(meshRef: RefObject<Mesh>) {
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += ANIMATION_CONFIG.rotationSpeed;
    }
  });
}