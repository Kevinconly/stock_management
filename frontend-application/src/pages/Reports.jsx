import React from "react";

const reports = [
  {
    id: 1,
    title: "Weekly Inventory Summary",
    range: "Apr 1 - Apr 7, 2026",
    status: "Ready",
  },
  {
    id: 2,
    title: "Monthly Sales Performance",
    range: "March 2026",
    status: "Draft",
  },
  {
    id: 3,
    title: "Stock Risk Audit",
    range: "Q1 2026",
    status: "Ready",
  },
];

const metrics = [
  { label: "Revenue", value: "$58,430" },
  { label: "Orders", value: "248" },
  { label: "Avg. Order", value: "$235" },
  { label: "Stock Turns", value: "3.2x" },
];

export default function Reports() {
  return (
    <div className="w-full px-6 pb-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mt-6 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                Analytics
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                Reports
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Generate clear summaries and share key performance insights with
                your team.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300">
              Generate report
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {metric.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                  Recent Reports
                </h2>
                <button className="text-xs font-semibold text-emerald-200/80 transition hover:text-emerald-100">
                  View archive
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {report.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {report.range}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          report.status === "Ready"
                            ? "bg-emerald-500/20 text-emerald-200"
                            : "bg-amber-400/20 text-amber-200"
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                Export Center
              </h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="font-semibold text-white">PDF Summary</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Shareable layout for stakeholders.
                  </p>
                  <button className="mt-3 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white">
                    Export PDF
                  </button>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="font-semibold text-white">CSV Data</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Raw numbers for deeper analysis.
                  </p>
                  <button className="mt-3 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white">
                    Export CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
