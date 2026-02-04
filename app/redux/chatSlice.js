
"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendToAI } from "../services/aiApi";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (userText) => {
    const reply = await sendToAI(userText);
    return reply;
  }
);

const initialState = {
  messages: [{ id: 1, text: "Welcome to AI Chat!", type: "bot" }],
  loading: false,
  error: null,
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
    clearChat: (state) => {
      state.messages = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          id: Date.now(),
          text: action.payload,
          type: "bot",
        });
      })
      .addCase(sendMessage.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to get AI response";
      });
  },
});

export const { addUserMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
