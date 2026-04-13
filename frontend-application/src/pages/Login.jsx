import React, { useState } from "react";
import api from "../api/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      if (res.status === 200) {
        if (res.data?.data?.token) {
          localStorage.setItem("authToken", res.data.data.token);
        }
        navigate("/");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || "Unable to log in. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 via-slate-900 to-emerald-900 px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
              Stock Platform
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Sign in to manage inventory, orders, and reports.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Email
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300/60 focus:outline-none"
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Password
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300/60 focus:outline-none"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-200">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-300">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-emerald-200 transition hover:text-emerald-100"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
