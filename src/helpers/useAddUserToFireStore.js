import { useSession } from "next-auth/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const useAddUserToFirestore = async () => {
	const { data: session } = useSession();

	if (session?.user) {
		const user = session.user;
		const userRef = doc(db, "users", user.email); // Using the user's email as the document ID

		try {
			const userDoc = await getDoc(userRef);

			if (!userDoc.exists()) {
				// If the user does not exist, add them to Firestore
				await setDoc(userRef, {
					name: user.name,
					email: user.email,
					image: user.image,
					provider: "google", // or 'nextauth' depending on your setup
					createdAt: new Date(),
				});
				console.log("User added to Firestore");
			} else {
				console.log("User already exists in Firestore");
			}
		} catch (error) {
			console.error("Error adding user to Firestore:", error);
		}
	}
};

export default useAddUserToFirestore;
