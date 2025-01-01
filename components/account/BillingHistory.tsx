"use client"
import { FileText, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

interface Invoice {
  id: string;
  amount_due: number;
  period_start: number;
  status: string;
  invoice_pdf: string;
}


const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
};

export function BillingHistory() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchInvoices = async () => {
      setLoading(true);
      setError(null);

      try {


        // Get the current user's "uid" from Firebase Auth
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            setError("No user is currently logged in.");
            return;
        }

        const { uid } = user;

        // Ensure we have the necessary information
        if (!uid) {
            setError("User UID or email is missing.");
            return;
        }



        const response = await fetch("/api/Stripe/get-invoices", {
          method: "POST",
        //   headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch invoices.");
          return;
        }

        const { invoices } = await response.json();
        console.log(invoices);
        setInvoices(invoices);
      } catch (err) {
        setError("Unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Billing History</h3>
          <p className="text-sm text-gray-400">View and download past invoices</p>
        </div>
      </div>

      <div className="space-y-3">
        {invoices.map((invoice) => (
          <div 
            key={invoice.id}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-medium">#{invoice.id}</h4>
                <p className="text-sm text-gray-400">{formatTimestamp(invoice.period_start)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className='text-end'>
                <p className="text-white text-right">${invoice.amount_due / 100}</p>
                <p className="text-sm text-green-400">{invoice.status}</p>
              </div>
              <Button variant="secondary" size="sm">
                <a href={invoice.invoice_pdf} target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}