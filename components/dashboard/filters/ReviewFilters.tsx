import React, { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ReviewFiltersProps {
  platform: string;
  onPlatformChange: (platform: string) => void;
  // onRatingChange: (rating: number | null) => void;
  className?: string;
  listings: any[];
  reviews: any[];
  tempListings: any[];
  tempReviews: any[];
  reviews_temp_switch: (input: any[]) => void;
  listings_temp_switch: (input: any[]) => void;
}

const PLATFORMS = ['All', 'Airbnb', 'VRBO', 'Booking.com', 'Google'];
const RATINGS = [5, 4, 3, 2, 1, "unrated"];

export function ReviewFilters({ 
  platform, 
  // rating, 
  onPlatformChange, 
  // onRatingChange,
  className,
  listings,   
  reviews,
  tempListings,
  tempReviews,
  reviews_temp_switch,
  listings_temp_switch
}: ReviewFiltersProps) {


  // function getRatings(items: any[]) {
  //   if (!Array.isArray(items)) {
  //     throw new Error("Input must be an array of objects");
  //   }

  //   let temp =  items.map((item) => item.rating);
  //   console.log(temp)
  // }

  // getRatings(reviews);
  // console.log(tempReviews);


  const [rating, setRating] = useState<number | null | string>(null);


  function filterItemsByMinRating(items: any[], minRating: number | null | string) {
    console.log(minRating);
    setRating(minRating);
    if (!Array.isArray(items)) {
      throw new Error("The 'items' parameter must be an array.");
    }
  
    let filteredItems = [...items]; // Create a copy of the array to avoid mutating the original
  
    if (minRating === "unrated") {
      // Filter out items with rating null
      filteredItems = filteredItems.filter((item) => item.rating === null);
    } else if (minRating === null) {
      // Return the array as it is for minRating null
      console.log(filteredItems);
      reviews_temp_switch(filteredItems);
      return filteredItems;

    } else if (typeof minRating === "number") {
      // Filter items with rating equal to minRating * 2
      filteredItems = filteredItems.filter((item) => item.rating === (minRating * 2));
    }

    console.log(filteredItems);
    reviews_temp_switch(filteredItems);
    return filteredItems;
  }

  useEffect(() => {
    console.log("temp changed, this is stars")
  }, [tempReviews])



  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const changePlatforms = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      // Remove the platform if it already exists
      let temp = selectedPlatforms.filter((item) => item !== platform);
      setSelectedPlatforms(temp);
    } else {
      // Add the platform if it doesn't exist
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
    console.log(selectedPlatforms);
  }

  useEffect(() => {

    function filterListingsByPlatforms(listings: any[], platforms: string[]) {
      if (!Array.isArray(listings) || !Array.isArray(platforms)) {
        throw new Error("Both listings and platforms must be arrays.");
      }
    
      const tempArray: any[] = [];
    
      platforms.forEach((platform) => {
        listings.forEach((listing) => {
          let shouldAdd = false;
    
          switch (platform) {
            case "Booking.com":
              if (listing.bookingcomPropertyName) shouldAdd = true;
              break;
            case "Airbnb":
              if (listing.airbnbName) shouldAdd = true;
              break;
            case "Google":
              if (listing.googleExportStatus) shouldAdd = true;
              break;
            case "VRBO":
              if (listing.vrboExportStatus) shouldAdd = true;
              break;
            default:
              break;
          }
    
          // Add to tempArray only if it satisfies the condition and is not already in the array
          if (shouldAdd && !tempArray.includes(listing)) {
            tempArray.push(listing);
          }
        });
      });
    
      return tempArray;
    }
    

    let filteredListings = filterListingsByPlatforms(listings, selectedPlatforms);
    console.log(filteredListings);
    listings_temp_switch(filteredListings);

  }, [selectedPlatforms])




  
  return (
    <div className={cn("space-y-4", className)}>

      {/* Platform Filter */}
      <div className="flex items-center gap-4">
      <h2 className='text-white text-base font-bold my-auto'>By Listing Platform</h2>

        <Filter className="w-5 h-5 text-primary" />
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => changePlatforms(p)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium",
                "transition-all duration-200",
                platform === (p === 'All' ? '' : p)
                  ? "bg-primary text-black"
                  : "bg-white/5 text-gray-400 hover:text-white border border-white/10",

                  selectedPlatforms.includes(p)
                  ? "bg-primary text-black"
                  : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="flex items-center gap-4">
        <h2 className='text-white text-base font-bold my-auto'>By Review Rating</h2>
        <div className="w-5 h-5" /> {/* Spacer for alignment */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => filterItemsByMinRating(reviews, null)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium",
              "transition-all duration-200",
              rating === null
                ? "bg-primary text-black"
                : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
            )}
          >
            All Stars
          </button>


          {RATINGS.map((r) => (
            <button
              key={r}
              onClick={() => {
                // onRatingChange(r)
                filterItemsByMinRating(reviews, r)
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium",
                "transition-all duration-200",
                "flex items-center gap-1",
                rating === r
                  ? "bg-primary text-black"
                  : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
              )}
            >
              {r} <span className={`${r === "unrated" ? "text-gray-400": "text-yellow-400"}`}>★</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}