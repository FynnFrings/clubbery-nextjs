export const loadStateFromLocalStorage = () => {
	try {
		if (typeof window !== "object") return;
		const serializedState = localStorage.getItem("reduxState");
		if (serializedState === null) return undefined; // If no state found, return undefined
		return JSON.parse(serializedState); // Parse and return the state
	} catch (error) {
		console.error("Could not load state from session storage", error);
		return undefined;
	}
};

export const saveStateToLocalStorage = (state) => {
	try {
		if (typeof window !== "object") return;
		const serializedState = JSON.stringify(state);
		localStorage.setItem("reduxState", serializedState); // Save the state to session storage
	} catch (error) {
		console.error("Could not save state to session storage", error);
	}
};
