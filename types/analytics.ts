export interface MetricData {
  current: number;
  previous: number;
}

export interface AnalyticsData {
  rating: MetricData;
  activeReviews: MetricData;
  pendingCases: MetricData;
  successRate: MetricData;
}