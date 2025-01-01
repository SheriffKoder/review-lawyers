import AddPaymentMethod from '@/components/Stripe/AddPaymentMethod';
import { Button } from '@/components/ui/Button';
import React from 'react'


interface AddPaymentMethodProps {
    uid: string;
    isStripeUser_stateHandler: (input:boolean) => void; // A function prop that returns void
    setUpdateMethods_stateHandler: ()=>void;

}


const AddCard: React.FC<AddPaymentMethodProps> = ({uid, isStripeUser_stateHandler,setUpdateMethods_stateHandler}) => {

    return (
    <div className="space-y-3">
        <div className="flex flex-col items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
          {/* <div className="flex items-center gap-3"> */}
          <AddPaymentMethod  uid={uid} isStripeUser_stateHandler={isStripeUser_stateHandler} setUpdateMethods_stateHandler={setUpdateMethods_stateHandler}/>

            {/* <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"> */}
              {/* <CreditCard className="w-5 h-5 text-primary" /> */}
            {/* </div> */}
            {/* <div> */}
              {/* <h4 className="text-white font-medium">•••• 4242</h4> */}
              {/* <p className="text-sm text-gray-400">Expires 12/24</p> */}
            {/* </div> */}
          {/* </div> */}
          {/* <div className="flex items-center gap-2"> */}
            {/* <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">Default</span> */}
            {/* <Button variant="secondary" size="sm">Edit</Button> */}
          {/* </div> */}

        </div>
        
      </div>
  )
}

export default AddCard
