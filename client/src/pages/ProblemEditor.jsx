import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddProblemForm from "../components/AddProblemForm";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../services/api";

const ProblemEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    api.get(`/problems/${id}`).then((res) => setProblem(res.data)).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, [id]);

  const save = async (payload) => {
    setSaving(true);
    setError("");
    try {
      if (id) await api.put(`/problems/${id}`, payload);
      else await api.post("/problems", payload);
      navigate("/app/problems");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="space-y-5">
      <div><p className="text-sm text-forge">{id ? "Edit notes and solution" : "Add solved problem"}</p><h1 className="text-3xl font-bold">{id ? problem?.title : "New problem"}</h1></div>
      {error && <p className="app-card text-rose-200">{error}</p>}
      <AddProblemForm initial={problem} onSubmit={save} saving={saving} />
    </div>
  );
};

export default ProblemEditor;

