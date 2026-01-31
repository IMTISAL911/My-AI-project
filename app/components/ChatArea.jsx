"use client";
import { useState } from "react";
// import ChatInput from "@/app/components/ChatInput";
// import MessageBubble from "@/app/components/MessageBubble";
import ChatInput from "./ChatInput";
import MessageBubble from "./messageBubble";



export default function ChatArea() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to AI Chat!", type: "bot" },
  ]);

  const handleSendMessage = (msg) => {
    const newMessage = { id: Date.now(), text: msg, type: "user" };
    setMessages([...messages, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: `Bot reply to: ${msg}`, type: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </div>

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}
