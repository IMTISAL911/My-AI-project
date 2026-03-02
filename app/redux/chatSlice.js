

// "use client";

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { sendToAI } from "../services/aiApi";
// import { db } from "../services/firebase";
// import { ref, set, get } from "firebase/database";

// // SEND MESSAGE
// export const sendMessage = createAsyncThunk(
//   "chat/sendMessage",
//   async ({ chatId, text, userId }) => {
//     let reply = "AI is not responding...";

//     try {
//       reply = await sendToAI(text);
//     } catch (e) {
//       console.error("AI error:", e);
//     }

//     const chatRef = ref(db, `chats/${userId}/${chatId}/messages`);
//     const snapshot = await get(chatRef);
//     const old = snapshot.exists() ? snapshot.val() : [];

//     const updated = [
//       ...old,
//       { id: Date.now(), text, type: "user" },
//       { id: Date.now() + 1, text: reply, type: "bot" },
//     ];

//     await set(chatRef, updated);

//     return { chatId, messages: updated };
//   }
// );

// // LOAD CHATS
// export const loadChats = createAsyncThunk(
//   "chat/loadChats",
//   async (userId) => {
//     const snap = await get(ref(db, `chats/${userId}`));
//     if (!snap.exists()) return [];

//     const data = snap.val();

//     return Object.keys(data).map((id) => ({
//       id,
//       messages: data[id].messages || [],
//     }));
//   }
// );

// const initialState = {
//   chats: [],
//   currentChatId: null,
//   loading: false,
//   error: null,
// };

// const chatSlice = createSlice({
//   name: "chat",
//   initialState,
//   reducers: {
//     selectChat: (s, a) => {
//       s.currentChatId = a.payload;
//     },
//   },
//   extraReducers: (b) => {
//     b
//       .addCase(sendMessage.pending, (s) => { s.loading = true; })
//       .addCase(sendMessage.fulfilled, (s, a) => {
//         s.loading = false;

//         const { chatId, messages } = a.payload;
//         const exist = s.chats.find((c) => c.id === chatId);

//         if (exist) exist.messages = messages;
//         else s.chats.push({ id: chatId, messages });

//         s.currentChatId = chatId;
//       })
//       .addCase(sendMessage.rejected, (s) => {
//         s.loading = false;
//         s.error = "AI failed";
//       })

//       .addCase(loadChats.fulfilled, (s, a) => {
//         s.chats = a.payload || [];
//       });
//   },
// });

// export const { selectChat } = chatSlice.actions;
// export default chatSlice.reducer;


"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendToAI } from "../services/aiApi";
import { db } from "../services/firebase";
import { ref, set, get } from "firebase/database";

/* ================= SEND MESSAGE ================= */

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, text, userId }, { dispatch, getState }) => {
    try {
      // 🔹 STEP 1 — get current messages
      const state = getState();
      const chat = state.chat.chats.find((c) => c.id === chatId);
      const oldMessages = chat?.messages || [];

      // 🔹 STEP 2 — create user message immediately
      const userMessage = {
        id: Date.now(),
        text,
        type: "user",
      };

      const updatedWithUser = [...oldMessages, userMessage];

      // 🔹 STEP 3 — save user message instantly
      dispatch(
        chatSlice.actions.updateMessages({
          chatId,
          messages: updatedWithUser,
        })
      );

      // 🔹 STEP 4 — call AI
      let reply = "AI is not responding...";

      try {
        reply = await sendToAI(text);
      } catch (e) {
        console.error("AI error:", e);
      }

      // 🔹 STEP 5 — add bot message
      const botMessage = {
        id: Date.now() + 1,
        text: reply,
        type: "bot",
      };

      const finalMessages = [...updatedWithUser, botMessage];

      // 🔹 STEP 6 — save to firebase
      const chatRef = ref(db, `chats/${userId}/${chatId}/messages`);
      await set(chatRef, finalMessages);

      return { chatId, messages: finalMessages };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

/* ================= LOAD CHATS ================= */

export const loadChats = createAsyncThunk(
  "chat/loadChats",
  async (userId) => {
    const snap = await get(ref(db, `chats/${userId}`));
    if (!snap.exists()) return [];

    const data = snap.val();

    return Object.keys(data).map((id) => ({
      id,
      messages: data[id].messages || [],
    }));
  }
);

/* ================= SLICE ================= */

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
    selectChat: (s, a) => {
      s.currentChatId = a.payload;
    },

    // ✅ NEW — instant UI update
    updateMessages: (s, a) => {
      const { chatId, messages } = a.payload;
      const exist = s.chats.find((c) => c.id === chatId);

      if (exist) exist.messages = messages;
      else s.chats.push({ id: chatId, messages });

      s.currentChatId = chatId;
    },
  },
  extraReducers: (b) => {
    b
      .addCase(sendMessage.pending, (s) => {
        s.loading = true;
      })
      .addCase(sendMessage.fulfilled, (s, a) => {
        s.loading = false;

        const { chatId, messages } = a.payload;
        const exist = s.chats.find((c) => c.id === chatId);

        if (exist) exist.messages = messages;
        else s.chats.push({ id: chatId, messages });

        s.currentChatId = chatId;
      })
      .addCase(sendMessage.rejected, (s) => {
        s.loading = false;
        s.error = "AI failed";
      })
      .addCase(loadChats.fulfilled, (s, a) => {
        s.chats = a.payload || [];
      });
  },
});

export const { selectChat, updateMessages } = chatSlice.actions;
export default chatSlice.reducer;