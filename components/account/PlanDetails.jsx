import React, { useState, useEffect } from 'react';
import { Package, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { PlanSelectionModal } from './PlanSelectionModal';
import { ClearSubscriptions } from '../Stripe/ClearSubscriptions';

// Firebase, get user info depending on their 'uid' value
// import { useAuth } from '@/contexts/AuthContext';
// import {fetchUserData} from "@/firebase/fetchUserData";
// import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";




export function PlanDetails({emptyUser, user, db, userRef, userData, updateUser}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateDaysDifferenceFromTimestamp = (firestoreTimestamp) => {
    const today = new Date(); // Current date
    const target = firestoreTimestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
  
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = target - today;
  
    // Convert milliseconds to days
    const daysDifference = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
    return daysDifference;
  };


  function formatFirestoreTimestampToMMDDYYYY(timestamp) {
    const date = timestamp.toDate();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  }

  const dateVariable = "";

  const subscriptionDateFormatted = (userData.subscriptionDate !== dateVariable)
  ? formatFirestoreTimestampToMMDDYYYY(userData.subscriptionDate)
  : "No date available";

  const paymentDateFormatted = (userData.paymentDate !== dateVariable)
  ? formatFirestoreTimestampToMMDDYYYY(userData.paymentDate)
  : "No date available";


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Current Plan</h3>
          {userData.plan !== "none" && (
              <p className="text-sm text-gray-400">{userData.plan === "trial" ? 'Trial started on:' : 'Plan start date:'} {userData.subscriptionDate !== "" && subscriptionDateFormatted}</p>
          )}

          {
            userData.plan !== "trial"  && userData.plan !== "none" && (
              <p className="text-sm text-gray-400">Next payment date: {userData.paymentDate !== "" && paymentDateFormatted}</p>
            )
          }

          <p className="text-sm text-gray-400">Manage your subscription and billing</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm capitalize">
        {userData.plan === "none" ? (
          "Unsubscribed"
        ): (
          userData.plan+" Plan"
        )}
          
        </div>
      </div>


      {userData.plan === "trial" && (
      
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <div className="flex items-center justify-between mb-0">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-primary mb-auto mt-1" />
              <div>
                <h4 className="text-white font-medium">Free trial</h4>
                <p className="text-sm text-gray-400">Till {paymentDateFormatted}</p>
                
                <p className="text-sm text-gray-400">Remaining {calculateDaysDifferenceFromTimestamp(userData.paymentDate)} Days</p>

              </div>
            </div>
            <Button 
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
            >
              Upgrade Plan
            </Button>
          </div>
        </div>
    
      )}

      {userData.plan === "none" && (
            
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
          <div className="flex items-center justify-between mb-0">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-primary mb-auto mt-1" />
              <div>
                <h4 className="text-white font-medium">Not subscribed to any plan</h4>
                {/* <p className="text-sm text-gray-400">Till {paymentDateFormatted}</p> */}
                
                {/* <p className="text-sm text-gray-400">Remaining {calculateDaysDifferenceFromTimestamp(userData.paymentDate)} Days</p> */}

              </div>
            </div>
            <Button 
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
            >
              Choose plan
            </Button>
          </div>
        </div>
        
      )}

      {userData.plan === "starter" && (
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-primary" />
            <div>
              <h4 className="text-white font-medium">Starter</h4>
              <p className="text-sm text-gray-400">$9.99/month</p>
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <Button 
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
            >
              Change Plan
            </Button>
            <ClearSubscriptions userRef={userRef} userData={userData} updateUser={updateUser}/>
          </div>
        </div>

        <div className="space-y-2 text-white">

          <div className="flex items-center gap-2 text-gray-300">

            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Dashboard Analytics</span>
          </div>
          <div className='pl-8 text-white/80 text-base w-full'>Basic Insights</div>

          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Automatic Email Alerts</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Standard Support</span>
          </div>
        </div>
        </div>
      )}

      {userData.plan === "professional" && (
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-primary" />
            <div>
              <h4 className="text-white font-medium">Professional</h4>
              <p className="text-sm text-gray-400">$19.99/month</p>
            </div>
          </div>

          <div className='flex flex-row gap-2'>
            <Button 
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
            >
              Change Plan
            </Button>
            <ClearSubscriptions userRef={userRef} userData={userData}  updateUser={updateUser}/>
          </div>

        </div>

        <div className="space-y-2">
          <p className='font-semibold text-white'>Everything in Starter +</p>

          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Actionable Insights: Recommendations for improving reviews based on common trends.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Global Review Management: Address reviews in multiple languages with AI translation and sentiment analysis.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Collaboration Tools: Ability to share reports and insights with team members or stakeholders.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Review Sentiment Analysis.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Multiple Platform Integration (3).</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>AI Insights.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Monthly Perfomance Reports.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>AI Automated Generated Reports.</span>
          </div>
        </div>
        </div>
      )}

      {userData.plan === "Professional+" && (
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-primary" />
            <div>
              <h4 className="text-white font-medium">Professional+</h4>
              <p className="text-sm text-gray-400">$29.99/month</p>
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <Button 
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
            >
              Change Plan
            </Button>
            <ClearSubscriptions userRef={userRef} userData={userData} updateUser={updateUser}/>
          </div>
        </div>

        <div className="space-y-2">
          <p className='font-semibold text-white'>Everything in Professional+</p>

          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Advanced Sentiment Analysis: Break down reviews into themes or categories for deeper understanding.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Unlimited Review Monitoring.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Priority Review Removal.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>AI Review Removal Assistance.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Custom Training Sessions for the team.</span>
          </div>
          <p className='font-semibold text-white pt-2'>All Platform Integration:</p>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Priority API Support: Faster turnaround for custom API integrations or troubleshooting.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>- Dedicated Support Rep & Account Manager
            - Only for 10+ Listings.</span>
          </div>
         
        </div>
        </div>
      )}

      <PlanSelectionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPlan={userData.plan}
        emptyUser={emptyUser} user={user} db={db} userRef={userRef}
        userData={userData}
        updateUser={updateUser}
      />
    </div>
  );
}