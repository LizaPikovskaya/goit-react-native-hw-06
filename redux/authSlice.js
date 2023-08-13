import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

const authInitialState = {
  user: { email: "", password: "" },
};
export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    createUser(state, { payload }) {
      state.user.email = payload.email;
      state.user.password = payload.password;
    },
    logIn(state, { payload }) {
      state.user = payload;
    },
    logOut(state) {
      state.user = { email: "", password: "" };
    },
  },
});

export const { createUser, logIn, logOut, refreshUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
