import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { Rocket, AlertCircle, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTrial } from '@/hooks/useTrial';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';


// Import for firebase
// @ts-ignore
import {doCreateUserWithEmailAndPassword} from "@/firebase/auth.js";
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
// import { useAuth } from '@/contexts/AuthContext';

const LISTING_OPTIONS = [
  { value: '1-10', label: '1-10 listings' },
  { value: '11-50', label: '11-50 listings' },
  { value: '51-200', label: '51-200 listings' },
  { value: '201-500', label: '201-500 listings' },
  { value: '500+', label: 'More than 500 listings' }
];

export default function FreeTrial() {
   
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    businessName: '',
    businessType: 'rental' as const,
    listingCount: '',
    plan: ''  // will be trial by the subs function
  });

  // firebase
  // const {userLoggedIn} = useAuth() || {};
  const [isRegistering, setIsRegesting] = useState(false);

  const isRegisteringSwitcher = (input:boolean) => {
    setIsRegesting(input);
  }

  const errorSwitcher = (input:string) => {
    // console.log(input);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegesting(true);

    const result = await await doCreateUserWithEmailAndPassword(
      formData
    );

    // console.log(result);

    // if (result.userCredential) {
    //   redirect('/dashboard');
    // } else if (result.error) {
    //   setError(result.error.code)
    // }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Rocket className="h-16 w-16 text-primary mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Start Your Free Trial
          </h1>
          <p className="text-xl text-white/80">
            Experience the power of professional review management risk-free.
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        <GoogleSignInButton
        setIsLoading={isRegisteringSwitcher}
        setError={errorSwitcher}
        isLoading={isRegistering}
        text="Sign-up with Google"
        className='mb-6'
        />

        <div className='text-base font-medium text-white text-center mb-6'>or with E-Mail</div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Business Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-white mb-2">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-white mb-2">
              Business Type
            </label>
            <div className="relative">
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
              >
                <option value="rental">Rental Property</option>
                <option value="restaurant">Restaurant</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="listingCount" className="block text-sm font-medium text-white mb-2">
              Number of Listings
            </label>
            <div className="relative">
              <select
                id="listingCount"
                name="listingCount"
                value={formData.listingCount}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
              >
                <option value="">Select number of listings</option>
                {LISTING_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <Button 
            type="submit" 
            fullWidth 
            disabled={isRegistering}
            className="relative mb-8"
          >
            {isRegistering ? (
              <LoadingSpinner size="sm" />
            ) : (
              'Start Free Trial'
            )}
          </Button>

          {/* Enhanced trial message */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-lg blur animate-pulse" />
            
            <div className="relative bg-black/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <p className="text-2xl font-bold text-white">
                    No credit card required
                  </p>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                </div>
                <p className="text-lg text-primary font-medium">
                  7-day free trial with full access to all features
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}