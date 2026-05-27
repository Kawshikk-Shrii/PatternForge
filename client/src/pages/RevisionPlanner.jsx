import { useEffect, useState } from "react";
import RevisionCard from "../components/RevisionCard";
import api from "../services/api";

const RevisionPlanner = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const load = () => api.get("/revision/recommended").then((res) => setData(res.data));
  useEffect(() => { load(); }, []);

  const mark = async (id) => {
    const confidenceLevel = window.prompt("Updated confidence? Low, Medium, or High", "Medium") || "Medium";
    await api.put(`/revision/${id}/mark-revised`, { confidenceLevel });
    setMessage("Revision saved. Nice, that problem is less foggy now.");
    load();
  };

  if (!data) return null;
  const sections = [["Revise Today", data.reviseToday], ["High Priority", data.highPriority], ["Medium Priority", data.mediumPriority], ["Low Priority", data.lowPriority]];
  return (
    <div className="space-y-6">
      <div><p className="text-sm text-forge">Revision planner</p><h1 className="text-3xl font-bold">Recommended problems</h1></div>
      {message && <p className="app-card text-emerald-200">{message}</p>}
      {sections.map(([title, items]) => (
        <section key={title} className="space-y-3">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.slice(0, 6).map((item) => <RevisionCard key={(item.problem || item)._id} item={item} onRevise={mark} />)}</div>
        </section>
      ))}
    </div>
  );
};

export default RevisionPlanner;

