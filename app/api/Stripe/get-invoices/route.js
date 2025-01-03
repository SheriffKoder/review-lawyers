// pages/api/get-invoices.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps } from "firebase-admin/app";

// For fetching the customerDoc
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
});

if (!getApps().length) {
  initializeApp();
}



export const POST = async (
  req,
  res
) => {


    const {uid} = await req.json();

    // console.log(uid);

  try {

    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    // Retrieve the Stripe Customer ID from Firestore
    // get the customer from the collection, previously saved from create-customer.js
    const userRef = doc(db, "stripeCustomers", uid);
    const customerDoc = await getDoc(userRef);
    // console.log(customerDoc.exists);

    // check if the customer does not exist
    if (!customerDoc.exists) {
        throw new Error("Customer not found");
    }

    // destructure out the customers data initialized in the collection
    const { stripeCustomerId } = customerDoc.data();
    
    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////


    // Fetch invoices for the customer from Stripe
    const invoices = await stripe.invoices.list({
      customer: stripeCustomerId,
    });

    return new Response(JSON.stringify({invoices: invoices.data}), {status: 200});

  } catch (error) {
    console.error("Error fetching invoices:", (error).message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {status: 500});

  }
}
