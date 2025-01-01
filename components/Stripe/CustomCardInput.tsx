import React from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { Button } from "../ui/Button";

// Stripe styling options for Elements
const stripeElementOptions = {
    style: {
      base: {
        // backgroundColor: "transparent", // Default background
        color: "white", // Input text color
        fontSize: "0.875rem", // Input text size
        fontFamily: "Arial, sans-serif", // Adjust to match your design
        "::placeholder": {
          color: "rgb(203, 213, 224)", // Placeholder color
        },
        border: "1px solid rgba(255, 255, 255, 0.1)", // Border color
      },
      focus: {
        borderColor: "#17d9ff", // Border color when focused (indirectly affects the card element's behavior)
      caretColor: "#17d9ff", // Caret color for text inputs
      },
      invalid: {
        color: "red", // Invalid input text color
        borderColor: "red", // Invalid border color
      },
    },
  };
  

interface CustomCardInputProps {
//   onSubmit: (paymentMethodId: string) => void; // Callback to handle submission
  isStripeUser_stateHandler: (input:boolean) => void;

}

const CustomCardInput: React.FC<CustomCardInputProps> = ({isStripeUser_stateHandler}) => {
  const stripe = useStripe();
  const elements = useElements();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    // Confirm the setup intent (Replace clientSecret with your actual one from the backend)
    const { setupIntent, error } = await stripe.confirmCardSetup("your-client-secret", {
      payment_method: {
        card: cardNumberElement!,
        billing_details: {
          name: (document.getElementById("name-on-card") as HTMLInputElement).value,
        },
      },
    });

    if (error) {
      console.error("Error confirming card setup:", error.message);
      return;
    }

    // Pass the PaymentMethod ID to the parent component or backend
    // onSubmit(setupIntent.payment_method as string);
  };

  return (
    <form onSubmit={handleSubmit} className="border w-full mr-auto max-w-[500px]">
      {/* Name on Card */}
      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="name-on-card" className="text-white font-medium" style={{ display: "block", marginBottom: "8px" }}>
          Name on Card
        </label>
        <input className="text-white bg-primary/10 focus:bg-primary/20 outline-none placeholder:text-sm placeholder:text-gray-400 border border-white/10"
          type="text"
          id="name-on-card"
          placeholder="Name on Card"
          style={{
            width: "100%",
            padding: "10px",
            // border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
          required
        />
      </div>

      {/* Card Number */}
      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="card-number" className="text-white font-medium" style={{ display: "block", marginBottom: "8px" }}>
          Card Number
        </label> 
        <div className="bg-primary/10 focus-within:bg-primary/20 outline-none placeholder:text-sm placeholder:text-gray-400 border border-white/10"
          style={{
            padding: "10px",
            // border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <CardNumberElement id="card-number" options={stripeElementOptions} />
        </div>
      </div>

      {/* Expiry and CVC */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="card-expiry" className="text-white font-medium" style={{ display: "block", marginBottom: "8px" }}>
            Expiry Date
          </label>
          <div className="bg-primary/10 focus-within:bg-primary/20 outline-none placeholder:text-sm placeholder:text-gray-400 border border-white/10"
            style={{
              padding: "10px",
            //   border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <CardExpiryElement id="card-expiry" options={stripeElementOptions} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="card-cvc" className="text-white font-medium" style={{ display: "block", marginBottom: "8px" }}>
            CVC
          </label>
          <div className="bg-primary/10 focus-within:bg-primary/20 outline-none placeholder:text-sm placeholder:text-gray-400 border border-white/10"
            style={{
              padding: "10px",
            //   border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <CardCvcElement id="card-cvc" options={stripeElementOptions} />
          </div>
        </div>
      </div>





    </form>
  );
};

export default CustomCardInput;
