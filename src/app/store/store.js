import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./useSlice";

import { loadStateFromLocalStorage, saveStateToLocalStorage } from "./localStorage";

// Load the initial state from session storage
const preloadedState = loadStateFromLocalStorage();

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	preloadedState, // Initialize the store with the preloaded state
});

// Subscribe to store updates to save the state to session storage
store.subscribe(() => {
	saveStateToLocalStorage(store.getState());
});

export default store;
