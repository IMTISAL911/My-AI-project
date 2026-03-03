
// "use client";

// import React from "react"; // ✅ ADD THIS
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import { loadFromLocal } from "../utils/helpers";

// export default function ChatLayout({ children }) {
//   const router = useRouter();
//   const [chats, setChats] = useState([]);
//   const [currentChatId, setCurrentChatId] = useState(null);

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) router.push("/auth/login");

//     const savedChats = loadFromLocal();
//     setChats(savedChats);
//     if (savedChats.length > 0) setCurrentChatId(savedChats[0].id);
//   }, [router]);

//   const handleSelectChat = (id) => {
//     setCurrentChatId(id);
//   };

//   const currentChatMessages =
//     chats.find((c) => c.id === currentChatId)?.messages || [];

//   // clone children and pass props
//   const childrenWithProps =
//     children && typeof children === "object"
//       ? React.cloneElement(children, {
//           messages: currentChatMessages,
//           currentChatId: currentChatId,
//           setChats: setChats,
//         })
//       : children;

//   return (
//     <div className="flex h-screen bg-gray-900 text-white">
//       <Sidebar onSelectChat={handleSelectChat} />
//       <main className="flex-1 overflow-hidden">{childrenWithProps}</main>
//     </div>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { loadFromLocal } from "../utils/helpers";

export default function ChatLayout({ children }) {
  const router = useRouter();
  const { user, authChecked } = useSelector((state) => state.auth);

  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  // ✅ AUTH GUARD (FIXED)
  useEffect(() => {
    if (!authChecked) return;

    if (!user) {
      router.push("/auth/login");
    }
  }, [user, authChecked, router]);

  // load chats
  useEffect(() => {
    const savedChats = loadFromLocal();
    setChats(savedChats);
    if (savedChats.length > 0) setCurrentChatId(savedChats[0].id);
  }, []);

  // ⭐ wait until firebase checked
  if (!authChecked) {
    return <div className="text-white p-10">Loading...</div>;
  }

  const handleSelectChat = (id) => {
    setCurrentChatId(id);
  };

  const currentChatMessages =
    chats.find((c) => c.id === currentChatId)?.messages || [];

  const childrenWithProps =
    children && typeof children === "object"
      ? React.cloneElement(children, {
          messages: currentChatMessages,
          currentChatId,
          setChats,
        })
      : children;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar onSelectChat={handleSelectChat} />
      <main className="flex-1 overflow-hidden">{childrenWithProps}</main>
    </div>
  );
}