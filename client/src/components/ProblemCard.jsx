const badge = {
  Easy: "bg-emerald-500/15 text-emerald-300",
  Medium: "bg-amber-500/15 text-amber-300",
  Hard: "bg-rose-500/15 text-rose-300"
};

const ProblemCard = ({ problem, action }) => (
  <div className="app-card">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="text-lg font-semibold">{problem.title}</h3>
        <p className="text-sm text-slate-400">{problem.platform} • {problem.pattern}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs ${badge[problem.difficulty]}`}>{problem.difficulty}</span>
    </div>
    <p className="mt-3 line-clamp-2 text-sm text-slate-400">{problem.approach || problem.notes || "No approach saved yet."}</p>
    <div className="mt-4 flex flex-wrap gap-2 text-xs">
      {(problem.topics || []).map((topic) => <span key={topic} className="rounded-full bg-white/[0.06] px-2 py-1">{topic}</span>)}
    </div>
    <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
      <span>Revised {problem.revisionCount || 0}x</span>
      {action}
    </div>
  </div>
);

export default ProblemCard;

