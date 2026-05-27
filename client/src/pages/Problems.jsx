import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProblemTable from "../components/ProblemTable";
import api from "../services/api";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const load = () => api.get("/problems").then((res) => setProblems(res.data)).catch((err) => setError(err.message));
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this solved problem?")) return;
    await api.delete(`/problems/${id}`);
    load();
  };

  const importDemo = async () => {
    await api.post("/problems/import-demo");
    load();
  };

  const filtered = problems.filter((problem) => `${problem.title} ${problem.pattern} ${problem.platform}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm text-forge">Solved problems</p><h1 className="text-3xl font-bold">Problem bank</h1></div>
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={importDemo}>Import demo set</button>
          <Link to="/app/problems/new" className="btn btn-primary"><Plus className="mr-2" size={16} /> Add Problem</Link>
        </div>
      </div>
      {error && <p className="app-card text-rose-200">{error}</p>}
      <input className="field max-w-md" placeholder="Search by title, platform, or pattern" value={search} onChange={(e) => setSearch(e.target.value)} />
      <ProblemTable problems={filtered} onDelete={remove} />
    </div>
  );
};

export default Problems;
