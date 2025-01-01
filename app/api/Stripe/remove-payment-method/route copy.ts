import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia",
});

interface ListPaymentMethodsRequest extends Request {
    paymentMethodId: string;
}


export const POST = async (
    req: ListPaymentMethodsRequest,
    res: NextApiResponse
): Promise<any> => {

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
    console.error("Error removing payment method:", (error as Error).message);
    return new Response(JSON.stringify({error: "Internal Server Error"}), {status: 500});
}
}
