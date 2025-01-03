"use client"
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
// import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {getCustomerData} from "./Hooks/getData";
import { setCustomerData } from "./Hooks/setData";
import { redirect } from "next/navigation";

export default function ApiIntegrationBox () {

  const [state, setState] = useState({
    type: "", // Tracks the active button ("PMS" or "OTA")
    name: "", // Tracks the selected dropdown option ("Hostaway" or "TestAPI")
    accountId: "",
    apiKey: "",
  });



  const handleButtonClick = (button: string) => {
    setState((prev) => ({
      ...prev,
      type: button,
      name: "", // Reset dropdown selection when switching buttons
      accountId: "",
      apiKey: "",
    }));
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setState((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConnect = async () => {
    console.log("Saved Data:", state);

    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    // get the customer's stripe id by their uid present in the web-app's Auth context
    // to be used by Stripe API to charge and add subscription.
    

    const updatedData = await setCustomerData("registeredUsers", {provider: state});
    // console.log(updatedData.businessName);

    if (updatedData.updatedData === null) {
      redirect("/login");
    } else {
      redirect("/dashboard");
    }

  };

  const handleCancel = () => {
    setState({
      type: "",
      name: "",
      accountId: "",
      apiKey: "",
    });
  };



  useEffect(() => {

    async function getCustomerData_check() {
      const customerData = await getCustomerData("registeredUsers");
      // console.log(customerData); 
      if (customerData.updatedData === null) {
        redirect("/login");
      }
    }


    getCustomerData_check();
  }, []);

  return (
    <div className="text-white mx-2 md:mx-auto p-6 w-full max-w-[500px] bg-white/5 border border-white/10 rounded-lg shadow-lg backdrop-blur-md">
      
      <h2 className="text-white text-2xl font-semibold mb-4">Add/Reconnect Listings</h2> 
      <p className="text-white/80 text-sm pb-4 border-b border-white/10">Connect your listings to our platform to start receiving reviews and insights.</p>
      
      <div className="flex flex-row flex-wrap gap-2 w-full mt-8">
        <p className="text-white text-sm">What would you like to connect to?</p>

        {/* Buttons */}
        <div className=" w-full flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-lg w-full text-white border bg-white/10 border-white/10 hover:bg-primary/90 hover:text-black ${
              state.type === "PMS"
                ? "bg-primary/90 text-black"
                : " bg-white/10"
            }`}
            onClick={() => handleButtonClick("PMS")}
          >
            PMS
          </button>
          <button
            className={`px-4 py-2 rounded-lg w-full text-white border bg-white/10 border-white/10 hover:bg-primary/90 hover:text-black ${
              state.type === "OTA"
                ? "bg-primary/90 text-black"
                : " bg-white/10"
            }`}
            onClick={() => handleButtonClick("OTA")}
          >
            OTA
          </button>
        </div>

      </div>

      {/* Dropdown */}
      {state.type === "PMS" && (
        <div className="mb-4">
          <label
            htmlFor="pms-select"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Select an option
          </label>
          <select
            id="pms-select"
            value={state.name}
            onChange={handleDropdownChange}
            className="w-full px-4 py-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select --</option>
            <option value="Hostaway">Hostaway</option>
            {/* <option value="TestAPI">TestAPI</option> */}
          </select>
        </div>
      )}

      {state.type === "OTA" && (
        <div className="mb-4">
          <label
            htmlFor="ota-select"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Select an option
          </label>
          <select
            id="ota-select"
            value={state.name}
            onChange={handleDropdownChange}
            className="w-full px-4 py-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select --</option>
          </select>
        </div>
      )}

      {/* Inputs */}
      {state.name && (
        <div>
          <div className="mb-4">
            <label
              htmlFor="accountId"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Account ID
            </label>
            <input
              id="accountId"
              name="accountId"
              type="text"
              value={state.accountId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Account ID"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="apiKey"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              API Key
            </label>
            <input
              id="apiKey"
              name="apiKey"
              type="text"
              value={state.apiKey}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter API Key"
            />
          </div>
          <div className="w-full border border-white/10 rounded-lg h-[100px] mb-8 p-4 flex flex-wrap items-center justify-start">
            <p className="text-white/80 text-sm">Use your Hostaway Account ID and API key to fetch your properties and reviews.</p>
            <a href="https://dashboard.hostaway.com/settings/hostaway-api" className="cursor-pointer text-primary/80 text-sm">https://dashboard.hostaway.com/settings/hostaway-api</a>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-white/10 border border-white/10 text-gray-300 rounded-lg hover:bg-white/30"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-primary/90 text-black hover:bg-primary/80 rounded-lg hover:text-white"
          onClick={handleConnect}
          disabled={
            !state.type ||
            (state.type === "PMS" && !state.name) ||
            !state.accountId ||
            !state.apiKey
          }
        >
          Connect
        </button>
      </div>
    </div>
  );
};

