

"use client";
import { useState, useRef } from "react";
import VoiceInput from "./VoiceInput";
import ImageUpload from "./ImageUpload";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const MAX_HEIGHT = 120;

  const handleChange = (e) => {
    setText(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(
        textareaRef.current.scrollHeight,
        MAX_HEIGHT
      );
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
    textareaRef.current.style.height = "auto";
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = !text.trim() || disabled;

  return (
    <div className="p-4 bg-gray-800">
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleEnter}
          placeholder="Type a message..."
          rows={1}
          disabled={disabled}
          className="w-full pr-32 p-3 rounded-xl resize-none bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="absolute right-2 bottom-2 flex gap-2 items-center">
          <VoiceInput onSend={onSend} />
          <ImageUpload onSend={onSend} />

          <button
            onClick={handleSend}
            disabled={isDisabled}
            className={`px-3 py-1 rounded-lg text-white transition
              ${
                isDisabled
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}