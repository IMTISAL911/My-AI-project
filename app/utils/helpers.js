// // Save sessions/messages to localStorage
// export const saveToLocal = (messages) => {
//   try {
//     localStorage.setItem("chat_history", JSON.stringify(messages));
//   } catch (err) {
//     console.error("Failed to save chat to localStorage", err);
//   }
// };

// // Load sessions/messages from localStorage
// export const loadFromLocal = () => {
//   try {
//     const data = localStorage.getItem("chat_history");
//     return data ? JSON.parse(data) : [];
//   } catch (err) {
//     console.error("Failed to load chat from localStorage", err);
//     return [];
//   }
// };



// utils/helpers.js

// Load all chats from localStorage
export const saveChatMessages = (chatId, messages) => {
  try {
    const allChats = JSON.parse(localStorage.getItem("chat_history") || "[]");
    const index = allChats.findIndex((c) => c.id === chatId);
    if (index >= 0) {
      allChats[index].messages = messages;
    } else {
      allChats.push({ id: chatId, text: messages[0]?.text || "New Chat", messages });
    }
    localStorage.setItem("chat_history", JSON.stringify(allChats));
  } catch (err) {
    console.error("Failed to save chat:", err);
  }
};

export const loadFromLocal = () => {
  try {
    return JSON.parse(localStorage.getItem("chat_history") || "[]");
  } catch {
    return [];
  }
};
