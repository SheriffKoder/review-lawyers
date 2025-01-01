import React from 'react';
import { CreditCard, Package, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { PlanDetails } from './PlanDetails';
import { PaymentMethods } from './PaymentMethods';
import { BillingHistory } from './BillingHistory';

export function BillingSection({emptyUser, user, db, userRef, userData, updateUser}) {
  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <PlanDetails emptyUser={emptyUser} user={user} db={db} userRef={userRef}
      userData={userData} updateUser={updateUser}/>

      {/* Payment Methods */}
      <PaymentMethods />

      {/* Billing History */}
      <BillingHistory />
    </div>
  );
}