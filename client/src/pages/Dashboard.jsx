import { Activity, Flame, ListChecks, Target } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import LoadingSpinner from "../components/LoadingSpinner";
import PatternChart, { DifficultyPie } from "../components/PatternChart";
import api from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/analytics/overview").then((res) => setData(res.data)).catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="app-card text-rose-200">{error}</p>;
  if (!data) return <LoadingSpinner label="Building your revision dashboard" />;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-forge">Dashboard</p>
        <h1 className="text-3xl font-bold">Your DSA revision command center</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Total solved" value={data.totalSolved} hint="Problems in your bank" icon={ListChecks} />
        <DashboardCard title="Revision due" value={data.revisionDueCount} hint="Need attention soon" icon={Target} />
        <DashboardCard title="Consistency" value={`${data.streak} days`} hint="Unique solve days tracked" icon={Flame} />
        <DashboardCard title="Mock tests" value={data.mockTests?.length || 0} hint="Recent generated tests" icon={Activity} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="app-card"><h2 className="text-xl font-semibold">Difficulty distribution</h2><DifficultyPie data={data.byDifficulty} /></div>
        <div className="app-card"><h2 className="text-xl font-semibold">Problems by pattern</h2><PatternChart data={data.byPattern} /></div>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="app-card"><h2 className="text-xl font-semibold">Weak patterns</h2><div className="mt-4 space-y-3">{data.weakPatterns.map((item) => <div key={item.pattern}><div className="flex justify-between text-sm"><span>{item.pattern}</span><span>{Math.round(item.weaknessScore)}</span></div><div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-rose-400" style={{ width: `${Math.min(100, item.weaknessScore * 8)}%` }} /></div></div>)}</div></div>
        <div className="app-card"><h2 className="text-xl font-semibold">Revision due</h2><div className="mt-4 space-y-3">{data.revisionDue.map(({ problem, priorityScore }) => <div key={problem._id} className="flex items-center justify-between rounded-lg bg-white/[0.04] p-3"><div><p className="font-medium">{problem.title}</p><p className="text-sm text-slate-400">{problem.pattern}</p></div><span className="text-forge">{priorityScore}</span></div>)}</div></div>
      </div>
    </div>
  );
};

export default Dashboard;

