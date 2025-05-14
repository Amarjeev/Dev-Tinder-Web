import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import AlluserReducer from "./allusersSlice";

export const appStore = configureStore({
  reducer: {
    user: userReducer,
    allUser: AlluserReducer,
  },
});
