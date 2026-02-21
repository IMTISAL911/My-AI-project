
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
  const { user, error, loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email, password }));
  };

  useEffect(() => {
    if (user) router.push("/chatt");
  }, [user]);

  return (
    <>
    <StarsBackground />
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={handleSignup}
        autoComplete="off"
        className="bg-white/10 backdrop-blur-xl text-white p-8 rounded-xl w-96 shadow-2xl border border-white/20"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}

        <input autoComplete="off" type="text" name="fakeuser" className="hidden" />
        <input autoComplete="off" type="password" name="fakepass" className="hidden" />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="new-password"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="new-password"
          className="w-full mb-6 p-3 border rounded-lg"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
    </>
  );
}
