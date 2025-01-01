import React, {useState} from 'react';
import { AlertCircle, CreditCard, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

import AddPaymentMethod from '@/components/Stripe/AddPaymentMethod'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CreateCustomerButton from '@/components/Stripe/CreateStripeUser';
import GetPaymentMethods from '@/components/Stripe/GetPaymentMethods';
import Invoices from '@/components/Stripe/GetInvoices';
import { ClearSubscriptions } from '@/components/Stripe/ClearSubscriptions';
import AddCard from './Billing/AddCard';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);


export function PaymentMethods() {


    // 
    const [isStripeUser, setIsStripeUser] = useState(false); // trigger the add payment method modal
    const [userUID, setUserUID] = useState(""); //uid that will be passed from Add-Payment button to the add payment modal
    const [message, setMessage] = useState("");

    const isStripeUser_stateHandler = (input:boolean) => {
        setIsStripeUser(input);
    }

    const setUserUID_stateHandler = (input:string) => {
        setUserUID(input);
    }

    const setMessage_stateHandler = (input:string) => {
      setMessage(input);
  }


    const [updateMethods, setUpdateMethods] = useState(false);

    const setUpdateMethods_stateHandler = () => {
      setUpdateMethods((prev)=>prev=!prev);
  }


  return (
    <Elements stripe={stripePromise}>

    <div className="space-y-4">

      {/* Header and add payment button */}
      <div className="flex items-center justify-between">
        <div className='flex-flex-col'>
          <h3 className="text-lg font-semibold text-white mb-1">Payment Methods</h3>
          <p className="text-sm text-gray-400">Manage your payment methods</p>
          {message && (
              <div className="mb-6 p-4 mt-[1rem] bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                  <p>{message}</p>
                  </div>
                </div>
              )}
        </div>
          {/* Add Method */}
          <CreateCustomerButton 
            isStripeUser_stateHandler={isStripeUser_stateHandler}
            setUserUID_stateHandler={setUserUID_stateHandler}
            setMessage_stateHandler={setMessage_stateHandler}/>
      </div>

      {/* Add card area */}

      {
        isStripeUser && (
          <AddCard uid={userUID} isStripeUser_stateHandler={isStripeUser_stateHandler} setUpdateMethods_stateHandler={setUpdateMethods_stateHandler}/>
        )
      }
      
      {/* this is one payment */}
      {/* <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-white font-medium">•••• 4242</h4>
              <p className="text-sm text-gray-400">Expires 12/24</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">Default</span>
            <Button variant="secondary" size="sm">Edit</Button>
          </div>
        </div>
      </div> */}

      <GetPaymentMethods updateMethods={updateMethods}/>

    </div>
    </Elements>

  );
}