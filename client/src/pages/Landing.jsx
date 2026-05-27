import { ArrowRight, BrainCircuit, ClipboardCheck, LineChart, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const features = [
  ["Pattern-aware revision", "Turn solved problems into a living map of Sliding Window, DP, Graphs, Greedy, and more.", BrainCircuit],
  ["Weak area tracking", "Spot forgotten patterns using confidence, revision count, recency, and difficulty.", LineChart],
  ["Custom mock tests", "Generate tests from your own solved problem bank with filters and priority scoring.", ClipboardCheck],
  ["Revision planner", "Know what to revise today instead of scrolling through old submissions.", RefreshCcw]
];

const Landing = ({ theme, setTheme }) => (
  <div className={theme === "light" ? "light-shell min-h-screen" : "min-h-screen bg-ink text-slate-100"}>
    <Navbar theme={theme} setTheme={setTheme} />
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(167,139,250,0.18),transparent_25%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-forge/30 px-3 py-1 text-sm text-forge">DSA revision that remembers what you forgot</p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Master DSA Patterns Through Intelligent Revision</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300 light-shell:text-slate-600">Track your solved problems, revise forgotten patterns, generate custom mock tests, and build long-term problem-solving confidence.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register" className="btn btn-primary">Get Started <ArrowRight className="ml-2" size={16} /></Link>
            <Link to="/login" className="btn btn-secondary">View Demo</Link>
          </div>
        </div>
        <div className="app-card">
          <p className="text-sm text-slate-400">Today’s revision queue</p>
          {["Number of Islands", "Subarray Sum Equals K", "LRU Cache"].map((item, index) => (
            <div key={item} className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 light-shell:border-slate-200 light-shell:bg-slate-50">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{item}</p>
                <span className="text-sm text-forge">Priority {92 - index * 13}</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-gradient-to-r from-forge to-ember" style={{ width: `${82 - index * 12}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="grid gap-4 md:grid-cols-4">{features.map(([title, text, Icon]) => <div className="app-card" key={title}><Icon className="text-forge" /><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 text-sm text-slate-400">{text}</p></div>)}</div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="app-card"><h2 className="text-2xl font-bold">Problem statement</h2><p className="mt-3 text-slate-400">Solved problem lists grow fast, but recall fades faster. PatternForge creates structured revision around the thinking process.</p></div>
        <div className="app-card"><h2 className="text-2xl font-bold">How it works</h2><p className="mt-3 text-slate-400">Add solved problems, tag patterns, track confidence, revise on schedule, and generate focused tests.</p></div>
        <div className="app-card"><h2 className="text-2xl font-bold">Supported platforms</h2><p className="mt-3 text-slate-400">LeetCode, Codeforces, CodeChef, and HackerRank profiles can be tracked now, with real sync-ready architecture.</p></div>
      </div>
      <div className="mt-8 rounded-lg bg-gradient-to-r from-forge to-ember p-8 text-ink">
        <h2 className="text-3xl font-black">Build confidence that survives interview week.</h2>
        <p className="mt-2 max-w-2xl">Use PatternForge as your second brain for DSA patterns, mistakes, and revision momentum.</p>
        <Link to="/register" className="btn mt-5 bg-ink text-white">Start revising</Link>
      </div>
    </section>
  </div>
);

export default Landing;

