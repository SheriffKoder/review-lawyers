// @ts-nocheck
import type { Review } from '@/types/review';
import { mockReviews } from '@/data/mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getReviews(): Promise<Review[]> {
  await delay(800); // Simulate network request
  return mockReviews;
}

export async function createReview(review: Omit<Review, 'id'>): Promise<Review> {
  await delay(500);
  const newReview = {
    ...review,
    id: Math.random().toString(36).substr(2, 9)
  };
  return newReview;
}

export async function updateReview(id: string, review: Partial<Review>): Promise<Review> {
  await delay(500);
  const existingReview = mockReviews.find(r => r.id === id);
  if (!existingReview) {
    throw new Error('Review not found');
  }
  return { ...existingReview, ...review };
}

export async function deleteReview(id: string): Promise<void> {
  await delay(500);
}