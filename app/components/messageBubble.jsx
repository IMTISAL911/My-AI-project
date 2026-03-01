


// export default function MessageBubble({ message }) {
//   const isUser = message.type === "user";
//   const isThinking = message.type === "thinking";

//   return (
//     <div className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`px-4 py-2 rounded-2xl max-w-[80%] sm:max-w-xs relative
//         ${isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
//       >
//         {isThinking ? <TypingWave /> : message.text}

//         {!isThinking && (
//           <ActionButtons text={message.text} isUser={isUser} />
//         )}
//       </div>
//     </div>
//   );
// }

// function TypingWave() {
//   return (
//     <div className="flex gap-1 items-center">
//       <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
//       <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
//       <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
//     </div>
//   );
// }

// function ActionButtons({ text }) {
//   const copy = () => navigator.clipboard.writeText(text);

//   return (
//     <div className="absolute -bottom-5 right-1 flex gap-2 text-[10px] opacity-70">
//       <button
//         onClick={copy}
//         className="hover:opacity-100 transition"
//       >
//         Copy
//       </button>
//       <button className="hover:opacity-100 transition">
//         Edit
//       </button>
//     </div>
//   );
// }



"use client";

export default function MessageBubble({ message }) {
  const isUser = message.type === "user";
  const isThinking = message.type === "thinking";
  const isBot = message.type === "bot";

  return (
    <div className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-[80%] sm:max-w-xs relative
        ${isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
      >
        {isThinking ? <TypingWave /> : message.text}

        {isBot && <ActionButtons text={message.text} />}
      </div>
    </div>
  );
}

function TypingWave() {
  return (
    <div className="flex gap-1 items-center">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
    </div>
  );
}

function ActionButtons({ text }) {
  const copy = () => navigator.clipboard.writeText(text);

  return (
    <div className="absolute -bottom-5 right-1 flex gap-2 text-[10px] opacity-70">
      <button onClick={copy} className="hover:opacity-100 transition">
        Copy
      </button>
      <button className="hover:opacity-100 transition">Edit</button>
    </div>
  );
}