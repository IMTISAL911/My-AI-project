"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("all feilds are required");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const userExists = existingUsers.find(
      (u) => u.email === email
    );

    if (userExists) {
      setError("user already exists");
      return;
    }

    const newUsers = [
      ...existingUsers,
      { name, email, password },
    ];

    localStorage.setItem(
      "users",
      JSON.stringify(newUsers)
    );

    router.push("/auth/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSignup}
        className="bg-white text-black p-8 rounded-xl w-96 shadow-lg"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-600 mb-3">{error}</p>
        )}

        {/* hidden fake inputs to block browser autofill */}
        <input type="text" name="fakeuser" className="hidden" />
        <input type="password" name="fakepass" className="hidden" />

        <input
          name="signup_name_unique"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          autoComplete="off"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          name="signup_email_unique"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="off"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="password"
          name="signup_password_unique"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="new-password"
          className="w-full mb-6 p-3 border rounded-lg"
        />

        <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
          Create Account
        </button>
      </form>
    </div>
  );
}
