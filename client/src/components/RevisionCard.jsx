const RevisionCard = ({ item, onRevise }) => {
  const problem = item.problem || item;
  return (
    <div className="app-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{problem.pattern} • {problem.difficulty}</p>
          <h3 className="text-lg font-semibold">{problem.title}</h3>
        </div>
        {item.priorityScore !== undefined && <span className="rounded-full bg-rose-500/15 px-3 py-1 text-sm text-rose-200">Score {item.priorityScore}</span>}
      </div>
      <p className="mt-3 text-sm text-slate-400">Confidence: {problem.confidenceLevel} • Revised {problem.revisionCount || 0} times</p>
      <button className="btn btn-primary mt-4" onClick={() => onRevise(problem._id)}>Mark revised</button>
    </div>
  );
};

export default RevisionCard;

