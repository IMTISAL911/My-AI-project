// import ChatArea from "@/app/components/ChatArea"; 

// export default function ChatPage() {
//   return <ChatArea />;
// }



"use client";
import ChatArea from "@/app/components/ChatArea"; 

export default function ChatPage({ messages, currentChatId, setChats }) {
  return (
    <div className="h-full">
      <ChatArea messages={messages} currentChatId={currentChatId} />
    </div>
  );
}
