import React from 'react'
import { Button } from '@/components/ui/Button';

// Firebase, get user info depending on their 'uid' value
// import { useAuth } from '@/contexts/AuthContext';
// import {fetchUserData} from "@/firebase/fetchUserData";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


const DeleteButton = ({emptyUser, user, db, userRef, userData, updateUser}) => {
  
  
    // Handle form submission
    // the submit button replaces the user's info in the firestore with the new userData state value
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        // Reference to the user's Firestore document


        // Overwrite the document with the new data
        await setDoc(userRef, {
            ...userData,
            status: "not-active",
            updatedAt: new Date(), // Optional: track when the data was last updated
        });

        console.log("User data successfully updated!");
        } catch (error) {
        console.error("Error updating user data: ", error);
        }
    };

  
  
  
    return (
        <form onSubmit={handleSubmit}>
        <Button type="submit" variant="secondary" fullWidth className="text-red-400 hover:text-red-300">
            Delete Account
        </Button>
        </form>

  )
}

export default DeleteButton
