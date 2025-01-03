"use client"
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

const Invoices: React.FC = () => {

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
        // console.log(invoices);
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
    <div className="text-white">
      <h2>User Invoices</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <p>
              <strong>Invoice ID:</strong> {invoice.id}
            </p>
            <p>
              <strong>Amount Due:</strong> ${invoice.amount_due / 100}
            </p>
            <p>
              <strong>Amount Paid:</strong> {formatTimestamp(invoice.period_start)}
            </p>
            <p>
              <strong>Status:</strong> {invoice.status}
            </p>
            <p>
              <a href={invoice.invoice_pdf} target="_blank" rel="noopener noreferrer">
                View Invoice PDF
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invoices;
