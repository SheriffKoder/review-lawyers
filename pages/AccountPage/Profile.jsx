import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

// Firebase, get user info depending on their 'uid' value
import { useAuth } from '@/contexts/AuthContext';
// import {fetchUserData} from "@/firebase/fetchUserData";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";



const Profile = ({emptyUser, user, db, userRef, userData, updateUser}) => {

  

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  // Handle input changes
 const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update state dynamically based on input name
    updateUser((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field
    }));
  };

  // Handle form submission
  // the submit button replaces the user's info in the firestore with the new userData state value
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reference to the user's Firestore document


      // Overwrite the document with the new data
      await setDoc(userRef, {
        ...userData,
        updatedAt: new Date(), // Optional: track when the data was last updated
      });

      console.log("User data successfully updated!");
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };


  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////


  return (
    <form onSubmit={handleSubmit}>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          defaultValue={userData?.fullName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          defaultValue={userData?.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Business Name
        </label>
        <input
          type="text"
          name="businessName"
          defaultValue={userData?.businessName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Business Type
        </label>
        <select
          defaultValue={userData?.businessType}
          onChange={handleInputChange}
          name="businessType"
          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
        >
          <option value="rental">Rental Property</option>
          <option value="restaurant">Restaurant</option>
        </select>
      </div>

      <Button type='submit'>Save Changes</Button>
    </div>
  </form>
  )
}

export default Profile
