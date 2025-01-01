"use client"
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

// Add payment button
// checks if user exists in Firestore's Stripe's collection (i.e previously created) to add another payment method
// or if the user is not initialized in Stripe yet. create a new user in Stripe API and Firestore's Stripe's collection then open the add payment method modal

interface CreateCustomerButtonProps {
    isStripeUser_stateHandler: () => void; // A function prop that returns void
    setUserUID_stateHandler: (input:string)=>void;
}


const CreateCustomerButton: React.FC<CreateCustomerButtonProps> = ({isStripeUser_stateHandler, setUserUID_stateHandler}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCreateCustomer = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // Get the current user from Firebase Auth
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setMessage("No user is currently logged in.");
        return;
      }

      const { uid, email } = user;

      // Ensure we have the necessary information
      if (!uid || !email) {
        setMessage("User UID or email is missing.");
        return;
      }


        // before adding the user to db check if exist first
        ///////////////////////////////////////////////////////////////
        const userRef = doc(db, "stripeCustomers", uid); // Specify the document path
            
        // if user does exist
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
        // console.log("User exists:", userDoc.data());
        setMessage("User already exist");

        // if user exists open the new payment option and the uid to the state passed there
        isStripeUser_stateHandler();    // trigger the add payment method modal
        setUserUID_stateHandler(uid);   // change the "uid" state value that will be passed to the add payment modal
        return; // User exists
        }


        // if not exist proceed with adding the user to Stipe API and Firestore's stripe collection.
        // Send user details to the API
        const response = await fetch("/api/Stripe/create-customer", {
            method: "POST",
            // headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid, email }),
        });


      if (response.ok) {
        const data = await response.json();
        setMessage(`Customer created successfully! Stripe Customer ID: ${data.customerId}`);

        // once finished creating a new user, open the add payment modal to add a the payment
        isStripeUser_stateHandler(); // trigger the add payment method modal
        setUserUID_stateHandler(uid); // change the "uid" state value that will be passed to the add payment modal

      } else {
        const errorData = await response.json();
        setMessage(`Error creating customer: ${errorData.error}`);
      }
    } catch (error) {
      setMessage(`Unexpected error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <button
        onClick={handleCreateCustomer}
        disabled={loading}
        style={{
          backgroundColor: "#1a73e8",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Adding..." : "Add Payment Method"}
      </button>
      {message && <p style={{ marginTop: "1rem", color: loading ? "blue" : "red" }}>{message}</p>}
    </div>
  );
};

export default CreateCustomerButton;
