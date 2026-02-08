
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";

export default function ChatPage() {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* <Sidebar /> */}
      <ChatArea />
    </div>
  );
}
