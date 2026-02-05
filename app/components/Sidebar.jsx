// "use client";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function Sidebar() {
//   const router = useRouter();
//   const [user, setUser] = useState("");

//   useEffect(() => {
//     const currentUser = localStorage.getItem("user");
//     if (currentUser) setUser(currentUser);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     router.push("/auth/login");
//   };

//   return (
//     <aside className="w-64 bg-gray-800 p-4 flex flex-col">
//       <h2 className="text-xl font-bold mb-6">Chats</h2>

//       <ul className="flex-1 overflow-y-auto mb-4">
//         <li className="p-2 rounded hover:bg-gray-700 cursor-pointer">AI Chat 1</li>
//         <li className="p-2 rounded hover:bg-gray-700 cursor-pointer">AI Chat 2</li>
//         <li className="p-2 rounded hover:bg-gray-700 cursor-pointer">AI Chat 3</li>
//       </ul>

//       <div className="mt-auto">
//         <p className="mb-2 text-sm">Logged in as: {user}</p>
//         <button
//           onClick={handleLogout}
//           className="w-full bg-red-600 hover:bg-red-700 py-2 rounded transition"
//         >
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }



// "use client";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { loadFromLocal } from "../utils/helpers";

// export default function Sidebar() {
//   const router = useRouter();
//   const [user, setUser] = useState("");
//   const [chats, setChats] = useState([]);

//   useEffect(() => {
//     const currentUser = localStorage.getItem("user");
//     if (currentUser) setUser(currentUser);

//     const savedChats = loadFromLocal();
//     setChats(savedChats);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     router.push("/auth/login");
//   };

//   return (
//     <aside className="w-64 bg-gray-800 p-4 flex flex-col">
//       <h2 className="text-xl font-bold mb-6">Chats</h2>

//       <ul className="flex-1 overflow-y-auto mb-4">
//         {chats.length === 0 ? (
//           <li className="p-2 text-gray-400">No chats yet</li>
//         ) : (
//           chats.map((c) => (
//             <li key={c.id} className="p-2 rounded hover:bg-gray-700 cursor-pointer truncate">
//               {c.text.slice(0, 30) || "New Chat"}
//             </li>
//           ))
//         )}
//       </ul>

//       <div className="mt-auto">
//         <p className="mb-2 text-sm">Logged in as: {user}</p>
//         <button
//           onClick={handleLogout}
//           className="w-full bg-red-600 hover:bg-red-700 py-2 rounded transition"
//         >
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }



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
