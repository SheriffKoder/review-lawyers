export interface CaseStudy {
  id: string;
  title: string;
  business: string;
  category: 'rental' | 'restaurant';
  challenge: string;
  solution: string;
  result: string;
  metrics: {
    ratingImprovement: number;
    reviewsRemoved: number;
    responseRate: number;
  };
  image: string;
  takeaways: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Recovering from a Review Crisis',
    business: 'Oceanview Villa Rentals',
    category: 'rental',
    challenge: 'Faced with a sudden influx of negative reviews due to temporary maintenance issues, Oceanview Villa Rentals saw their rating drop from 4.8 to 3.9 in just two weeks. This crisis threatened their peak season bookings and long-term reputation.',
    solution: 'We implemented a comprehensive review management strategy, combining rapid response protocols with systematic issue resolution. Our AI-powered system identified patterns in the negative feedback, allowing for targeted improvements in maintenance scheduling.',
    result: 'Successfully removed 8 unfair reviews and improved overall rating back to 4.7 within one month. Booking rates recovered and exceeded previous levels by 15%.',
    metrics: {
      ratingImprovement: 1.2,
      reviewsRemoved: 8,
      responseRate: 98
    },
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
    takeaways: [
      'Quick response times are crucial during reputation crises',
      'Systematic approach to maintenance issues prevents future problems',
      'AI-powered review analysis helps identify root causes',
      'Professional review management can reverse negative trends'
    ]
  },
  {
    id: '2',
    title: 'Restaurant Rating Transformation',
    business: 'La Cucina Italiana',
    category: 'restaurant',
    challenge: 'La Cucina Italiana was facing an organized campaign of fake negative reviews from a competitor, causing their rating to plummet and severely impacting their business.',
    solution: 'Our team conducted a thorough investigation, gathering evidence of review manipulation. We worked directly with platform review teams, presenting documented proof of fake reviews while implementing a proactive reputation management strategy.',
    result: 'All fake reviews were removed within two weeks. The restaurant\'s authentic rating was restored, leading to a 40% increase in new customers.',
    metrics: {
      ratingImprovement: 0.8,
      reviewsRemoved: 12,
      responseRate: 95
    },
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    takeaways: [
      'Systematic evidence collection is key to removing fake reviews',
      'Professional platform engagement increases success rates',
      'Proactive monitoring prevents future review manipulation',
      'Reputation recovery directly impacts business growth'
    ]
  }
];