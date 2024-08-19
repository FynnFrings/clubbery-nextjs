// lib/firebase.js
import { signInWithRedirect, GoogleAuthProvider, OAuthProvider, signInWithEmailAndPassword, signOut, getRedirectResult, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");
// Function to handle Google Sign-In with Redirect
export const signInWithGoogle = async () => {
	return await signInWithRedirect(auth, googleProvider);
};

// Function to handle Apple Sign-In with Redirect
export const signInWithApple = () => {
	return signInWithRedirect(auth, appleProvider);
};

// Function to handle Email and Password Sign-In
export const signInWithEmail = async (email, password) => {
	try {
		const response = await signInWithEmailAndPassword(auth, email, password);
		return response;
	} catch (error) {
		console.log(error);
	}
};

// Function to handle Email and Password Sign-Up
export const signUpWithEmail = async (email, password) => {
	try {
		const response = await createUserWithEmailAndPassword(auth, email, password);
		return response;
	} catch (error) {
		console.log(error);
	}
};

// Function to handle Sign-Out
export const userSignOut = () => {
	return signOut(auth);
};

// Function to handle the result after redirect sign-in
export const handleRedirectResult = async () => {
	try {
		const result = await getRedirectResult(auth);
		console.log("🚀 ~ handleRedirectResult ~ result:", result);
		if (result) {
			// User signed in successfully
			return result.user;
		}
	} catch (error) {
		console.error("Error during redirect result:", error);
	}
};
