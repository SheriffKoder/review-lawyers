"use client"
import React, {useState} from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { Button } from "../ui/Button";
// import CustomCardInput from "./CustomCardInput";
import styles from "./CardFlip.module.css"; // Import custom styles

interface AddPaymentMethodProps {
    uid: string;
    isStripeUser_stateHandler: (input:boolean) => void;
    setUpdateMethods_stateHandler: ()=>void;

}

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
      invalid: {
        color: "red", // Invalid input text color
        borderColor: "red", // Invalid border color
      },
    },
};
  

const AddPaymentMethod: React.FC<AddPaymentMethodProps> = ({uid, isStripeUser_stateHandler, setUpdateMethods_stateHandler}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>("");

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFocus = () => {
      setIsFlipped(true);
    };
  
    const handleBlur = () => {
      setIsFlipped(false);
    };
  
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
            const cardNumberElement  = elements.getElement(CardNumberElement);

            // 
            if (!cardNumberElement ) {
                throw new Error("CardElement is not available");
            }


            ////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////
            // confirm using the client secret
            const result = await stripe.confirmCardSetup(clientSecret, {
                payment_method: {
                    card: cardNumberElement !,
                    billing_details: {
                        name: (document.getElementById("name-on-card") as HTMLInputElement).value,
                        address: {
                            postal_code: (document.getElementById("zip-card") as HTMLInputElement).value, // Pass zip as postal_code
                          },                      },              
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

              isStripeUser_stateHandler(false);
              setUpdateMethods_stateHandler();
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



    return (

        <div className="flex w-full md:flex-row flex-col md:gap-[1rem] items-center justify-center">



            <form onSubmit={handleSubmit} className="w-full">
                {/* <CardElement options={cardStyle} /> */}

                <div className="flex w-full md:flex-row flex-col md:gap-[1rem] items-center justify-center ">
                    
                    <div className={`${styles.cardContainer} h-[230px] w-[350px] md:order-2 md:my-auto md:w-[300px] md:h-[190px]`}>
                    <div className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}>
                        {/* Front side of the card */}
                        <div className={styles.cardFront} style={{
                            backgroundImage: 'url("images/card_f.jpg")',
                            backgroundPosition: "center",
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat",
                        }}>
                        <p></p>
                        </div>

                        {/* Back side of the card */}
                        <div className={styles.cardBack} style={{
                            backgroundImage: 'url("images/card_b.jpg")',
                            backgroundPosition: "center",
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat"

                        }}>
                        <p></p>
                        <div className="absolute right-[1%] bottom-[43%] border-dashed border-blue-500 border-2 h-[20%] w-[20%]"></div>
                        </div>
                    </div>
                    </div>

                    <div>

                        {/* Name on card */}
                        <div style={{ marginBottom: "16px" }}>
                            <label htmlFor="name-on-card" className="text-white font-medium" style={{ display: "block", marginBottom: "8px" }}>
                            Name on Card
                            </label>
                            <input className="cardInput text-white bg-primary/10 outline-none placeholder:text-sm placeholder:text-gray-400 border border-white/10"
                            type="text"
                            id="name-on-card"
                            placeholder="Name on Card"
                            style={{
                                width: "100%",
                                padding: "4px 10px",
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
                            <div className="cardInput bg-primary/10 focus-within:bg-primary/20 outline-none placeholder:text-sm placeholder:text-gray-400 border border-white/10"
                            style={{
                                padding: "10px",
                                // border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                            >
                            <CardNumberElement id="card-number" options={stripeElementOptions} />
                            </div>
                        </div>


                        {/* Expiry date, CVC, Zip code */}
                        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                            
                            {/* Expiry Date */}
                            <div style={{ flex: 1 }}>
                            <label htmlFor="card-expiry" className="text-white font-medium" style={{ display: "block", marginBottom: "8px" }}>
                                Expiry Date
                            </label>
                            <div className="cardInput bg-primary/10 focus-within:bg-primary/20 outline-none placeholder:text-sm placeholder:text-gray-400 border border-white/10"
                                style={{
                                padding: "10px",
                                //   border: "1px solid #ccc",
                                borderRadius: "4px",
                                }}
                            >
                                <CardExpiryElement id="card-expiry" options={stripeElementOptions} />
                            </div>
                            </div>


                            {/* CVC input */}
                            <div style={{ flex: 1 }}>
                            <label htmlFor="card-cvc" className="text-white font-medium" style={{ display: "block", marginBottom: "8px" }}>
                                CVC
                            </label>
                            <div className="cardInput bg-primary/10 focus-within:bg-primary/20 outline-none placeholder:text-sm placeholder:text-gray-400 border border-white/10"
                                style={{
                                padding: "10px",
                                //   border: "1px solid #ccc",
                                borderRadius: "4px",
                                }}

                            >
                                <CardCvcElement id="card-cvc" options={stripeElementOptions} 
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                />
                            </div>
                            </div>

                            {/* Zip Code */}
                            <div style={{ flex: 1 }}>
                                <label htmlFor="zip-card" className="text-white font-medium" style={{ display: "block", marginBottom: "8px" }}>
                                Zip Code
                                </label>
                                <input className="cardInput text-white bg-primary/10 outline-none placeholder:text-sm placeholder:text-gray-400 border border-white/10"
                                type="text"
                                id="zip-card"
                                placeholder="Zip code"
                                style={{
                                    width: "100%",
                                    padding: "4px 10px",
                                    // border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    fontSize: "16px",
                                }}
                                required
                                />
                            </div>
                        </div>

                    </div>
                </div>                


                <div className='md:w-full flex justify-end text-white gap-2 mt-[1rem]  w-[350px] mx-auto'>
                    <Button type="submit" disabled={!stripe || loading} className="w-full">
                        {loading? "Saving, Please wait." : "Save Card"}
                    </Button>

                    <Button variant="secondary" size="sm" onClick={()=>isStripeUser_stateHandler(false)}>Cancel</Button>
                </div>


            </form>
            {/* <CustomCardInput isStripeUser_stateHandler={isStripeUser_stateHandler} />     */}
            {message && <p>{message}</p>}
        </div>

    )

}

export default AddPaymentMethod;
