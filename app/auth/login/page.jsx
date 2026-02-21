
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import StarsBackground from "../../components/StarsBackground";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) router.push("/chatt");
  }, [user]);

  return (
    <>
    <StarsBackground />
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="bg-white/10 backdrop-blur-xl text-white p-8 rounded-xl w-96 bg-white text-black p-8 rounded-xl w-96 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}

        <input autoComplete="off" type="text" name="fakeuser" className="hidden" />
        <input autoComplete="off" type="password" name="fakepass" className="hidden" />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="new-password"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="new-password"
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none"
        />

      
      <button
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg flex items-center justify-center transition"
>
  {loading ? (
    <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  ) : (
    "Login"
  )}
</button>
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link href="/auth/signUp" className="text-blue-600">
            Register here
          </Link>
        </p>
      </form>
    </div>
    </>
  );
}
