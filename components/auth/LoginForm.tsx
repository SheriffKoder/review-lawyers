"use client"
import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { LogIn, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { InputField } from './InputField';
import { GoogleSignInButton } from './GoogleSignInButton';
// import { useAuth } from '@/contexts/AuthContext';

// Import for firebase
// @ts-ignore
import {doSignInWithEmailAndPassword} from "@/firebase/auth.js";


export function LoginForm() {

  // const {userLoggedIn} = useAuth() || {};


   
  // const { signIn, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const isLoadingSwitcher = (input:boolean) => {
    setIsLoading(input);
  }


  const errorSwitcher = (input:string) => {
    setError(input);
  }

  // const handleEmailSignIn = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!formData.email || !formData.password) {
  //     setError('Please fill in all fields');
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError('');

  //   try {
  //     const result = await signIn(formData);
  //     if (result.success) {
  //       redirect('/dashboard');
  //     } else {
  //       setError(result.error || 'Failed to sign in');
  //     }
  //   } catch (err) {
  //     setError('An unexpected error occurred');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleGoogleSignIn = async () => {
  //   setIsLoading(true);
  //   setError('');

  //   try {
  //     const result = await signInWithGoogle();
  //     if (result.success) {
  //       redirect('/dashboard');
  //     } else {
  //       setError(result.error || 'Failed to sign in with Google');
  //     }
  //   } catch (err) {
  //     setError('Failed to sign in with Google');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
  };

    // firebase submit
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // console.log(formData.password);

      let response;

      if (!isLoading) {
        setIsLoading(true);
        
        try {
          response = await doSignInWithEmailAndPassword(formData.email, formData.password)


          // console.log(response);
          // console.log("success");

        } catch (err:any) {
          setError(err);
          console.log(err);

        } finally {
          setIsLoading(false);
          if (response === "active") {
            redirect("/dashboard");
          } else if (response === "not-active"){
            setError("This account has been de-activated")
          } else {
            setError("Invalid login credentials");
          }

        }

        
       
      }
  
    }
  

  

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        </div>
      )}

      <GoogleSignInButton
      setIsLoading={isLoadingSwitcher}
      setError={errorSwitcher}
      isLoading={isLoading}
      text="Continue with Google"
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
            Or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          disabled={isLoading}
        />
        
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          disabled={isLoading}
        />
        
        <Button 
          type="submit" 
          fullWidth 
          disabled={isLoading}
          className="relative"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </>
          )}
        </Button>
      </form>
    </div>
  );
}