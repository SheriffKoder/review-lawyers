// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DateRangeProps {
  onRangeChange: (range: { start: Date; end: Date }) => void;
  className?: string;
  reviews_temp_switch: (reviews: any[]) => void;
  tempReviews: any[];
}

const PRESET_RANGES = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
  { label: 'Year to date', days: 'ytd' },
  { label: 'All time', days: 'ytd' },
  { label: 'Custom', days: 'custom' }
] as const;

export function DateRangeSelector({ onRangeChange, className, reviews_temp_switch, tempReviews }: DateRangeProps) {
  const [selectedRange, setSelectedRange] = useState("All time");
  const [customDates, setCustomDates] = useState({
    start: new Date(),
    end: new Date()
  });
  const [isCustom, setIsCustom] = useState(false);


  function filterReviewsByDate(reviews, label) {
    if (!Array.isArray(reviews)) {
      throw new Error("The 'reviews' parameter must be an array.");
    }
  
    const today = new Date();
    let startDate;
  
    switch (label) {
      case "Last 7 days":
        startDate = new Date();
        startDate.setDate(today.getDate() - 7);
        break;
  
      case "Last 30 days":
        startDate = new Date();
        startDate.setDate(today.getDate() - 30);
        break;
  
      case "Last 90 days":
        startDate = new Date();
        startDate.setDate(today.getDate() - 90);
        break;
  
      case "Year to date":
        startDate = new Date();
        startDate.setFullYear(today.getFullYear() - 1);
        break;

        case "All time":
          startDate = new Date();
          startDate.setFullYear(today.getFullYear() - 100);
          break;
  
      default:
        throw new Error("Invalid label provided.");
    }
  
    // Filter reviews based on the submittedAt date
    return reviews.filter((review) => {
      // Parse the date in "YYYY-MM-DD HH:mm:ss" format
      if(review.submittedAt !== null) {
      const [datePart, timePart] = review.submittedAt.split(" ");
      // console.log(datePart);
      const [year, month, day] = datePart.split("-").map(Number);
      const [hours, minutes, seconds] = timePart.split(":").map(Number);
  
      const submittedAt = new Date(year, month - 1, day, hours, minutes, seconds);
  
      return submittedAt >= startDate && submittedAt <= today;
      }
    });
  }
  
  function filterReviewsByDateRange(start, end) {
    // Validate input dates
    if (!start || !end) {
      throw new Error("Both start and end dates must be provided.");
    }
  
    // Convert start and end dates to Date objects
    const startDate = new Date(start);
    const endDate = new Date(end);
  
    // Validate the date objects
    if (isNaN(startDate) || isNaN(endDate)) {
      throw new Error("Invalid date format. Dates must be in ISO format.");
    }
  
    // Filter tempReviews
    const filteredReviews = tempReviews.filter((review) => {
      if (!review.submittedAt) return false; // Skip reviews without submittedAt property
  
      // Convert submittedAt to a Date object
      const [datePart, timePart] = review.submittedAt.split(" ");
      const [year, month, day] = datePart.split("-").map(Number);
      const [hours, minutes, seconds] = timePart.split(":").map(Number);
      const reviewDate = new Date(year, month - 1, day, hours, minutes, seconds);
  
      // Check if the reviewDate is within the range
      return reviewDate >= startDate && reviewDate <= endDate;
    });
  
    return filteredReviews;
  }
  
  const handleRangeSelect = (range: typeof PRESET_RANGES[number]) => {
    setSelectedRange(range.label);
    console.log(range.label);

    if (range.days !== 'custom') {
      let temp_reviews = filterReviewsByDate(tempReviews, range.label);
      console.log(temp_reviews);
      reviews_temp_switch(temp_reviews);
    }



    if (range.days === 'custom') {
      setIsCustom(true);
      return;
    }
    
    setIsCustom(false);
    const end = new Date();
    const start = new Date();

    if (range.days === 'ytd') {
      start.setMonth(0, 1); // January 1st of current year
    } else {
      start.setDate(start.getDate() - range.days);
    }

    onRangeChange({ start, end });
  };

  const handleCustomDateChange = (type: 'start' | 'end', value: string) => {
    const newDates = {
      ...customDates,
      [type]: new Date(value)
    };
    setCustomDates(newDates);
    onRangeChange(newDates);
    console.log(newDates);

    const {end, start} = newDates;

    let temp_reviews = filterReviewsByDateRange(start, end);
    console.log(temp_reviews);
    reviews_temp_switch(temp_reviews);
    



  };

  useEffect(() => {
    console.log("temp changed, this is date")
  }, [tempReviews])

  return (
    <div className={cn("space-y-4", className)}>
      {/* Preset Range Buttons */}
      <div className="flex flex-wrap gap-2">
      <h2 className='text-white text-base font-bold my-auto'>By Review Date</h2>

        {PRESET_RANGES.map((range) => (
          <button
            key={range.label}
            onClick={() => handleRangeSelect(range)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium",
              "transition-all duration-200",
              "flex items-center gap-2",
              selectedRange === range.label ? [
                "bg-primary text-black",
                "shadow-lg shadow-primary/25"
              ] : [
                "bg-white/5 text-gray-400",
                "hover:bg-white/10 hover:text-white",
                "border border-white/10"
              ]
            )}
          >
            <Calendar className={`w-4 h-4 ${selectedRange === range.label ? "text-black" : "text-white"}`}/>
            {range.label}
          </button>
        ))}
      </div>

      {/* Custom Date Range Inputs */}
      {isCustom && (
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Start Date</label>
            <input
              type="date"
              value={customDates.start.toISOString().split('T')[0]}
              onChange={(e) => handleCustomDateChange('start', e.target.value)}
              max={customDates.end.toISOString().split('T')[0]}
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "bg-black/50 border border-white/10",
                "text-white",
                "focus:outline-none focus:border-primary",
                "transition-colors"
              )}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">End Date</label>
            <input
              type="date"
              value={customDates.end.toISOString().split('T')[0]}
              onChange={(e) => handleCustomDateChange('end', e.target.value)}
              min={customDates.start.toISOString().split('T')[0]}
              max={new Date().toISOString().split('T')[0]}
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "bg-black/50 border border-white/10",
                "text-white",
                "focus:outline-none focus:border-primary",
                "transition-colors"
              )}
            />
          </div>
          <button className='bg-primary text-black px-4 py-2 rounded-lg mt-auto' onClick={() => {
            setIsCustom(false);
            // onRangeChange({ start: new Date(), end: new Date() });
          }}>Close</button>
        </div>
      )}
    </div>
  );
}