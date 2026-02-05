



"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../redux/chatSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  return (
    <aside className="w-64 bg-gray-800 p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Chats</h2>
      <ul className="flex-1 overflow-y-auto mb-4">
        {chats.length === 0 ? (
          <li className="p-2 text-gray-400">No chats yet</li>
        ) : (
          chats.map((c, index) => (
            <li
              key={c.id ?? index}
              className={`p-2 rounded hover:bg-gray-700 cursor-pointer truncate ${
                currentChatId === c.id ? "bg-gray-700" : ""
              }`}
              onClick={() => dispatch(selectChat(c.id))}
            >
              {c.text?.slice(0, 30) || "New Chat"}
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}
