// Import the function to configure the Redux store
import { configureStore } from "@reduxjs/toolkit";

// Import the individual slice reducers
import userReducer from "./userSlice";           // Handles current logged-in user
import AlluserReducer from "./allusersSlice";    // Handles all users (e.g., for admin views or matchmaking)

// Create and export the Redux store
export const appStore = configureStore({
  // Combine all slice reducers here
  reducer: {
    user: userReducer,        // State slice for logged-in user data
    allUser: AlluserReducer,  // State slice for all users data
  },
});
