


"use client";

import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../redux/chatSlice";
import { logoutUser } from "../redux/authSlice";
import { useState } from "react";

export default function Sidebar() {
  const dispatch = useDispatch();
  const chats = useSelector((s) => s.chat.chats);
  const currentChatId = useSelector((s) => s.chat.currentChatId);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ✅ Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded text-white shadow-lg"
        onClick={() => setOpen(!open)}
      >
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>

      {/* ✅ Sidebar */}
      <aside
        className={`fixed md:relative z-40 w-64 bg-gray-800 p-4 text-white h-screen flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <h2 className="text-xl font-bold mb-4">Chats</h2>

        {/* ✅ Scrollable chat list */}
        <ul className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          {chats.length === 0 ? (
            <li className="p-2 text-gray-400">No chats yet</li>
          ) : (
            chats.map((c) => (
              <li
                key={c.id}
                className={`p-2 rounded cursor-pointer transition-colors
                  ${
                    currentChatId === c.id
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  }`}
                onClick={() => {
                  dispatch(selectChat(c.id));
                  setOpen(false); // ✅ close on mobile after click
                }}
              >
                {c.messages?.[0]?.text?.slice(0, 30) || "New Chat"}
              </li>
            ))
          )}
        </ul>

        {/* Logout */}
        <button
          onClick={() => dispatch(logoutUser())}
          className="bg-red-600 hover:bg-red-700 p-2 rounded cursor-pointer transition mt-2"
        >
          Logout
        </button>
      </aside>
    </>
  );
}