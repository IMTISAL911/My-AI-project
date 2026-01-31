"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import Sidebar from "@/components/Sidebar"; // correct import
import Sidebar from "../components/Sidebar";

export default function ChatLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth/login"); // redirect if not logged in
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
