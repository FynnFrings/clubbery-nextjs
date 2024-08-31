import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";

// Function to save event UID to the user's "favouriteEvents" array
export const saveEventToUserFavorites = async (eventUID, user) => {
	try {
		if (!user) {
			throw new Error("User not authenticated");
		}

		const userUID = user.uid;
		const userDocRef = doc(db, process.env.NEXT_PUBLIC_USER_DATABASE_NAME, userUID);

		// Check if the user document exists
		const userDoc = await getDoc(userDocRef);

		if (userDoc.exists()) {
			// If the user exists, add the event UID to the "favouriteEvents" array
			await updateDoc(userDocRef, {
				[process.env.NEXT_PUBLIC_USER_DATABASE_EVENTS_NAME]: arrayUnion(eventUID),
			});
		} else {
			// If the user doesn't exist, create a new user document and save the event UID
			const createdAt = new Date();

			await setDoc(userDocRef, {
				uid: userUID,
				email: user.email,
				displayName: user.displayName || "",
				[process.env.NEXT_PUBLIC_USER_DATABASE_EVENTS_NAME]: [eventUID],
				createdAt: createdAt, // Add the createdAt field
			});
		}

		return "success";
	} catch (error) {
		console.error("Error saving event to favorites:", error);
		return error.message;
	}
};

// Function to delete an event UID from the user's "favouriteEvents" array
export const deleteEventFromUserFavorites = async (eventUID, user) => {
	try {
		if (!user) {
			throw new Error("User not authenticated");
		}

		const userUID = user.uid;
		const userDocRef = doc(db, process.env.NEXT_PUBLIC_USER_DATABASE_NAME, userUID);

		// Check if the user document exists
		const userDoc = await getDoc(userDocRef);

		if (userDoc.exists()) {
			// If the user exists, remove the event UID from the "favouriteEvents" array
			await updateDoc(userDocRef, {
				[process.env.NEXT_PUBLIC_USER_DATABASE_EVENTS_NAME]: arrayRemove(eventUID),
			});
			return "success";
		} else {
			// If the user document doesn't exist, there's nothing to remove
			return "no_user";
		}
	} catch (error) {
		console.error("Error deleting event from favorites:", error);
		return error.message;
	}
};

// Function to delete a user from the "users" document
export const deleteUserFromDatabase = async (user) => {
	try {
		if (!user) {
			throw new Error("User not authenticated");
		}

		const userUID = user.uid;
		const userDocRef = doc(db, process.env.NEXT_PUBLIC_USER_DATABASE_NAME, userUID);

		// Check if the user document exists
		const userDoc = await getDoc(userDocRef);

		if (userDoc.exists()) {
			// If the user exists, delete the user document
			await deleteDoc(userDocRef);
			return "success";
		} else {
			// If the user does not exist, do nothing
			console.log("User does not exist in the database, nothing to delete.");
			return "no_user";
		}
	} catch (error) {
		console.error("Error deleting user from database:", error);
		return error.message;
	}
};

// Function to get a user from the "users" document
export const getUserFromDatabase = async (userUID) => {
	try {
		const userDocRef = doc(db, process.env.NEXT_PUBLIC_USER_DATABASE_NAME, userUID);
		const userDoc = await getDoc(userDocRef);

		if (userDoc.exists()) {
			// Return the user data if it exists
			return userDoc.data();
		} else {
			console.log("User does not exist in the database.");
			return null;
		}
	} catch (error) {
		console.error("Error getting user from database:", error);
		return null;
	}
};
