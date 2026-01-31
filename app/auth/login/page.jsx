"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // hard-coded login success
    router.push("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl w-96 shadow-lg"
      >
        <h2 className="text-2xl text-gray-800 font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-lg"
          required
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
}
