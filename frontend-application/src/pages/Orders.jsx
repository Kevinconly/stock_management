import React from "react";

const orders = [
  {
    id: "ORD-1042",
    customer: "City Fuel Depot",
    date: "2026-04-10",
    total: "$2,450",
    status: "Processing",
  },
  {
    id: "ORD-1041",
    customer: "Greenline Logistics",
    date: "2026-04-09",
    total: "$1,280",
    status: "Shipped",
  },
  {
    id: "ORD-1040",
    customer: "Westside Auto",
    date: "2026-04-08",
    total: "$3,610",
    status: "Delivered",
  },
];

export default function Orders() {
  return (
    <div className="w-full px-6 pb-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mt-6 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                Fulfillment
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                Orders
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Monitor active orders, track shipment progress, and keep
                customers informed.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300">
              Create order
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Open Orders
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">12</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Shipping Today
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">5</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Delays
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">1</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-white/10 text-xs uppercase tracking-[0.2em] text-slate-300">
                <tr>
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5">
                    <td className="px-5 py-4 font-semibold text-white">
                      {order.id}
                    </td>
                    <td className="px-5 py-4">{order.customer}</td>
                    <td className="px-5 py-4">{order.date}</td>
                    <td className="px-5 py-4">{order.total}</td>
                    <td className="px-5 py-4 text-right">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          order.status === "Processing"
                            ? "bg-amber-400/20 text-amber-200"
                            : order.status === "Shipped"
                              ? "bg-sky-500/20 text-sky-200"
                              : "bg-emerald-500/20 text-emerald-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
