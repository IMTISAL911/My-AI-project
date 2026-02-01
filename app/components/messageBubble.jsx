// export default function MessageBubble({ message }) {
//   const isUser = message.type === "user";
//   const isThinking = message.type === "thinking";

//   return (
//     <div
//       className={`flex ${isUser ? "justify-end" : "justify-start"}`}
//     >
//       <div
//         className={`px-4 py-2 rounded-xl max-w-xs relative
//         ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
//       >
//         {isThinking ? <TypingDots /> : message.text}

//         {!isThinking && <ActionButtons text={message.text} />}
//       </div>
//     </div>
//   );
// }


export default function MessageBubble({ message }) {
  const isUser = message.type === "user";
  const isThinking = message.type === "thinking";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-xs relative
        ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
      >
        {isThinking ? <TypingDots /> : message.text}

        {!isThinking && <ActionButtons text={message.text} />}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex space-x-1">
      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-100">.</span>
      <span className="animate-bounce delay-200">.</span>
    </div>
  );
}

function ActionButtons({ text }) {
  const copy = () => navigator.clipboard.writeText(text);

  return (
    <div className="absolute -bottom-5 right-1 flex gap-2 text-xs opacity-70">
      <button onClick={copy}>Copy</button>
      <button>Edit</button>
    </div>
  );
}
