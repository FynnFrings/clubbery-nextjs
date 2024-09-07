import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	provider: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setAuthProvider: (state, action) => {
			state.provider = action.payload;
		},
		setSavedTickets: (state, action) => {
			state.savedTickets = action.payload;
		},
		resetAuth: (state) => {
			state.user = null;
			state.provider = null;
			state.savedTickets = {};
		},
	},
});

export const { setUser, setAuthProvider, resetAuth, setSavedTickets } = authSlice.actions;

export default authSlice.reducer;
