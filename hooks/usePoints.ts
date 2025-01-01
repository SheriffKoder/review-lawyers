import { useState, useEffect } from 'react';

export function usePoints() {
  const [points, setPoints] = useState(0);
  const level = Math.floor(points / 100) + 1;
  const nextLevelPoints = level * 100;

  useEffect(() => {
    const saved = localStorage.getItem('points');
    if (saved) {
      setPoints(parseInt(saved, 10));
    }
  }, []);

  const addPoints = (amount: number) => {
    setPoints(prev => {
      const newPoints = prev + amount;
      localStorage.setItem('points', newPoints.toString());
      return newPoints;
    });
  };

  return {
    points,
    level,
    nextLevelPoints,
    addPoints
  };
}