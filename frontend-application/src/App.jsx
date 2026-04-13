import React from "react";
import MenuBar from "./components/MenuBar";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";

function AppShell({ children }) {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 via-slate-900 to-emerald-900">
      {children}
    </div>
  );
}

function MainLayout() {
  return (
    <AppShell>
      <MenuBar />
      <Outlet />
    </AppShell>
  );
}

const appRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/products", element: <Products /> },
  { path: "/orders", element: <Orders /> },
  { path: "/reports", element: <Reports /> },
];

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<MainLayout />}>
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}
