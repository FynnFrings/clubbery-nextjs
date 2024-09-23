// lib/firebase.js
import { signInWithRedirect, signInWithPopup, GoogleAuthProvider, OAuthProvider, signInWithEmailAndPassword, signOut, getRedirectResult, createUserWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

// Function to handle Google Sign-In with Redirect
export const signInWithGoogle = async () => {
	return await signInWithRedirect(auth, googleProvider);
};

// Function to handle Apple Sign-In with Redirect
export const signInWithApple = async () => {
	appleProvider.addScope("email");
	appleProvider.addScope("name");

	return signInWithRedirect(auth, appleProvider);
};

// Function to handle Email and Password Sign-In
export const signInWithEmail = async (email, password) => {
	try {
		const response = await signInWithEmailAndPassword(auth, email, password);
		if (response) {
			return "success";
		}
	} catch (error) {
		console.log("Error during sign in with email:", error);
		return error.code;
	}
};

// Function to handle Email and Password Sign-Up
export const signUpWithEmail = async (email, password) => {
	try {
		const response = await createUserWithEmailAndPassword(auth, email, password);
		if (response) {
			return "success";
		}
	} catch (error) {
		console.log("Error during sign up:", error);
		return error.code;
	}
};

// Function to handle Sign-Out
export const userSignOut = async () => {
	try {
		return await signOut(auth);
	} catch (error) {
		console.log("Error during sign out:", error);
	}
};

// Function to handle the result after redirect sign-in
export const handleRedirectResult = async () => {
	try {
		const response = await getRedirectResult(auth);
		if (response === null) return null;

		if (response) {
			return "success";
		}
	} catch (error) {
		console.log("Error during redirect result:", error);
		return error.code;
	}
};

// Function to delete the current user's account
export const deleteUserAccount = async () => {
	try {
		const user = auth.currentUser;

		if (user) {
			await deleteUser(user);
			return "success";
		}
	} catch (error) {
		console.log("Error deleting user:", error);
		return error.code;
	}
};

// Function to change the current user's email
export const changeUserEmail = async (newEmail) => {
	try {
		const user = auth.currentUser;

		if (user) {
			await updateEmail(user, newEmail);
			return "success";
		}
	} catch (error) {
		console.log("Error updating email:", error);
		return error.code;
	}
};

export const reauthenticateUser = async (password) => {
	try {
		const user = auth.currentUser;
		const credential = EmailAuthProvider.credential(user.email, password);
		await reauthenticateWithCredential(user, credential);
		return "success";
	} catch (error) {
		console.log("Error reauthenricating user:", error);
		return error.code;
	}
};
