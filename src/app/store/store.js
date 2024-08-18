import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./useSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

export default store;
