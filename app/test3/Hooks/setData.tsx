"use client";

import { db } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface UseStripeCustomerReturn {
  updatedData: any | null;
}


// Send in the the input want to add/edit and the collection name


export const setCustomerData = async (
  documentName: string,
  input: any
): Promise<any> => {

    
  try {
    // Get the user from Firebase Auth
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No authenticated user found.");
    }

    const { uid } = user;
    const userRef = doc(db, documentName, uid);
    const customerDoc = await getDoc(userRef);

    if (customerDoc.exists()) {
      const customer = customerDoc.data();

      const updatedData = {
        ...customer,
       ...input,
        updatedAt: new Date(), // Optional: track when the data was last updated
      };

      await setDoc(userRef, updatedData);

      console.log(updatedData);

      return updatedData ;
    } else {
      throw new Error("Customer document does not exist.");
    }
  } catch (err: any) {
    console.error("Error updating customer data:", err.message);
    return { updatedData: null };
  }
};
