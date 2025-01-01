"use client"
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/utils/cn';
import { LoadingSpinner } from '../ui/LoadingSpinner';

// Fire base to send the email to a dedicated collection
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
// @ts-ignore
import {db} from "@/firebase/firebase";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');


  const InputHandler = (e:any) => {
    setEmail(e.target.value);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1500));
      const docRef = await addDoc(collection(db, "subscribedEmails"), {
        email:email,
        time: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);

    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-2", className)}>
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={InputHandler}
          placeholder="Enter your email"
          className={cn(
            "w-full px-4 py-2 rounded-lg",
            "bg-white/5 border",
            "text-white placeholder:text-gray-500",
            "focus:outline-none focus:ring-1",
            "transition-colors duration-200",
            status === 'error' 
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-white/10 focus:border-primary focus:ring-primary"
          )}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className={cn(
          "w-full px-4 py-2 rounded-lg",
          "bg-primary text-black",
          "hover:bg-primary/90",
          "transition-all duration-200",
          "flex items-center justify-center gap-2",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {status === 'loading' ? (
          <>
            <LoadingSpinner size="sm" />
            Subscribing...
          </>
        ) : status === 'success' ? (
          <>
            <Send className="w-4 h-4" />
            Subscribed!
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Subscribe
          </>
        )}
      </button>

      {message && (
        <p className={cn(
          "text-sm",
          status === 'error' ? "text-red-400" : "text-primary"
        )}>
          {message}
        </p>
      )}
    </form>
  );
}