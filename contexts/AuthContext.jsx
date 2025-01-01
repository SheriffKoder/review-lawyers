"use client"
// Purpose : create a useAuth hook to manage the centralized state for the authentication
/*
auth context, encapsulate all the children
createAuth hook to be used in different components
to get to know about the different authentication states
and related parameters


*/
// import React from "react";
import { useState } from "react";
import { auth } from "../firebase/firebase"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext(); //1


// at the end, export the useAuthHook // 3
export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider ({children}) {

    // state for the user, stores user's information on login
    const [user, setUser] = useState(null);

    // the user is loggedin ?
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    // loading state of the auth hook
    // default true, means code is trying to know what is the current auth state of the user
    const [loading, setLoading] = useState(true);

    // subscribe to the auth state change event
    // if user logging in/out, subscribe to these event changes by listening to them
    // initializeUser -- function handles user information
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);

        // the unsubscribe can also be used for cleanup
        return unsubscribe
    },[]);


    // when the user is logged in, it will be passed as an argument
    async function initializeUser(user) {

        if (user) {
            // spread out the user's property into a new argument
            // so we are not leaving behind any refrerences to the original object
            setUser({...user});
            
            setUserLoggedIn(true);
          
        } else {
            // if user has logged out, then we will not receive a valid user object
            setUser(null);
            setUserLoggedIn(false);
        }

        setLoading(false);  
    }

    // expose the new value object
    const value = {
        user,
        userLoggedIn,
        loading,
    }

    // return the auth context provider
    // 2
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}