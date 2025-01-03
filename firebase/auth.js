
// implement the auth.js file which contains all the functions for authentication

import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";
import {auth} from "./firebase";
import { db } from "./firebase";

import { collection, setDoc, addDoc, doc, serverTimestamp, Timestamp, getFirestore, getDoc } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { redirect } from "next/navigation";


// create a new user with email.password
export const doCreateUserWithEmailAndPassword = async (userData) => {


    // Calculate the date 14 days from today
    const currentDate = new Date();
    const futureDate = new Date(currentDate); // Create a copy of the current date
    futureDate.setDate(futureDate.getDate() + 7); // Add 7 days



    // console.log(user.uid);
    try {

        // console.log(userData);
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        console.log(userCredential);
        const user = userCredential.user;

        // Add extra input registery fields to the Firestore storage area (db)
        // set doc allows to add users with our user.uid
        const userRef = doc(db, "registeredUsers", user.uid); // Specify the document path
        await setDoc(userRef, {
            ...userData,
        email: user.email,
        businessName: userData.businessName,
        businessType: userData.businessType,
        fullName: userData.fullName,
        listingCount: userData.listingCount,
        createdAt: serverTimestamp(),
        plan: 'trial',
        subscriptionDate: Timestamp.fromDate(new Date()),
        paymentDate: Timestamp.fromDate(futureDate),
        status: "active",
    });
        console.log("Document written with ID: ",);
        return {userCredential:userCredential};

    } catch (e) {
        console.error("Error adding document: ", e);
        return {error: e};
    }

}

// sign in the user with email/password
export const doSignInWithEmailAndPassword = async (email, password) => {

    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user); // Should return a valid user object
    
    const db = getFirestore();
    const userRef = doc(db, "registeredUsers", userCredential.user.uid);
    const userDoc = await getDoc(userRef);
    const {status} = userDoc.data();

    if (status === "active") {
        return "active";
    } else if (status === "not-active") {
        return "not-active";
    } else {
        return "not-exist"
    }

}


// sign in a google user 
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    // a popup will open where we will select the google account to login with
    const result = await signInWithPopup(auth, provider);

    // save user's information into firestore
    console.log(result.user);

    // Calculate the date 14 days from today
    const currentDate = new Date();
    const futureDate = new Date(currentDate); // Create a copy of the current date
    futureDate.setDate(futureDate.getDate() + 14); // Add 14 days

    try {




        // Add extra input registery fields to the Firestore storage area (db)
        // set doc allows to add users with our user.uid
        const userRef = doc(db, "registeredUsers", result.user.uid); // Specify the document path
        
        // if user does exist
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
        // console.log("User exists:", userDoc.data());
        console.log("User already exist");
        return; // User exists
        }
        
        // if not continue
        await setDoc(userRef, {
        email: result.user.email,
        businessName: "",
        businessType: "",
        fullName: result.user.displayName,
        listingCount: "",
        createdAt: serverTimestamp(),
        plan: 'trial',
        subscriptionDate: Timestamp.fromDate(new Date()),
        paymentDate: Timestamp.fromDate(futureDate),
        status: "active",
    });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }


    return result;
}


// sign-out
export const doSignOut = () => {
    auth.signOut();
    redirect("/");
}


// password change
export const doPasswordReset = (emai) => {
    return sendPasswordResetEmail(auth,email);
}

// password reset
export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
}

// email verification
export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    })
}