"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function ChatLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
