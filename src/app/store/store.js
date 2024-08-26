import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./useSlice";

import { loadStateFromSessionStorage, saveStateToSessionStorage } from "./sessionStorage";

// Load the initial state from session storage
const preloadedState = loadStateFromSessionStorage();

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	preloadedState, // Initialize the store with the preloaded state
});

// Subscribe to store updates to save the state to session storage
store.subscribe(() => {
	saveStateToSessionStorage(store.getState());
});

export default store;
