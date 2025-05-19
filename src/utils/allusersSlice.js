// Import the createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Create a slice for managing all users
const allusersSlice = createSlice({
  // Name of the slice
  name: "allUsers",

  // Initial state of the slice (no users by default)
  initialState: null,

  // Reducers define how the state can be updated
  reducers: {
    // Replace the entire state with a new list of users
    addAlluser: (state, action) => {
      return action.payload; // Payload should be an array of user objects
    },
  },
});

// Export the action creator
export const { addAlluser } = allusersSlice.actions;

// Export the reducer to be included in the store
export default allusersSlice.reducer;
