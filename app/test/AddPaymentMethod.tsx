"use client"
import React, {useState} from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"

interface AddPaymentMethodProps {
    uid: string;
}

const AddPaymentMethod: React.FC<AddPaymentMethodProps> = ({uid}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>("");


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setLoading(true);

        try {

            // send the "uid" recieved in the component to the api
            const response = await fetch("/api/Stripe/create-setup-intent", {
                method: "POST",
                // headers: { "Content-Type": "application/json"},
                body: JSON.stringify({uid}),
            });

            // recieve back a client secred
            const { clientSecret, stripeCustomerId } = await response.json();
            console.log(clientSecret, stripeCustomerId);
            
            if (!stripe || !elements) {
                throw new Error("Stripe has not loaded yet.");
            }

            //
            const cardElement = elements.getElement(CardElement);

            // 
            if (!cardElement) {
                throw new Error("CardElement is not available");
            }


            ////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////
            // confirm using the client secret
            const result = await stripe.confirmCardSetup(clientSecret, {
                payment_method: {
                    card: cardElement,
                }
            });

            // setup as default payment method
            const paymentMethodId = result.setupIntent?.payment_method;
            await fetch("/api/Stripe/set-default-payment-method", {
                method: "POST",
                // headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  customerId: stripeCustomerId, // Replace with actual customer ID
                  paymentMethodId,
                }),
              });
            ////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////


            // check on the confirmation
            if (result.error) {
                setMessage(result.error.message || "An error occurred.");
            } else {
                setMessage("Payment method added successfully!");
            }


        } catch (error) {
            setMessage("Failed to add payment method.");
        } finally {
            setLoading(false);
        }
    };



    const cardStyle = {
        style: {
          base: {
           iconColor: "#ffff",
           color: "#fff",
           fontWeight: 500,
           fontSize: "18px",
           backgroundColor: "#0000"
          },
          invalid: {
            
          },
        },
      };




    return (
        <form onSubmit={handleSubmit} className="border w-[500px] h-[500px] text-white">
            <CardElement options={cardStyle} />
            <button type="submit" disabled={!stripe || loading}>
                {loading? "Adding..." : "Add Payment Method"}
            </button>
            {message && <p>{message}</p>}
        </form>
    )

}

export default AddPaymentMethod;
