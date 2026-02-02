"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    { id: 1, text: "Welcome to AI Chat!", type: "bot" }
  ],
  loading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        type: "user",
      });
    },

    addBotMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        type: "bot",
      });
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    clearChat: (state) => {
      state.messages = [];
    },
  },
});

export const {
  addUserMessage,
  addBotMessage,
  setLoading,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
