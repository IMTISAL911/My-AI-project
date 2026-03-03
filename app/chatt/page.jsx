
// "use client";

// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// // import Sidebar from "../components/Sidebar";
// import ChatArea from "../components/ChatArea";

// export default function ChatPage() {
//   const user = useSelector((state) => state.auth.user);
//   const router = useRouter();

  
//   useEffect(() => {
//     if (!user) {
//       router.push("/auth/login");
//     }
//   }, [user]);

//   return (
//     <div className="flex h-screen bg-gray-900 text-white">
//       {/* <Sidebar /> */}
//       <ChatArea />
//     </div>
//   );
// }



"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ChatArea from "../components/ChatArea";

export default function ChatPage() {
  const { user, authChecked } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!authChecked) return;

    if (!user) {
      router.push("/auth/login");
    }
  }, [user, authChecked, router]);

  if (!authChecked) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <ChatArea />
    </div>
  );
}