import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export default function ChatArea() {
  const messages = [
    { role: "user", text: "Hello!" },
    { role: "ai", text: "Hi! How can I help you today?" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} text={msg.text} />
        ))}
      </div>
      <ChatInput />
    </div>
  );
}
