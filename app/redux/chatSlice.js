


// "use client";

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { sendToAI } from "../services/aiApi";
// import { saveChatMessages, loadFromLocal } from "../utils/helpers";

// export const sendMessage = createAsyncThunk(
//   "chat/sendMessage",
//   async ({ chatId, text }) => {
//     const reply = await sendToAI(text);
//     return { chatId, reply };
//   }
// );

// const initialState = {
//   chats: loadFromLocal(), // array of chat sessions
//   currentChatId: null,
//   loading: false,
//   error: null,
// };

// const chatSlice = createSlice({
//   name: "chat",
//   initialState,
//   reducers: {
//     selectChat: (state, action) => {
//       state.currentChatId = action.payload;
//     },
//     addUserMessage: (state, action) => {
//       const { chatId, text } = action.payload;

//       // find existing chat
//       let chat = state.chats.find((c) => c.id === chatId);

//       // if chat doesn't exist, create it
//       if (!chat) {
//         chat = { id: chatId, text, messages: [] };
//         state.chats.push(chat);
//         state.currentChatId = chatId; // ✅ set as current
//       }

//       chat.messages.push({ id: Date.now(), text, type: "user" });

//       // save to localStorage
//       saveChatMessages(chat.id, chat.messages);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(sendMessage.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         const { chatId, reply } = action.payload;
//         state.loading = false;

//         const chat = state.chats.find((c) => c.id === chatId);
//         if (chat) {
//           chat.messages.push({ id: Date.now(), text: reply, type: "bot" });
//           saveChatMessages(chat.id, chat.messages);
//         }
//       })
//       .addCase(sendMessage.rejected, (state) => {
//         state.loading = false;
//         state.error = "Failed to get AI response";
//       });
//   },
// });

// export const { addUserMessage, selectChat } = chatSlice.actions;
// export default chatSlice.reducer;





"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendToAI } from "../services/aiApi";
import { db } from "../services/firebase";
import { ref, set, get, child, push } from "firebase/database";

// Send AI message thunk
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, text, userId }) => {
    const reply = await sendToAI(text);

    const chatRef = ref(db, `chats/${userId}/${chatId}/messages`);
    const snapshot = await get(chatRef);
    const messages = snapshot.exists() ? snapshot.val() : [];
    const updatedMessages = [
      ...messages,
      { id: Date.now(), text, type: "user" },
      { id: Date.now() + 1, text: reply, type: "bot" },
    ];

    await set(chatRef, updatedMessages);

    return { chatId, messages: updatedMessages };
  }
);

// Load chats for user
export const loadChats = createAsyncThunk(
  "chat/loadChats",
  async (userId) => {
    const snapshot = await get(ref(db, `chats/${userId}`));
    if (snapshot.exists()) return snapshot.val();
    return [];
  }
);

const initialState = {
  chats: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => { state.loading = true; })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const { chatId, messages } = action.payload;
        const existing = state.chats.find((c) => c.id === chatId);
        if (existing) existing.messages = messages;
        else state.chats.push({ id: chatId, messages });
      })
      .addCase(sendMessage.rejected, (state) => { state.loading = false; state.error = "Failed to get AI response"; })
      .addCase(loadChats.fulfilled, (state, action) => {
        state.chats = action.payload ? Object.values(action.payload) : [];
      });
  },
});

export const { selectChat } = chatSlice.actions;
export default chatSlice.reducer;
