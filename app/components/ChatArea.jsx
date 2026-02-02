

// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import {
//   addUserMessage,
//   addBotMessage,
//   setLoading,
// } from "../redux/chatSlice";

// import ChatInput from "./ChatInput";
// import MessageBubble from "./messageBubble";

// export default function ChatArea() {
//   const dispatch = useDispatch();
//   const { messages, loading } = useSelector((state) => state.chat);

//   const handleSendMessage = (msg) => {
//     dispatch(addUserMessage(msg));
//     dispatch(setLoading(true));

//     setTimeout(() => {
//       dispatch(addBotMessage(`${msg}`));
//       dispatch(setLoading(false));
//     }, 2000);
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex-1 p-4 overflow-y-auto space-y-2">
//         {messages.map((m) => (
//           <MessageBubble key={m.id} message={m} />
//         ))}

//         {loading && (
//           <MessageBubble message={{ type: "thinking" }} />
//         )}
//       </div>

//       <ChatInput onSend={handleSendMessage} />
//     </div>
//   );
// }



"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  addUserMessage,
  addBotMessage,
  setLoading,
} from "../redux/chatSlice";

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
    dispatch(setLoading(true));

    setTimeout(() => {
      dispatch(addBotMessage(`Bot reply to: ${msg}`));
      dispatch(setLoading(false));
    }, 2000);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full">

      {/* Chat area */}
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

      {/* Input stays at bottom */}
      <div className="p-4 bg-gray-800">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
