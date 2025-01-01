import React, { useState } from 'react';
import { Button } from '../ui/Button';

// Firebase, get user info depending on their 'uid' value
// import { useAuth } from '@/contexts/AuthContext';
// import {fetchUserData} from "@/firebase/fetchUserData";
import { getFirestore, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

// for backend payment handling
import { chargeAndSubscribe } from "@/app/api/Stripe/charge-and-subscribe/route";
import { getAuth } from "firebase/auth";
import { db } from '@/firebase/firebase';

// interface PlanSelectionModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   currentPlan: string;
// }

export function ClearSubscriptions({userRef, userData, updateUser}) {
  
  
 



  const cancelSubsriptions = async () => {

    try {

      /////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////
      // get the customer's stripe id by their uid present in the web-app's Auth context
      // to be used by Stripe API to charge and add subscription.
      const auth = getAuth();
      const user = auth.currentUser;
      const { uid } = user;

      const userRef_stripe = doc(db, "stripeCustomers", uid);
      console.log(userRef_stripe);

      const customerDoc = await getDoc(userRef_stripe);

      // check if the customer does not exist
      if (!customerDoc.exists) {
          setError("Add a payment method first then select plan");
      }

      // destructure out the customers data initialized in the collection
      const { stripeCustomerId } = customerDoc.data();

      /////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////



      /////////////////////////////////////////////////////////////////////      
      /////////////////////////////////////////////////////////////////////
      // by calling the backend function with plan="none" the subscriptions are removed
      // const subscriptionResult = await chargeAndSubscribe({
      //   customerId: stripeCustomerId,
      //   paymentDate: new Date(),
      //   plan: "none",
      // });

      const response = await fetch("/api/Stripe/charge-and-subscribe", {
        method: "POST",
      //   headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: stripeCustomerId,
        paymentDate: new Date(),
        plan: "none",
        }),
      });

      const subscriptionResult = await response.json();


      console.log(subscriptionResult); // Log success message

      /////////////////////////////////////////////////////////////////////
      // change the data for the user in firebase
      // const userRef = doc(db, "registeredUsers", uid);

      let updatedData = {
        ...userData,
        plan: 'none',
        subscriptionDate: Timestamp.fromDate(new Date()),
        paymentDate: Timestamp.fromDate(new Date()),
        updatedAt: new Date(), // Optional: track when the data was last updated
      }
       await setDoc(userRef, updatedData);

      console.log(updatedData);

      updateUser(updatedData);

      /////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////

    } catch (err) {
        // setError(err instanceof Error ? err.message : 'Failed to update plan');
      } finally {
        // setLoading(false);
      }
  };

  return (
    // <button onClick={()=>cancelSubsriptions()}>Clear subscriptions</button>
    <Button 
    variant="secondary"
    onClick={()=>cancelSubsriptions()}
  >
    Unsubscribe
  </Button>
  );
}