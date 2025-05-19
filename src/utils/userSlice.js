// Import createSlice to define a Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Create a slice for the logged-in user
const userSlice = createSlice({
  name: 'user',            // Name of the slice
  initialState: null,      // Initial state is null, meaning no user is logged in
  reducers: {
    // Action to add/set the user data in the store
    addUser: (state, action) => {
      return action.payload;  // Set state to the new user data from action payload
    },
    
    // Action to remove the user data from the store (e.g., on logout)
    removeUser: (state, action) => {
      return null;  // Reset state to null
    },
  },
});

// Export the action creators
export const { addUser, removeUser } = userSlice.actions;

// Export the reducer function to be used in the store
export default userSlice.reducer;
