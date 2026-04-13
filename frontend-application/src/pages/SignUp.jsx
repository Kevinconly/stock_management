import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Fill in your name, email, and password to continue.");
      return;
    }

    setSuccess("Account created locally. You can sign in now.");
    setTimeout(() => navigate("/login"), 800);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900 px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
              Stock Platform
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Create account
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Start tracking inventory and orders in one secure place.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Full Name
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300/60 focus:outline-none"
                type="text"
                placeholder="Jane Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                placeholder="Create a secure password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-200">
                {error}
              </div>
            ) : null}

            {success ? (
              <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200">
                {success}
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
            >
              Create account
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-emerald-200 transition hover:text-emerald-100"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
