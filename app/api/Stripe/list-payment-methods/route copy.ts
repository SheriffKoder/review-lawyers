import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps } from "firebase-admin/app";

// For fetching the customerDoc
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

// get the user's stripe id from Firestore stripe's collection to get the payment methods from the API

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia",
});
  
if (!getApps().length) {
initializeApp();
}



interface ListPaymentMethodsRequest extends Request {
      uid: string;
}
// creates with the passed in "uid"
export const POST = async (
    req: ListPaymentMethodsRequest,
    res: NextApiResponse
  ): Promise<any> => {

    // destructure out the passed "uid"
    const {uid} = await req.json();

    // using this "uid", find the customer in our stripe collection in db
    try {

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        // get the customer from the collection, previously saved from create-customer.js
        const userRef = doc(db, "stripeCustomers", uid);
        const customerDoc = await getDoc(userRef);
        console.log(customerDoc.exists);

        // check if the customer does not exist
        if (!customerDoc.exists) {
            throw new Error("Customer not found");
        }

        // destructure out the customers data initialized in the collection
        const { stripeCustomerId } = customerDoc.data() as { stripeCustomerId: string };

         // Get the default payment method
         const customer = await stripe.customers.retrieve(stripeCustomerId) as Stripe.Customer;
         const defaultPaymentMethodId = customer.invoice_settings?.default_payment_method || null;

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////

        
        // List payment methods on the customer in the Stripe API
        const paymentMethods = await stripe.paymentMethods.list({
            customer: stripeCustomerId,
            type: "card",
        })

        // Map payment methods and identify the default one
        const cards = paymentMethods.data.map((method) => ({
            id: method.id,
            customer: method.customer,
            brand: method.card?.brand,
            last4: method.card?.last4,
            expMonth: method.card?.exp_month,
            expYear: method.card?.exp_year,
            isDefault: method.id === defaultPaymentMethodId, // Check if the card is default
        }));

        // console.log(paymentMethods);

        return new Response(JSON.stringify({paymentMethods: cards}), {status: 200});


    } catch (error) {

        console.error("Error listing payment methods: ", (error as Error).message);
        return new Response(JSON.stringify({error: "Internal Server Error"}), {status: 500});

    }





}