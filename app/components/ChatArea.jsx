


"use client";

import { useDispatch, useSelector } from "react-redux";
import { addUserMessage, sendMessage } from "../redux/chatSlice";
import ChatInput from "./ChatInput";
import MessageBubble from "./messageBubble";
import { useEffect, useRef } from "react";

export default function ChatArea() {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);

  const scrollRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = (msg) => {
    dispatch(addUserMessage(msg));
    dispatch(sendMessage(msg)); // thunk handles bot reply + loading
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full">

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
