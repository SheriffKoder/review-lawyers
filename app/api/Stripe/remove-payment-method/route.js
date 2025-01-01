import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
});



export const POST = async (
    req,
    res
) => {

const {paymentMethodId} = await req.json();

  if (!paymentMethodId) {
    return res.status(400).json({ error: "Payment Method ID is required." });
  }

  try {
    // Detach the payment method from the customer
    const detachedPaymentMethod = await stripe.paymentMethods.detach(paymentMethodId);


    return new Response(JSON.stringify({
        message: "Payment method removed successfully.",
        paymentMethod: detachedPaymentMethod,
      }), {status: 200});

  } catch (error) {
    console.error("Error removing payment method:", (error).message);
    return new Response(JSON.stringify({error: "Internal Server Error"}), {status: 500});
}
}
