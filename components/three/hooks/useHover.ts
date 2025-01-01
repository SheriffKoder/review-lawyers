import { useState, useCallback } from 'react';

export function useHover() {
  const [hovered, setHovered] = useState(false);

  const onPointerOver = useCallback(() => setHovered(true), []);
  const onPointerOut = useCallback(() => setHovered(false), []);

  return {
    hovered,
    handlers: {
      onPointerOver,
      onPointerOut
    }
  };
}