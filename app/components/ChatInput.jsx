


"use client";
import { useState, useRef, useEffect } from "react";
import VoiceInput from "./VoiceInput";
import ImageUpload from "./ImageUpload";

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
    <div className="p-4 bg-gray-800">
      {/* Input wrapper */}
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleEnter}
          placeholder="Type a message..."
          rows={1}
          className="w-full pr-32 p-2 rounded-lg resize-none bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto"
          style={{ maxHeight: `${MAX_HEIGHT}px` }}
        />

        {/* Icons inside input field */}
        <div className="absolute right-2 bottom-2 flex gap-1 items-center">
          <VoiceInput  className="" onSend={onSend} />
          <ImageUpload onSend={onSend} />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
