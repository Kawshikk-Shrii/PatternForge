import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../services/api";

const Analytics = () => {
  const [patterns, setPatterns] = useState(null);
  useEffect(() => { api.get("/analytics/patterns").then((res) => setPatterns(res.data)); }, []);
  if (!patterns) return <LoadingSpinner label="Analyzing patterns" />;
  return (
    <div className="space-y-5">
      <div><p className="text-sm text-forge">Pattern analytics</p><h1 className="text-3xl font-bold">Strong, weak, and forgotten areas</h1></div>
      <div className="grid gap-4 lg:grid-cols-2">
        {patterns.map((item, index) => (
          <div key={item.pattern} className="app-card">
            <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">{item.pattern}</h2><span className={index < 3 ? "text-rose-300" : "text-emerald-300"}>{index < 3 ? "Weak" : "Stable"}</span></div>
            <div className="mt-4 grid grid-cols-4 gap-3 text-sm">
              <div><p className="text-slate-400">Solved</p><p className="text-2xl font-bold">{item.total}</p></div>
              <div><p className="text-slate-400">Low conf.</p><p className="text-2xl font-bold">{item.lowConfidence}</p></div>
              <div><p className="text-slate-400">Avg priority</p><p className="text-2xl font-bold">{item.averagePriority}</p></div>
              <div><p className="text-slate-400">Revisions</p><p className="text-2xl font-bold">{Math.round(item.revisions)}</p></div>
            </div>
            <div className="mt-4 flex gap-2 text-xs">
              {Object.entries(item.distribution).map(([key, value]) => <span key={key} className="rounded-full bg-white/[0.06] px-2 py-1">{key}: {value}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;

