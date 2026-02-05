
// "use client";

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { sendToAI } from "../services/aiApi";

// export const sendMessage = createAsyncThunk(
//   "chat/sendMessage",
//   async (userText) => {
//     const reply = await sendToAI(userText);
//     return reply;
//   }
// );

// const initialState = {
//   messages: [{ id: 1, text: "Welcome to AI Chat!", type: "bot" }],
//   loading: false,
//   error: null,
// };

// const chatSlice = createSlice({
//   name: "chat",
//   initialState,
//   reducers: {
//     addUserMessage: (state, action) => {
//       state.messages.push({
//         id: Date.now(),
//         text: action.payload,
//         type: "user",
//       });
//     },
//     clearChat: (state) => {
//       state.messages = [];
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(sendMessage.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         state.loading = false;
//         state.messages.push({
//           id: Date.now(),
//           text: action.payload,
//           type: "bot",
//         });
//       })
//       .addCase(sendMessage.rejected, (state) => {
//         state.loading = false;
//         state.error = "Failed to get AI response";
//       });
//   },
// });

// export const { addUserMessage, clearChat } = chatSlice.actions;
// export default chatSlice.reducer;


"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendToAI } from "../services/aiApi";
import { saveChatMessages, loadFromLocal } from "../utils/helpers";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, text }) => {
    const reply = await sendToAI(text);
    return { chatId, reply };
  }
);

const initialState = {
  chats: loadFromLocal(), // array of chat sessions
  currentChatId: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.currentChatId = action.payload;
    },
    addUserMessage: (state, action) => {
      const { chatId, text } = action.payload;

      // find existing chat
      let chat = state.chats.find((c) => c.id === chatId);

      // if chat doesn't exist, create it
      if (!chat) {
        chat = { id: chatId, text, messages: [] };
        state.chats.push(chat);
        state.currentChatId = chatId; // ✅ set as current
      }

      chat.messages.push({ id: Date.now(), text, type: "user" });

      // save to localStorage
      saveChatMessages(chat.id, chat.messages);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { chatId, reply } = action.payload;
        state.loading = false;

        const chat = state.chats.find((c) => c.id === chatId);
        if (chat) {
          chat.messages.push({ id: Date.now(), text: reply, type: "bot" });
          saveChatMessages(chat.id, chat.messages);
        }
      })
      .addCase(sendMessage.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to get AI response";
      });
  },
});

export const { addUserMessage, selectChat } = chatSlice.actions;
export default chatSlice.reducer;


