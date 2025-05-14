import { createSlice } from "@reduxjs/toolkit";

const allusersSlice = createSlice({
  name: "allUsers",
  initialState: null,
  reducers: {
    addAlluser: (state, action) => {
      return action.payload;
    },
  },
});

export const { addAlluser } = allusersSlice.actions;
export default allusersSlice.reducer;
