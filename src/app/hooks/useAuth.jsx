// hooks/useAuth.js
import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [status, setStatus] = useState("loading");

	const handleAuthStateChanged = useCallback((user) => {
		if (user) {
			setUser(user);
			setStatus("authenthicated");
		} else {
			setUser(null);
			setStatus("unauthenthicated");
		}
	}, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, [handleAuthStateChanged]);

	return { user, status };
};

export default useAuth;
