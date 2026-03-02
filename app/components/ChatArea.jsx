

"use client";

import { useDispatch, useSelector } from "react-redux";
import { sendMessage, selectChat, loadChats } from "../redux/chatSlice";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { useRef, useEffect } from "react";

export default function ChatArea() {
  const dispatch = useDispatch();
  const { chats, currentChatId, loading } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.auth.user);

  const chat = chats.find((c) => c.id === currentChatId);
  const messages = chat?.messages || [];

  useEffect(() => {
    if (user) dispatch(loadChats(user.uid));
  }, [user, dispatch]);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // ✅ FIXED — single clean flow
  const handleSendMessage = (msg) => {
    if (!user) return;

    let chatId = currentChatId;

    if (!chatId) {
      chatId = Date.now();
      dispatch(selectChat(chatId));
    }

    // ✅ ONLY ONE DISPATCH
    dispatch(
      sendMessage({
        chatId,
        text: msg,
        userId: user.uid,
      })
    );
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full flex-1">
      {/* Messages Area */}
      <div
        ref={scrollRef}
        className={`flex-1 p-4 overflow-y-auto ${
          isEmpty ? "flex items-center justify-center" : "flex flex-col"
        }`}
      >
        {isEmpty ? (
          <div className="text-white text-center">
            Type a message to start...
          </div>
        ) : (
          <>
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}

            {/* ✅ Thinking bubble controlled by redux loading */}
            {loading && <MessageBubble message={{ type: "thinking" }} />}
          </>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-800">
        <ChatInput onSend={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
}