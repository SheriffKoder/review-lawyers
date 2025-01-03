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
      console.log(customerData); 
      if (customerData.updatedData === null) {
        redirect("/login");
      }
    }


    getCustomerData_check();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900/75 rounded-lg shadow-lg backdrop-blur-md">
      {/* Buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            state.type === "PMS"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => handleButtonClick("PMS")}
        >
          PMS
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            state.type === "OTA"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => handleButtonClick("OTA")}
        >
          OTA
        </button>
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
            <option value="TestAPI">TestAPI</option>
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
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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

