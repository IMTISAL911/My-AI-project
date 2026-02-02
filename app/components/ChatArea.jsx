

"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  addUserMessage,
  addBotMessage,
  setLoading,
} from "../redux/chatSlice";

import ChatInput from "./ChatInput";
import MessageBubble from "./messageBubble";

export default function ChatArea() {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);

  const handleSendMessage = (msg) => {
    dispatch(addUserMessage(msg));
    dispatch(setLoading(true));

    setTimeout(() => {
      dispatch(addBotMessage(`Bot reply to: ${msg}`));
      dispatch(setLoading(false));
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {loading && (
          <MessageBubble message={{ type: "thinking" }} />
        )}
      </div>

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}
