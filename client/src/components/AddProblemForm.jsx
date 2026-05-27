import { useState } from "react";
import { CONFIDENCE, DIFFICULTIES, PATTERNS, PLATFORMS } from "../utils/constants";

const empty = {
  title: "",
  platform: "LeetCode",
  problemUrl: "",
  difficulty: "Medium",
  topics: "",
  pattern: "Sliding Window",
  dateSolved: new Date().toISOString().slice(0, 10),
  confidenceLevel: "Medium",
  notes: "",
  approach: "",
  mistakes: "",
  keyPatternLearned: "",
  timeComplexity: "",
  spaceComplexity: "",
  codeSnippet: ""
};

const AddProblemForm = ({ initial, onSubmit, saving }) => {
  const [form, setForm] = useState(initial ? { ...empty, ...initial, topics: (initial.topics || []).join(", "), dateSolved: initial.dateSolved?.slice(0, 10) } : empty);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      topics: form.topics.split(",").map((topic) => topic.trim()).filter(Boolean)
    });
  };

  return (
    <form onSubmit={submit} className="app-card space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">Title<input required className="field" value={form.title} onChange={(e) => set("title", e.target.value)} /></label>
        <label className="space-y-1 text-sm">Problem URL<input className="field" value={form.problemUrl} onChange={(e) => set("problemUrl", e.target.value)} /></label>
        <label className="space-y-1 text-sm">Platform<select className="field" value={form.platform} onChange={(e) => set("platform", e.target.value)}>{PLATFORMS.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="space-y-1 text-sm">Difficulty<select className="field" value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)}>{DIFFICULTIES.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="space-y-1 text-sm">Pattern<select className="field" value={form.pattern} onChange={(e) => set("pattern", e.target.value)}>{PATTERNS.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="space-y-1 text-sm">Confidence<select className="field" value={form.confidenceLevel} onChange={(e) => set("confidenceLevel", e.target.value)}>{CONFIDENCE.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="space-y-1 text-sm">Topics<input className="field" placeholder="Array, Hash Map" value={form.topics} onChange={(e) => set("topics", e.target.value)} /></label>
        <label className="space-y-1 text-sm">Date solved<input type="date" className="field" value={form.dateSolved} onChange={(e) => set("dateSolved", e.target.value)} /></label>
        <label className="space-y-1 text-sm">Time complexity<input className="field" value={form.timeComplexity} onChange={(e) => set("timeComplexity", e.target.value)} /></label>
        <label className="space-y-1 text-sm">Space complexity<input className="field" value={form.spaceComplexity} onChange={(e) => set("spaceComplexity", e.target.value)} /></label>
      </div>
      <label className="space-y-1 text-sm">Solution approach<textarea className="field min-h-24" value={form.approach} onChange={(e) => set("approach", e.target.value)} /></label>
      <label className="space-y-1 text-sm">Personal notes<textarea className="field min-h-20" value={form.notes} onChange={(e) => set("notes", e.target.value)} /></label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">Mistakes made<textarea className="field min-h-20" value={form.mistakes} onChange={(e) => set("mistakes", e.target.value)} /></label>
        <label className="space-y-1 text-sm">Key pattern learned<textarea className="field min-h-20" value={form.keyPatternLearned} onChange={(e) => set("keyPatternLearned", e.target.value)} /></label>
      </div>
      <label className="space-y-1 text-sm">Code snippet<textarea className="field min-h-36 font-mono" value={form.codeSnippet} onChange={(e) => set("codeSnippet", e.target.value)} /></label>
      <button className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save Problem"}</button>
    </form>
  );
};

export default AddProblemForm;

