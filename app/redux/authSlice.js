
"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// restore session
export const listenAuth = createAsyncThunk("auth/listen", async () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({ uid: user.uid, email: user.email });
      } else {
        resolve(null);
      }
    });
  });
});

export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return { uid: res.user.uid, email: res.user.email };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return { uid: res.user.uid, email: res.user.email };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  return null;
});

const slice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(listenAuth.fulfilled, (s, a) => {
        s.user = a.payload;
      })

      .addCase(signupUser.pending, (s) => { s.loading = true; })
      .addCase(signupUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
        s.error = null;
      })
      .addCase(signupUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(loginUser.pending, (s) => { s.loading = true; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
        s.error = null;
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(logoutUser.fulfilled, (s) => {
        s.user = null;
      });
  },
});

export default slice.reducer;
