const TestResultCard = ({ result }) => (
  <div className="app-card">
    <h3 className="text-xl font-semibold">Result Summary</h3>
    <div className="mt-4 grid gap-3 sm:grid-cols-4">
      <div><p className="text-sm text-slate-400">Score</p><p className="text-2xl font-bold">{result.score}%</p></div>
      <div><p className="text-sm text-slate-400">Solved</p><p className="text-2xl font-bold">{result.solvedCount}</p></div>
      <div><p className="text-sm text-slate-400">Attempted</p><p className="text-2xl font-bold">{result.attemptedCount}</p></div>
      <div><p className="text-sm text-slate-400">Skipped</p><p className="text-2xl font-bold">{result.skippedCount}</p></div>
    </div>
    <p className="mt-4 text-sm text-slate-400">Weak patterns: {(result.weakPatterns || []).join(", ") || "None detected"}</p>
  </div>
);

export default TestResultCard;

