export const STATUS_COLORS = {
  resolved: '#228B22', // Green
  active: '#1E90FF',   // Blue
  pending: '#FF6347'   // Red
};

export const CHART_OPTIONS = {
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    titleColor: '#fff',
    bodyColor: '#fff',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    padding: 12,
    cornerRadius: 8,
    titleFont: {
      size: 14,
      weight: 'bold'
    },
    bodyFont: {
      size: 13
    },
    displayColors: true,
    callbacks: {
      label: (context: any) => {
        const value = context.raw;
        return `${value} cases`;
      }
    }
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart'
  }
};