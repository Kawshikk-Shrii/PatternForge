import { Link } from "react-router-dom";

const ProblemTable = ({ problems, onDelete }) => (
  <div className="overflow-hidden rounded-lg border border-white/10 light-shell:border-slate-200">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-white/10 text-sm light-shell:divide-slate-200">
        <thead className="bg-white/[0.04] text-left text-slate-400">
          <tr>
            <th className="px-4 py-3">Problem</th>
            <th className="px-4 py-3">Pattern</th>
            <th className="px-4 py-3">Difficulty</th>
            <th className="px-4 py-3">Confidence</th>
            <th className="px-4 py-3">Revisions</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 light-shell:divide-slate-200">
          {problems.map((problem) => (
            <tr key={problem._id} className="hover:bg-white/[0.03]">
              <td className="px-4 py-3">
                <p className="font-medium">{problem.title}</p>
                <p className="text-xs text-slate-400">{problem.platform}</p>
              </td>
              <td className="px-4 py-3">{problem.pattern}</td>
              <td className="px-4 py-3">{problem.difficulty}</td>
              <td className="px-4 py-3">{problem.confidenceLevel}</td>
              <td className="px-4 py-3">{problem.revisionCount}</td>
              <td className="space-x-2 px-4 py-3">
                <Link className="text-forge" to={`/app/problems/${problem._id}`}>Edit</Link>
                <button className="text-rose-300" onClick={() => onDelete(problem._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProblemTable;

