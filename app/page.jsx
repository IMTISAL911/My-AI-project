"use client";
import { useRouter } from "next/navigation";
// import StarsBackground from "@/app/components/StarsBackground"
import NasaBackground from "@/app/components/StarsBackground"

export default function SplashPage() {
  const router = useRouter();

  return (
    <>
        
        {/* <StarsBackground /> */}
        <NasaBackground />

    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-5xl font-bold">My AI</h1>

      <p className="text-gray-300">
        Your intelligent assistant
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/auth/signUp")}
          className="bg-purple-600 px-6 py-3 rounded-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
    </>
  );
}
