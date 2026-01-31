"use client";

export default function MessageBubble({ message }) {
  const isUser = message.type === "user";

  return (
    <div
      className={`max-w-xs p-2 rounded-lg ${
        isUser ? "bg-blue-600 text-white self-end" : "bg-gray-700 text-white self-start"
      }`}
    >
      {message.text}
    </div>
  );
}
