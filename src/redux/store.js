import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./user.slice.js";
import userSlice from "./user.slice.js";
import ownerSlice from "./ownerSlice.js";

export const store = configureStore({
  reducer: {
    user: userSlice,
    owner: ownerSlice,
  },
});
