


"use client";

import { useDispatch, useSelector } from "react-redux";
import { addUserMessage, sendMessage } from "../redux/chatSlice";
import ChatInput from "./ChatInput";
import MessageBubble from "./messageBubble";
import { useRef, useEffect } from "react";

export default function ChatArea() {
  const dispatch = useDispatch();
  const { chats, currentChatId, loading } = useSelector((state) => state.chat);

  const chat = chats.find((c) => c.id === currentChatId);
  const messages = chat?.messages || [];

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSendMessage = (msg) => {
    // let chatId = currentChatId;

    // // If no current chat, create a new one
    // if (!chatId) {
    //   chatId = Date.now();
    // }

    // dispatch(addUserMessage({ chatId, text: msg }));
    // dispatch(sendMessage({ chatId, text: msg }));

    if (!currentChatId || !user?.uid) return;

  dispatch(sendMessage({ chatId: currentChatId, text: msg, userId: user.uid }));
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
          <>
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {loading && <MessageBubble message={{ type: "thinking" }} />}
          </>
        )}
      </div>
      <div className="p-4 bg-gray-800">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
