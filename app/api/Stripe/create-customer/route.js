// @ts-nocheck
// accessible at /api/create-customer

// Create a Customer in Stripe linked with the Firebase uid.
import { NextApiResponse } from "next"; //ts
import Stripe from "stripe";
import { initializeApp, getApps } from "firebase-admin/app";

// For fetching the customerDoc
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
});

if (!getApps().length) {
    initializeApp();
}

// const db = getFirestore();



  export const POST = async (
    req,
    res
  ) => {


    // get uid passed in the requset body
    const {uid, email} = await req.json();

    try {
        // Create a customer in stripe API with the uid and email received
        const customer = await stripe.customers.create({
            email,
            metadata: { firebaseUID: uid},
        })


        // Save the Stipe Id of the customer ID in a Firestore collection
        const userRef = doc(db, "stripeCustomers", uid); // Specify the document path
        await setDoc(userRef, {
        stripeCustomerId: customer.id,
        });

        return new Response(JSON.stringify({customerId: customer.id}), {status: 200});



    } catch (error) {

        console.error("Error creating customer: ", (error).message);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {status: 500});

    }


}

