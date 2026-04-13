import React, { useMemo } from "react";

const demoProducts = [
  { id: 1, name: "Premium Petrol", quantity: 9 },
  { id: 2, name: "Lubricant Oil", quantity: 0 },
  { id: 3, name: "Diesel", quantity: 18 },
  { id: 4, name: "Coolant", quantity: 3 },
  { id: 5, name: "Brake Fluid", quantity: 6 },
];

export default function Products() {
  const normalized = useMemo(
    () =>
      demoProducts.map((item) => {
        const quantity = Number(item.quantity ?? item.stock ?? 0);
        let status = "In stock";
        if (quantity <= 0) {
          status = "Out of stock";
        } else if (quantity <= 10) {
          status = "Low stock";
        }
        return {
          id: item.id,
          name: item.name,
          quantity,
          status,
        };
      }),
    []
  );

  const total = normalized.length;
  const inStock = normalized.filter((item) => item.status === "In stock").length;

  return (
    <div className="w-full px-6 pb-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mt-6 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                Inventory
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                Products
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Review stock levels, track incoming items, and keep your catalog
                tidy and actionable.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300">
              Add product
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Total Items
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">{total}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                In Stock
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {inStock}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Low or Out
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {total - inStock}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-white/10 text-xs uppercase tracking-[0.2em] text-slate-300">
                <tr>
                  <th className="px-5 py-4">#</th>
                  <th className="px-5 py-4">Item</th>
                  <th className="px-5 py-4">Quantity</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-200">
                {normalized.length < 1 ? (
                  <tr>
                    <td
                      className="px-5 py-8 text-center text-sm text-slate-400"
                      colSpan={5}
                    >
                      No products found yet.
                    </td>
                  </tr>
                ) : (
                  normalized.map((item) => (
                    <tr key={item.id} className="bg-white/0 hover:bg-white/5">
                      <td className="px-5 py-4 font-semibold text-slate-100">
                        {item.id}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-white">
                          {item.name}
                        </div>
                      </td>
                      <td className="px-5 py-4">{item.quantity}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            item.status === "In stock"
                              ? "bg-emerald-500/20 text-emerald-200"
                              : item.status === "Low stock"
                                ? "bg-amber-400/20 text-amber-200"
                                : "bg-rose-500/20 text-rose-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex gap-2">
                          <button className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white">
                            Edit
                          </button>
                          <button className="rounded-full border border-rose-400/40 px-3 py-1 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20">
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
