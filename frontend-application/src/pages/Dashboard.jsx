import React, { useEffect, useMemo, useState } from "react";
import api from "../api/client";

const recentActivity = [
  { id: 1, title: "Premium Petrol updated", meta: "Stock adjusted to 9" },
  { id: 2, title: "Lubricant Oil added", meta: "New item • 0 stock" },
  { id: 3, title: "Gasoil reorder requested", meta: "ETA 5 days" },
];

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/products");
        if (active) {
          setProducts(res.data?.data || []);
        }
      } catch (err) {
        if (active) {
          const message =
            err?.response?.data?.message ||
            "Unable to load dashboard data. Please try again.";
          setError(message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchProducts();
    return () => {
      active = false;
    };
  }, []);

  const derived = useMemo(() => {
    const normalized = products.map((item) => {
      const quantity = Number(item.quantity ?? item.stock ?? 0);
      return {
        id: item.id,
        name: item.name,
        quantity,
      };
    });
    const total = normalized.length;
    const outOfStock = normalized.filter((item) => item.quantity <= 0).length;
    const lowStock = normalized.filter(
      (item) => item.quantity > 0 && item.quantity <= 10
    ).length;
    const inStock = total - lowStock - outOfStock;
    const lowStockItems = normalized
      .filter((item) => item.quantity <= 10)
      .slice(0, 3)
      .map((item) => ({
        ...item,
        level: item.quantity <= 3 ? "Critical" : "Low",
      }));

    return {
      total,
      inStock,
      lowStock,
      outOfStock,
      lowStockItems,
    };
  }, [products]);

  const stats = [
    { label: "Total Products", value: derived.total, trend: "Live count" },
    { label: "In Stock", value: derived.inStock, trend: "Ready to sell" },
    { label: "Low Stock", value: derived.lowStock, trend: "Needs review" },
    { label: "Out of Stock", value: derived.outOfStock, trend: "Restock now" },
  ];

  return (
    <div className="w-full px-6 pb-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mt-6 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                Overview
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Track the health of your inventory and act quickly on low-stock
                items.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white">
              View reports
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {item.value}
                </p>
                <p className="mt-2 text-xs text-slate-400">{item.trend}</p>
              </div>
            ))}
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                  Recent Activity
                </h2>
                <button className="text-xs font-semibold text-emerald-200/80 transition hover:text-emerald-100">
                  See all
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-white">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {activity.meta}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                Low Stock
              </h2>
              <div className="mt-4 space-y-3">
                {loading ? (
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-400">
                    Loading inventory...
                  </div>
                ) : derived.lowStockItems.length < 1 ? (
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-400">
                    All products are well stocked.
                  </div>
                ) : (
                  derived.lowStockItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {item.level} priority
                        </p>
                      </div>
                      <span className="rounded-full border border-rose-400/40 px-3 py-1 text-xs font-semibold text-rose-200">
                        {item.quantity}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
