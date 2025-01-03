import React, { useState } from "react";

interface Listing {
  address: string;
  [key: string]: any;
}

interface ListingsDropdownProps {
  listings: Listing[];
  tempListings: Listing[];
  listings_temp_switch: (listings: Listing[]) => void;
  onClose?: (selectedListings: Listing[]) => void;
}

const MultiSelectDropdown = ({ listings, tempListings, listings_temp_switch }: ListingsDropdownProps) => {
  if (!Array.isArray(listings)) {
    throw new Error("The 'listings' prop must be an array.");
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selectedListings, setSelectedListings] = useState<Listing[]>([]);

  const handleToggle = (listing: Listing) => {
    if (selectedListings.includes(listing)) {
      // Remove listing from selected
      setSelectedListings(
        selectedListings.filter((item) => item !== listing)
      );
    } else {
      // Add listing to selected
      setSelectedListings([...selectedListings, listing]);
    }

    listings_temp_switch(selectedListings);
  };

  const clearListings = () => {
    setSelectedListings([]);
    listings_temp_switch(listings);
  }

//   const handleClose = () => {
//     if (onClose && typeof onClose === "function") {
//       handleToggle(selectedListings); // Pass selected listings to the handler
//     }
//     setIsOpen(false); // Close the dropdown
//   };

  return (
    <div className="relative inline-block w-full mb-[2rem]
    group rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300">

        <div className="flex items-center justify-center flex-row text-white rounded-md w-full">
            
            <button
            className=" text-left rounded-lg px-4 py-4 mr-auto w-full text-gray-400 font-medium text-base"
            onClick={() => setIsOpen(!isOpen)}
            >
                 Choose Listings -- {tempListings.length} / {listings.length} listings selected
            </button>

            {
                isOpen && (
                    <>
                    <button
                    className="bg-primary text-black px-4 py-2 rounded-md mr-2 hover:text-white hover:bg-primary/90"
                    onClick={() => setIsOpen(false)}
                    >
                    Close
                    </button>

                    <button
                    className="bg-primary text-black px-4 py-2 rounded-md mr-2 hover:text-white hover:bg-primary/90 "
                    onClick={clearListings}
                    >
                        Clear
                    </button>
                    </>
                )
            }

        </div>

      {isOpen && (
        <div className="absolute mt-2 w-full  text-white h-[20rem] overflow-y-scroll z-10
        rounded-xl border transition-all duration-300 hover:shadow-lg bg-black/80 backdrop-blur-sm border-white/10 shadow-[0px_4px_6px_rgba(0,0,0,0.1)]">
          <div className="p-2">
            {listings.length > 0 && listings.map((listing, index) => (
              <div
                key={index}
                className={`flex items-center px-4 py-2 hover:bg-primary hover:text-black cursor-pointer accent-primary
                     ${
                  selectedListings.includes(listing) ? "bg-primary text-black" : ""
                }`}
                onClick={() => handleToggle(listing)}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedListings.includes(listing)}
                  readOnly
                />
                {listing.address}
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
