"use client"
import { useEffect, useState } from "react";

const HostawayFetch = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // const response = await fetch("/api/hostaway");

        const response = await fetch("/api/hostaway", {
          method: "POST",
        //   headers: { "Content-Type": "application/json" },
          body: JSON.stringify(11),
        });

        
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data = await response.json();
        console.log(data.result);
        setListings(data.result || []);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 border">
      <h1 className="text-2xl font-bold mb-4">Vacation Rental Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="p-4 bg-gray-800 text-gray-200 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">{listing.name}</h2>
            <p>Location: {listing.city}, {listing.state}</p>
            <p>Price: ${listing.daily_rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostawayFetch;
