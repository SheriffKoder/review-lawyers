"use client"
import React, { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { WidgetGrid } from '@/components/dashboard/widgets/WidgetGrid';
import { AchievementsSection } from '@/components/dashboard/achievements/AchievementsSection';
import { ProgressSection } from '@/components/dashboard/progress/ProgressSection';
import { ChallengesSection } from '@/components/dashboard/challenges/ChallengesSection';
import { PointsSummary } from '@/components/dashboard/points/PointsSummary';
import { BusinessTypeToggle } from '@/components/dashboard/BusinessTypeToggle';
import { ReviewFilters } from '@/components/dashboard/filters/ReviewFilters';


import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import {ProviderSelectionModal} from "@/components/dashboard/Provider_Choose/ProviderSelectionModal"
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { userData } from 'three/examples/jsm/nodes/Nodes.js';
import { getCustomerData } from '../test3/Hooks/getData';
import MultiSelectDropdown from '@/components/dashboard/filters/DropDownSelect';


export default function DashboardPage() {
  // Business type toggle
  const [businessType, setBusinessType] = useState<'rental' | 'restaurant'>('rental');
  
  // Global filters
  const [platform, setPlatform] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  
  // Date range
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date()
  });

  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    setDateRange(range);
  };

  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  // if the user is not logged in redirect to the login page
  // const { user } = useAuth();
  // if (!user) {
  //   redirect('/login');
  // }


  // Fetch the properties for the user
  // First have a state for the listings and the reviews
  const [listings, setListings] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  const [listings_temp, setListings_temp] = useState<any[]>([]);
  const [reviews_temp, setReviews_temp] = useState<any[]>([]);

  const reviews_temp_switch = (input: any[]) => {
    setReviews_temp(input)
  }

  const listings_temp_switch = (input: any[]) => {
    console.log(input);
    // Handle single listing case
    const listingsToSet = !Array.isArray(input) ? [input] : input;
    setListings_temp(listingsToSet);
  
    // Filter reviews to match selected listings
    const filteredReviews = reviews.filter(review => 
      listingsToSet.some(listing => 
        listing.id === review.listingMapId
      )
    );
    setReviews_temp(filteredReviews);
    //ts-ignore
    console.log(filteredReviews.length);
  }


  useEffect(() => {

    
    const fetchListings = async () => {

      const userData = await getCustomerData("registeredUsers");


      try {
        // const response = await fetch("/api/hostaway");

        const response = await fetch("/api/hostaway/hostaway-listings", {
          method: "POST",
        //   headers: { "Content-Type": "application/json" },
          body: JSON.stringify({id: userData.provider.accountId, key: userData.provider.apiKey}),
        });

        
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data = await response.json();
        console.log(data.result);
        setListings(data.result || []);
        setListings_temp(data.result || []);
        console.log(listings)
      } catch (err: any) {

      }
    };

    const fetchReviews = async () => {

      const userData = await getCustomerData("registeredUsers");


      try {
        // const response = await fetch("/api/hostaway");

        const response = await fetch("/api/hostaway/hostaway-reviews", {
          method: "POST",
        //   headers: { "Content-Type": "application/json" },
          body: JSON.stringify({id: userData.provider.accountId, key: userData.provider.apiKey}),
        });

        
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        console.log(data.result);

        let output = (data.result).filter((item: any) => item.type !== "host-to-guest");
        output = output.filter((item: any) => item.publicReview !== null);


        setReviews(output || []);
        setReviews_temp(output || []);
        console.log(reviews)
      } catch (err: any) {

      }
    };

    async function checkAndFetch() {
      console.log("Checking and fetching");
      const custmerData = await getCustomerData("registeredUsers").then((data) => {
        console.log(data);

        if (data.updatedData === null) {
          console.log("No provider data found");
          redirect("/login");
        } else if (data.provider.name !== "") {
          console.log("Provider data found");

          fetchListings();
          fetchReviews();
        } else {
          console.log("No provider data found");
          redirect("/test3");
        }
      
    });
  }

    checkAndFetch();
    // fetchListings();
    // fetchReviews();
  }, []);


  const onPlatformChange = (platform: string) => {
    setPlatform(platform);





  }
  


  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Business Type Toggle */}
        <div className="flex justify-between flex-col items-start mb-4">

        <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-white">Dashboard Demo</h1>

        <div className="flex items-center gap-4">
          {/* <ReportsButton /> */}
          {/* <Button 
            onClick={() => redirect('/free-trial')}
            className="bg-primary text-black hover:bg-primary/90"
          >
            Start Free Trial
          </Button> */}
        </div>
        
      </div>
      <h2 className='text-white text-xl font-bold my-auto mt-8'>My Filters</h2>


          {/* <BusinessTypeToggle 
            type={businessType}
            onChange={setBusinessType}
          /> */}
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-white/10 p-4 mb-8">

          {/* Header Text */}
          <DashboardHeader onDateRangeChange={handleDateRangeChange} 
          reviews_temp_switch={reviews_temp_switch}
          tempReviews={reviews}

          />

            <MultiSelectDropdown
              listings={listings}
              tempListings={listings_temp}
              listings_temp_switch={listings_temp_switch}
            />

            {/* Global Filters */}
            <ReviewFilters
              platform={platform}
              // rating={rating}
              onPlatformChange={onPlatformChange}
              // onRatingChange={setRating}
              className="mb-8"
              listings={listings}
              reviews={reviews} 
              tempListings={listings_temp}
              tempReviews={reviews_temp}
              reviews_temp_switch={reviews_temp_switch}
              listings_temp_switch={listings_temp_switch}
            />



        </div>



        
        {/* //////////////////////////////////////////////////////// */}
        {/* Dashboard Content */}
        <DashboardStats 
          dateRange={dateRange} 
          businessType={businessType}
          platform={platform}
          rating={rating}
          listings={listings}
          reviews={reviews} 
          tempListings={listings_temp}
          tempReviews={reviews_temp}
        />
        
        {/* <WidgetGrid 
          className="mt-8" 
          // businessType={businessType}
          // platform={platform}
          // rating={rating}
        /> */}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            {/* <ChallengesSection 
              // businessType={businessType}
              // platform={platform}
              // rating={rating}
            /> */}
          </div>
          <div className="space-y-8">
            {/* <PointsSummary /> */}
            {/* <ProgressSection 
              // businessType={businessType}
              // platform={platform}
              // rating={rating}
            /> */}
          </div>
        </div>
        
        <div className="mt-8">
          {/* <AchievementsSection /> */}
        </div>
        
        <DashboardTabs 
          className="mt-8" 
          businessType={businessType}
          platform={platform}
          rating={rating}
          tempReviews={reviews_temp}
          tempListings={listings_temp}
        />
      </div>  




    </main>
  );
}