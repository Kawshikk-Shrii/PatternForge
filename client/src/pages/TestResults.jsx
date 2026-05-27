import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TestResultCard from "../components/TestResultCard";
import api from "../services/api";

const TestResults = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  useEffect(() => { api.get(`/tests/${id}`).then((res) => setTest(res.data)); }, [id]);
  if (!test) return null;
  return (
    <div className="space-y-5">
      <div><p className="text-sm text-forge">Test results</p><h1 className="text-3xl font-bold">{test.title}</h1></div>
      <TestResultCard result={{ score: test.score, ...(test.resultSummary || {}) }} />
      <div className="app-card">
        <h2 className="text-xl font-semibold">Suggested revision problems</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">{test.problems.map((problem) => <div key={problem._id} className="rounded-lg bg-white/[0.04] p-3"><p className="font-medium">{problem.title}</p><p className="text-sm text-slate-400">{problem.pattern} • {problem.confidenceLevel}</p></div>)}</div>
      </div>
      <Link className="btn btn-primary" to="/app/revision">Open Revision Planner</Link>
    </div>
  );
};

export default TestResults;

