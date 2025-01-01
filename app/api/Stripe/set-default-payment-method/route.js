import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
});



export const POST = async (
    req,
    res
) => {

    const {paymentMethodId, customerId} = await req.json();
    console.log(paymentMethodId, customerId);
    // Attach the payment method to the customer
    // await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
  
    // Set it as the default payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });
    return new Response(JSON.stringify({message: "Set as default"}), {status: 200});

  }