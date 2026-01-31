"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { json } from "stream/consumers";
export default function SignupPage() {
  const router = useRouter();
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [paswrd,setpaswrd] = useState("")
  const [error,setError] = useState("")


  const handleSignup = (e) => {
    e.preventDefault();

    if(!name|| !email|| !paswrd){
        setError("all feilds are required");
        return;
    }

    const existingUsers =
    json.parse(localStorage.getItem("users")) || [];

    const userExists = existingUsers.find(
        (u) =>u.email === email
    );

    if (userExists){
        setError("user already exists");
        return;
    };

    const newUsers = [
        ...existingUsers,
        {name,email,paswrd},
    ];

    localStorage.setItem("users",json.stringify(newUsers))
    router.push("./login")
    
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSignup}
        className="bg-white text-black p-8 rounded-xl w-96 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-600 mb-3">{error}</p>
        )}

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="password"
          value={paswrd}
          onChange={(e) => setpaswrd(e.target.value)}
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-lg"
        />

        <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
          Create Account
        </button>
      </form>
    </div>
  );
}