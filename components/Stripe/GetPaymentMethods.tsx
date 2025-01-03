"use client"
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { CreditCard, Plus, SplineIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { LoadingSpinner } from "../ui/LoadingSpinner";

const brandLogos: { [key: string]: string } = {
  visa: "images/visa.png",
  mastercard: "/images/mastercard.png",
  amex: "/images/amex.jpg",
  discover: "/images/discover.jpg",
  diners: "/images/diners.png",
  jcb: "/images/jcb.png",
  unionpay: "/images/unionpay.png",
  other: "/images/otherBrand.jpg", // Default logo for unknown brands
};

interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
  };
}

interface GetPaymentMethodsProps {
  updateMethods:boolean;
}

const GetPaymentMethods: React.FC<GetPaymentMethodsProps> = ({updateMethods}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const GetPaymentMethods_fetch = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // Get the current user's "uid" from Firebase Auth
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setMessage("No user is currently logged in.");
        return;
      }

      const { uid } = user;

      // Ensure we have the necessary information
      if (!uid) {
        setMessage("User UID or email is missing.");
        return;
      }


      // once there is a "uid", call the api to send back the associated payment methods
        const response = await fetch("/api/Stripe/list-payment-methods", {
          method: "POST",
          // headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid }),
        });


      if (response.ok) {
        const {paymentMethods} = await response.json();
        setMessage(``);

        // store the fetched payment methods in the state in the parent component.
        // 
        // console.log(paymentMethods);
        setPaymentMethods(paymentMethods);

      } else {
        const errorData = await response.json();
        // setMessage(`Error creating customer: ${errorData.error}`);
      }

    } catch (error) {
      setMessage(`Unexpected error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  // as we have payment method id and customer id returned in the paymentMethod stored in the state
  // we can call the set-default 
  const setAsDefaultPaymentMethod = async ({paymentMethodId, stripeCustomerId}:{
    paymentMethodId: string;
    stripeCustomerId: string;
  }) => {
    await fetch("/api/Stripe/set-default-payment-method", {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: stripeCustomerId, // Replace with actual customer ID
        paymentMethodId,
      }),
    });
    GetPaymentMethods_fetch();


  }
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  // as we have payment method id and customer id returned in the paymentMethod stored in the state
  // we can call the set-default 
  const removePaymentMethod = async ({paymentMethodId}:{
    paymentMethodId: string;
  }) => {
    await fetch("/api/Stripe/remove-payment-method", {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentMethodId,
      }),
    });
    GetPaymentMethods_fetch();


  }
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////


  

  useEffect(()=> {
    GetPaymentMethods_fetch();

  },[updateMethods])

  return (
    <div className="text-white">
    {/* <h2>Registered Payment Methods</h2> */}
    <ul className="flex flex-col gap-2">

        {paymentMethods.length > 0 && paymentMethods.map((method:any)=> (
        <li key={method.id}>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                {method.type === "card" &&
                (
                  // <CreditCard className="w-5 h-5 text-primary" />
                  ""
                )}

                  
                   <img
                        src={brandLogos[method.brand] || brandLogos.other}
                        alt={method.brand}
                        className="h-full w-full rounded-[5px]"
                      />
                  {/* {method.brand} */}
                </div>
                <div>
                  <h4 className="text-white font-medium">•••• {method.last4}</h4>
                  <p className="text-sm text-gray-400">Expires {method.expMonth}/{method.expYear}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {
                  method.isDefault ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">Default</span>
                  ) : (
                    <button className="px-2 py-1 text-xs rounded-full bg-white/10 text-white border border-transparent hover:border-white" onClick={()=>setAsDefaultPaymentMethod({paymentMethodId:method.id, stripeCustomerId:method.customer})}>Set As Default</button>
                  )
                }

                  <button className="px-2 py-1 text-xs rounded-full bg-white/10 text-white border border-transparent hover:border-white"  onClick={()=>removePaymentMethod({paymentMethodId:method.id})}>Remove</button>
              </div>
            </div>
          </div>
        </li>
        ))}

        

        <h2>{message}</h2>

    </ul>
</div>
  );
};

export default GetPaymentMethods;
