"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // normalize email for comparison
    const loginEmail = email.trim().toLowerCase();

    const validUser = users.find(
      (u) => u.email.trim().toLowerCase() === loginEmail && u.password === password
    );

    if (!validUser) {
      setError("User not found. Please sign up first.");
      return;
    }

    // save logged in user
    localStorage.setItem("user", loginEmail);
router.push("/chatt");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="bg-white text-black p-8 rounded-xl w-96 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}

        {/* Fake hidden fields to trick browser autofill */}
        <input type="text" name="fakeuser" className="hidden" />
        <input type="password" name="fakepass" className="hidden" />

        <input
          name="login_email_unique"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="off"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="login_password_unique"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="new-password"
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link
            href="/auth/signUp"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
