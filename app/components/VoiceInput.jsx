"use client";
import { useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

export default function VoiceInput({ onSend }) {
  const [listening, setListening] = useState(false);
  let recognition;

  if (typeof window !== "undefined") {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onSend(transcript); // send transcript to chat
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  const toggleListening = () => {
    if (!recognition) return;
    if (!listening) {
      recognition.start();
      setListening(true);
    } else {
      recognition.stop();
      setListening(false);
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors 
        ${listening ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} 
        text-white shadow-md`}
      title={listening ? "Stop recording" : "Start recording"}
    >
      {listening ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
    </button>
  );
}
