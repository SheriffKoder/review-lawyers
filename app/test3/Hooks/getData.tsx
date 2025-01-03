"use client"
import { useState, useEffect } from "react";
import { db } from '@/firebase/firebase';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react'

// send in the collection name to fetch for the user in the Auth.

interface UseStripeCustomerReturn {
    customerData: any;
    loading: boolean;
    error: string | null;
  }
  
  export const getCustomerData = async (
    documentName: string,
  ): Promise<any> => {


    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
        throw new Error("No authenticated user found.");
        }

        const { uid } = user;
        const userRef = doc(db, documentName, uid);
        const customerDoc = await getDoc(userRef);

        if (customerDoc.exists()) {
            return customerDoc.data();
        } else {
            throw new Error("Customer document does not exist.");
          }
    } catch (err: any) {
        // console.error("Error fetching customer data:", err.message);
        return { updatedData: null };
    }
};