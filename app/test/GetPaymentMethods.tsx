"use client"
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";




interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
  };
}

const GetPaymentMethods: React.FC = () => {
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
        const paymentMethods = await response.json();
        setMessage(`Fetched payment methods`);

        // store the fetched payment methods in the state in the parent component.
        // 
        console.log(paymentMethods.paymentMethods.data);
        setPaymentMethods(paymentMethods.paymentMethods.data);

      } else {
        const errorData = await response.json();
        setMessage(`Error creating customer: ${errorData.error}`);
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

  },[])

  return (
    <div className="text-white">
    <h2>Registered Payment Methods</h2>
    <ul>
        {paymentMethods.map((method:any)=> (
            <li key={method.id}>
              {method.type} /  
                {method.card.brand} ending in {method.card.last4}
                expiring {method.card.exp_month}/{method.card.exp_year}
                <button onClick={()=>setAsDefaultPaymentMethod({paymentMethodId:method.id, stripeCustomerId:method.customer})}>Set as default</button>
                <button onClick={()=>removePaymentMethod({paymentMethodId:method.id})}>remove</button>
            </li>
        ))}
        <h2>{message}</h2>

    </ul>
</div>
  );
};

export default GetPaymentMethods;
