
"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const MAX_HEIGHT = 120; // maximum height of textarea in px

  const handleChange = (e) => {
    setText(e.target.value);

    // Auto resize with max height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, MAX_HEIGHT);
      textareaRef.current.style.height = `${newHeight}px`;
      textareaRef.current.style.overflowY =
        textareaRef.current.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
    }
  };

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 items-end p-4 bg-gray-800">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleEnter}
        placeholder="Type a message..."
        rows={1}
        className="flex-1 p-2 rounded-lg resize-none bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto"
        style={{ maxHeight: `${MAX_HEIGHT}px` }}
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition flex-shrink-0"
      >
        Send
      </button>
    </div>
  );
}
