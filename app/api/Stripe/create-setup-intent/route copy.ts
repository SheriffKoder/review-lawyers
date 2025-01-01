
// Generate a SetupIntent for adding payment methods.

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps } from "firebase-admin/app";

// For fetching the customerDoc
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia",
  });
  
  if (!getApps().length) {
    initializeApp();
  }
  // const db = getFirestore();
  
interface CreateSetupIntentRequest extends Request {
    uid: string;
}

  export const POST = async (
    req: CreateSetupIntentRequest,
    res: NextApiResponse
  ): Promise<any> => {

    const {uid} = await req.json();


    try {

        // get the customer from the collection, previously saved from create-customer.js
        const userRef = doc(db, "stripeCustomers", uid);
        const customerDoc = await getDoc(userRef);
        console.log(customerDoc.exists);

        // check if the customer does not exist
        if (!customerDoc.exists) {
            throw new Error("Customer not found");
        }

        // get stripe's id associated with the user stored when the user was created
        const { stripeCustomerId } = customerDoc.data() as { stripeCustomerId: string };

        // setup a stripe Intent with the fetched id i.e payment method
        // which is then validated on success of this API response to save the payment method for the user in the API
        const setupIntent = await stripe.setupIntents.create({
            customer: stripeCustomerId,
        })

        return new Response(JSON.stringify({clientSecret: setupIntent.client_secret, stripeCustomerId:stripeCustomerId}), {status: 200});

    } catch (error) {

        console.error("Error creating Setup Intent", (error as Error).message);
        return new Response(JSON.stringify({error: "Internal Server Error"}), {status: 500});

    }






}