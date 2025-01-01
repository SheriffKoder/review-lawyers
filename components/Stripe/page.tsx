"use client"
import React, {useState} from 'react'
import AddPaymentMethod from './AddPaymentMethod'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CreateCustomerButton from './CreateStripeUser';
import GetPaymentMethods from './GetPaymentMethods';
import Invoices from './GetInvoices';
import { ClearSubscriptions } from './ClearSubscriptions';

// What these components do
/*

// CreateCustomerButton & AddPaymentMethod
Click Add Payment
Button allows the add payment method to be visible to the user by checking if they are initialized in the Stripe API
if they are not initialized (first time to add a method). they will be initialized by the button to display the card form.

// GetPaymentMethods
displays the payment methods added previously by the user
with a button to set one of the cards as default via the Stripe API
and a button to remove this payment method from the Stripe API

// Invoices
Displays the invoices the customer has in Stripe API


// ClearSubscriptions
this button clears all subscriptions the user might have
also note that when a user chooses a plan in "@\components\account\PlanSelectionModal.jsx" 
they get billed the amount for that plan and the previously chosen plan will be cancelled (i.e no future bills)
and be subscribed for recurring payments after 1 month



*/







const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);


const page = () => {

    // 
    const [isStripeUser, setIsStripeUser] = useState(false); // trigger the add payment method modal
    const [userUID, setUserUID] = useState(""); //uid that will be passed from Add-Payment button to the add payment modal

    const isStripeUser_stateHandler = () => {
        setIsStripeUser(true);
    }

    const setUserUID_stateHandler = (input:string) => {
        setUserUID(input);
    }


  return (
    <div className='h-[100vw] flex flex-col items-center justify-center gap-[2rem]'>
        <Elements stripe={stripePromise}>

            {/* <CreateCustomerButton 
            isStripeUser_stateHandler={isStripeUser_stateHandler}
            setUserUID_stateHandler={setUserUID_stateHandler}/> */}

            {
                // isStripeUser && (
                // <AddPaymentMethod uid={userUID}/>
                // )
            }

            {/* <GetPaymentMethods/> */}

            <Invoices/>

        </Elements>

        {/* <ClearSubscriptions/> */}

    </div>
  )
}

export default page
