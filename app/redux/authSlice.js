// "use client";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: typeof window !== "undefined" ? localStorage.getItem("user") || "" : "",
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user", action.payload);
//     },
//     logout: (state) => {
//       state.user = "";
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;



// src/redux/authSlice.js
"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Signup thunk
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Logout thunk
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
  return null;
});

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => { state.loading = true; })
      .addCase(signupUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.error = null; })
      .addCase(signupUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.error = null; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(logoutUser.fulfilled, (state) => { state.user = null; });
  },
});

export default authSlice.reducer;
