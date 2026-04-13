import React from "react";
import { Link } from "react-router-dom";
import imageProfile from "../assets/profile.png";

const navLinks = [
  { label: "Dashboard", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Orders", to: "/orders" },
  { label: "Reports", to: "/reports" },
];

export default function MenuBar() {
  return (
    <div className="w-full px-6 pt-6">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 shadow-2xl backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold uppercase tracking-[0.3em] text-emerald-300">
          <span className="text-white">Sto</span>
          ck
        </div>

        <ul className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-200">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-emerald-300/50 hover:bg-emerald-500/10 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <img
              src={imageProfile}
              alt="Profile"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="text-xs">
              <p className="uppercase tracking-[0.2em] text-slate-400">
                User
              </p>
              <p className="font-semibold text-white">Admin</p>
            </div>
          </div>
          <button className="rounded-full border border-rose-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-200 transition hover:bg-rose-500/20">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
