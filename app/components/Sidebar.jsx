// "use client";
// import { useDispatch, useSelector } from "react-redux";
// import { selectChat } from "../redux/chatSlice";
// import { logoutUser } from "../redux/authSlice";

// export default function Sidebar() {
//   const dispatch = useDispatch();
//   const chats = useSelector((s) => s.chat.chats);
//   const currentChatId = useSelector((s) => s.chat.currentChatId);

//   return (
//     <aside className="w-64 bg-gray-800 p-4 flex flex-col text-white">
//       <h2 className="text-xl font-bold mb-4">Chats</h2>

//       <ul className="flex-1 overflow-y-auto mb-4">
//         {chats.length === 0 ? (
//           <li className="p-2 text-gray-400">No chats yet</li>
//         ) : (
//           chats.map((c) => (
//             <li
//               key={c.id}
//               className={`p-2 rounded cursor-pointer ${
//                 currentChatId === c.id ? "bg-gray-700" : "hover:bg-gray-700"
//               }`}
//               onClick={() => dispatch(selectChat(c.id))}
//             >
//               {c.messages?.[0]?.text?.slice(0, 30) || "New Chat"}
//             </li>
//           ))
//         )}
//       </ul>

//       <button
//         onClick={() => dispatch(logoutUser())}
//         className="bg-red-600 p-2 rounded cursor-pointer"
//       >
//         Logout
//       </button>
//     </aside>
//   );
// }




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
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded text-white"
        onClick={() => setOpen(!open)}
      >
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>

      <aside
        className={`fixed md:relative z-40 w-64 bg-gray-800 p-4 text-white h-full transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-4">Chats</h2>

        <ul className="flex-1 overflow-y-auto mb-4">
          {chats.length === 0 ? (
            <li className="p-2 text-gray-400">No chats yet</li>
          ) : (
            chats.map((c) => (
              <li
                key={c.id}
                className={`p-2 rounded cursor-pointer ${
                  currentChatId === c.id ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
                onClick={() => dispatch(selectChat(c.id))}
              >
                {c.messages?.[0]?.text?.slice(0, 30) || "New Chat"}
              </li>
            ))
          )}
        </ul>

        <button
          onClick={() => dispatch(logoutUser())}
          className="bg-red-600 p-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </aside>
    </>
  );
}