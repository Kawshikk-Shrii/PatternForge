import { useState } from "react";
import { DIFFICULTIES, PATTERNS, PLATFORMS } from "../utils/constants";

const ToggleGroup = ({ label, options, selected, setSelected }) => (
  <div>
    <p className="mb-2 text-sm text-slate-400">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            type="button"
            key={option}
            onClick={() => setSelected(active ? selected.filter((item) => item !== option) : [...selected, option])}
            className={`rounded-full px-3 py-1 text-sm ${active ? "bg-forge text-ink" : "bg-white/[0.06] text-slate-300"}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  </div>
);

const TestGeneratorForm = ({ onSubmit, saving }) => {
  const [form, setForm] = useState({ title: "Personal Revision Mock", questionCount: 5, duration: 60, difficulties: [], patterns: [], platforms: [], topics: "", preferPriority: true });
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      questionCount: Number(form.questionCount),
      duration: Number(form.duration),
      topics: form.topics.split(",").map((topic) => topic.trim()).filter(Boolean)
    });
  };

  return (
    <form onSubmit={submit} className="app-card space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-1 text-sm md:col-span-1">Title<input className="field" value={form.title} onChange={(e) => set("title", e.target.value)} /></label>
        <label className="space-y-1 text-sm">Questions<input type="number" min="1" className="field" value={form.questionCount} onChange={(e) => set("questionCount", e.target.value)} /></label>
        <label className="space-y-1 text-sm">Duration minutes<input type="number" min="5" className="field" value={form.duration} onChange={(e) => set("duration", e.target.value)} /></label>
      </div>
      <ToggleGroup label="Difficulty" options={DIFFICULTIES} selected={form.difficulties} setSelected={(value) => set("difficulties", value)} />
      <ToggleGroup label="Patterns" options={PATTERNS} selected={form.patterns} setSelected={(value) => set("patterns", value)} />
      <ToggleGroup label="Platforms" options={PLATFORMS} selected={form.platforms} setSelected={(value) => set("platforms", value)} />
      <label className="space-y-1 text-sm">Topics<input className="field" placeholder="Array, Graph" value={form.topics} onChange={(e) => set("topics", e.target.value)} /></label>
      <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={form.preferPriority} onChange={(e) => set("preferPriority", e.target.checked)} /> Prefer high-priority revision problems</label>
      <button className="btn btn-primary" disabled={saving}>{saving ? "Generating..." : "Generate Test"}</button>
    </form>
  );
};

export default TestGeneratorForm;

