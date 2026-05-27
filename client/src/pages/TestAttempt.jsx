import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TestTimer from "../components/TestTimer";
import api from "../services/api";

const statuses = ["Solved", "Attempted", "Skipped", "Need revision"];

const TestAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/tests/${id}`).then((res) => {
      setTest(res.data);
      setAnswers(Object.fromEntries(res.data.problems.map((problem) => [problem._id, "Skipped"])));
    }).catch((err) => setError(err.message));
  }, [id]);

  const submit = async () => {
    const problemStatuses = Object.entries(answers).map(([problem, status]) => ({ problem, status }));
    await api.post(`/tests/${id}/submit`, { problemStatuses });
    navigate(`/app/tests/${id}/results`);
  };

  if (error) return <p className="app-card text-rose-200">{error}</p>;
  if (!test) return null;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm text-forge">Test attempt</p><h1 className="text-3xl font-bold">{test.title}</h1></div>
        <TestTimer minutes={test.duration} onExpire={submit} />
      </div>
      <div className="space-y-4">
        {test.problems.map((problem, index) => (
          <div className="app-card" key={problem._id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><p className="text-sm text-slate-400">Question {index + 1} • {problem.pattern}</p><h2 className="text-xl font-semibold">{problem.title}</h2><p className="text-sm text-slate-400">{problem.difficulty} • {problem.platform}</p></div>
              {problem.problemUrl && <a className="text-forge" href={problem.problemUrl} target="_blank" rel="noreferrer">Open problem</a>}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">{statuses.map((status) => <button key={status} className={`rounded-full px-3 py-1 text-sm ${answers[problem._id] === status ? "bg-forge text-ink" : "bg-white/[0.06]"}`} onClick={() => setAnswers({ ...answers, [problem._id]: status })}>{status}</button>)}</div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={submit}>Submit Test</button>
    </div>
  );
};

export default TestAttempt;

