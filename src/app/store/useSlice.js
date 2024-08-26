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
		resetAuth: (state) => {
			state.user = null;
			state.provider = null;
		},
	},
});

export const { setUser, setAuthProvider, resetAuth } = authSlice.actions;

export default authSlice.reducer;
