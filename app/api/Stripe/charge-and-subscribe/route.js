// components > account > PlanSelectionModal.jsx
// This is a component used in the PlanSelectionModal.jsx component.
// The PlanSelectionModal component will change the type of the plan to what the user chooses
// and then call this function to charge the user with the amount and set a billing date for the passed-in date.

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

export const POST = async (req, res) => {
  try {
    const { customerId, paymentDate, plan } = await req.json();

    if (!customerId || !paymentDate || !plan) {
      // return res.status(400).json({ error: "Customer ID, payment date, and plan are required." });
      return new Response(JSON.stringify({ error: "Customer ID, payment date, and plan are required." }), {status: 400});
      
    }

    // Map plan to its cost
    const amountMap = {
      starter: 999, // $9.99 in cents
      professional: 1999, // $19.99 in cents
      enterprise: 2999, // $29.99 in cents
      none: 0, // No cost
    };

    const idMap = {
      starter: "prod_RUjVvUsL00yfZ9",
      professional: "prod_RUjVPsYcgH3r6Y",
      enterprise: "prod_RUjVce2cceDC1J",
    };

    const amount = amountMap[plan];

    // Cancel any existing subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({ customer: customerId });
    for (const subscription of subscriptions.data) {
      if (subscription.status !== "canceled") {
        await stripe.subscriptions.cancel(subscription.id);
      }
    }

    if (plan === "none") {
      // return res.status(200).json({ message: "All subscriptions cleared for the customer." });
      return new Response(JSON.stringify({ message: "All subscriptions cleared for the customer." }), {status: 200});

    }

    // Charge the customer immediately
    const charge = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: customerId,
      description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan - Immediate Charge`,
    });

    // Create a subscription starting immediately
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price_data: {
            currency: "usd",
            product: idMap[plan],
            unit_amount: amount,
            recurring: { interval: "month" },
          },
        },
      ],
    });


    return new Response(JSON.stringify({
      message: `Customer charged $${(amount / 100).toFixed(2)} and subscription set up.`,
      chargeId: "",
      subscriptionId: subscription.id,
    }), {status: 200});

  } catch (error) {
    console.error("Error handling subscription:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {status: 500});
  }
};
