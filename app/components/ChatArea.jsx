


// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import { sendMessage, selectChat, loadChats } from "../redux/chatSlice";
// import ChatInput from "./ChatInput";
// import MessageBubble from "./messageBubble";
// import { useRef, useEffect } from "react";
// // import { loadChats,sendMessage,selectChat } from "../redux/chatSlice";


// export default function ChatArea() {
//   const dispatch = useDispatch();
//   const { chats, currentChatId, loading } = useSelector((state) => state.chat);
//   const user = useSelector((state) => state.auth.user);

//   const chat = chats.find((c) => c.id === currentChatId);
//   const messages = chat?.messages || [];

//   useEffect(() => {
//     if (user) dispatch(loadChats(user.uid));
//   }, [user]);

//   const scrollRef = useRef(null);
//   useEffect(() => {
//     if (scrollRef.current)
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//   }, [messages, loading]);

 
//   const handleSendMessage = async (msg) => {
//   if (!user) return;

//   let chatId = currentChatId;

//   if (!chatId) {
//     chatId = Date.now();
//     dispatch(selectChat(chatId));
//   }

//   // ✅ add USER message first
//   dispatch(
//     sendMessage({
//       chatId,
//       text: msg,
//       userId: user.uid,
//       type: "user",
//     })
//   );

//   // ✅ add THINKING bubble
//   dispatch(
//     sendMessage({
//       chatId,
//       text: "",
//       userId: user.uid,
//       type: "thinking",
//       id: "thinking-" + Date.now(),
//     })
//   );

//   // ✅ call AI AFTER UI updates
//   dispatch(fetchAIResponse({ chatId, message: msg, userId: user.uid }));
// };

//   const isEmpty = messages.length === 0;

//   return (
//     <div className="flex flex-col h-full flex-1">
//       <div
//         ref={scrollRef}
//         className={`flex-1 p-4 overflow-y-auto ${
//           isEmpty ? "flex items-center justify-center" : "flex flex-col"
//         }`}
//       >
//         {isEmpty ? (
//           <div className="text-white text-center">Type a message to start...</div>
//         ) : (
//           <>
//             {messages.map((m) => (
//               <MessageBubble key={m.id} message={m} />
//             ))}
//             {loading && <MessageBubble message={{ type: "thinking" }} />}
//           </>
//         )}
//       </div>
//       <div className="p-4 bg-gray-800">
//         <ChatInput onSend={handleSendMessage} disabled={loading} />
//       </div>
//     </div>
//   );
// }



"use client";

import { useDispatch, useSelector } from "react-redux";
import { sendMessage, selectChat, loadChats } from "../redux/chatSlice";
import ChatInput from "./ChatInput";
import MessageBubble from "./messageBubble";
import { useRef, useEffect } from "react";

export default function ChatArea() {
  const dispatch = useDispatch();
  const { chats, currentChatId, loading } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.auth.user);

  const chat = chats.find((c) => c.id === currentChatId);
  const messages = chat?.messages || [];

  useEffect(() => {
    if (user) dispatch(loadChats(user.uid));
  }, [user]);

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSendMessage = async (msg) => {
    if (!user) return;

    let chatId = currentChatId;
    if (!chatId) {
      chatId = Date.now();
      dispatch(selectChat(chatId));
    }

    // 1️⃣ Add user message first
    dispatch(
      sendMessage({
        chatId,
        text: msg,
        userId: user.uid,
        type: "user",
      })
    );
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full flex-1">
      <div
        ref={scrollRef}
        className={`flex-1 p-4 overflow-y-auto ${
          isEmpty ? "flex items-center justify-center" : "flex flex-col"
        }`}
      >
        {isEmpty ? (
          <div className="text-white text-center">Type a message to start...</div>
        ) : (
          messages.map((m) => <MessageBubble key={m.id} message={m} />)
        )}
      </div>
      <ChatInput onSend={handleSendMessage} disabled={loading} />
    </div>
  );
}