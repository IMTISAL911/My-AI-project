

"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/authSlice";
import StarsBackground from "../../components/StarsBackground";

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, error, loading, authChecked } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ redirect only after auth check
  useEffect(() => {
    if (!authChecked) return;
    if (user) router.replace("/chatt");
  }, [user, authChecked, router]);

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email, password }));
  };

  // ✅ wait for firebase
  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <StarsBackground />

      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={handleSignup}
          autoComplete="off"
          className="bg-white/10 backdrop-blur-xl text-white p-8 rounded-xl w-96 shadow-2xl border border-white/20"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

          {/* 🔥 AUTOFILL KILLER */}
          <input
            type="text"
            name="username"
            autoComplete="username"
            style={{ display: "none" }}
          />
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            style={{ display: "none" }}
          />

          {/* ✅ EMAIL */}
          <input
            type="email"
            name={`email_${Math.random()}`}
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-4 p-3 border rounded-lg text-black"
          />

          {/* ✅ PASSWORD */}
          <input
            type="password"
            name={`password_${Math.random()}`}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-6 p-3 border rounded-lg text-black"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg flex items-center justify-center transition"
          >
            {loading ? (
              <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Signup"
            )}
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}