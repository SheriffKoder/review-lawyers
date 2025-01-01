import React from 'react';
import { LogIn } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileMenu } from './ProfileMenu';
import { cn } from '@/utils/cn';

// Imports for firebase
import {doSignOut} from "@/firebase/auth.js";
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface NavActionsProps {
  className?: string;
}

export function NavActions({ className }: NavActionsProps) {
  const { user } = useAuth();
   

  // console.log(user);


  const handleFreeTrial = () => {
    redirect('/free-trial');
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {user ? (
        <ProfileMenu />
      ) : (
        <>


        <Link className='relative overflow-hidden rounded-lg font-semibold gap-2 transform px-6 py-3 text-base bg-white/10 text-white border border-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 active:translate-y-0 disabled:bg-white/5 min-w-[120px] inline-flex items-center justify-center hover:bg-white/20 transition-all duration-300'
        href="/login">
          Login
        </Link>

        <Link href="/free-trial"
        className='relative overflow-hidden rounded-lg font-semibold gap-2 transform px-6 py-3 text-base bg-primary text-black hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 disabled:bg-primary/50 min-w-[120px] inline-flex items-center justify-center hover:scale-105 transition-all duration-300'
        >
          Start Free Trial
        </Link>
          {/* <Button 
            as={""}
            to="/login"
            variant="secondary"
            className={cn(
              "min-w-[120px]",
              "inline-flex items-center justify-center",
              "hover:bg-white/20",
              "transition-all duration-300"
            )}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button> */}
          
          {/* <Button
            onClick={handleFreeTrial}
            className={cn(
              "min-w-[120px]",
              "inline-flex items-center justify-center",
              "hover:scale-105",
              "transition-all duration-300"
            )}
          >
            Start Free Trial
          </Button> */}
        </>
      )}
    </div>
  );
}