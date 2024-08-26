export const loadStateFromSessionStorage = () => {
	try {
		const serializedState = sessionStorage.getItem("reduxState");
		if (serializedState === null) return undefined; // If no state found, return undefined
		return JSON.parse(serializedState); // Parse and return the state
	} catch (error) {
		console.error("Could not load state from session storage", error);
		return undefined;
	}
};

export const saveStateToSessionStorage = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		sessionStorage.setItem("reduxState", serializedState); // Save the state to session storage
	} catch (error) {
		console.error("Could not save state to session storage", error);
	}
};
