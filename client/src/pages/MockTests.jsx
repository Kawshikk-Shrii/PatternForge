import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TestGeneratorForm from "../components/TestGeneratorForm";
import api from "../services/api";

const MockTests = () => {
  const [tests, setTests] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const load = () => api.get("/tests").then((res) => setTests(res.data));
  useEffect(() => { load(); }, []);

  const generate = async (payload) => {
    setSaving(true);
    setError("");
    try {
      await api.post("/tests/generate", payload);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div><p className="text-sm text-forge">Mock test generator</p><h1 className="text-3xl font-bold">Build tests from solved problems</h1></div>
      {error && <p className="app-card text-rose-200">{error}</p>}
      <TestGeneratorForm onSubmit={generate} saving={saving} />
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Generated tests</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {tests.map((test) => (
            <div className="app-card" key={test._id}>
              <div className="flex items-start justify-between gap-4">
                <div><h3 className="text-lg font-semibold">{test.title}</h3><p className="text-sm text-slate-400">{test.problems.length} questions • {test.duration} minutes • {test.status}</p></div>
                <span className="rounded-full bg-forge/15 px-3 py-1 text-sm text-forge">{test.score || 0}%</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link className="btn btn-primary" to={`/app/tests/${test._id}/attempt`}><Play className="mr-2" size={16} />Start</Link>
                {test.status === "completed" && <Link className="btn btn-secondary" to={`/app/tests/${test._id}/results`}>Results</Link>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MockTests;

