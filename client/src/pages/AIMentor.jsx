import { Bot, CalendarClock, Lightbulb, Radar, Sparkles } from "lucide-react";

const cards = [
  ["Identify weak areas", "Use solved problem history and confidence levels to explain pattern weaknesses.", Radar],
  ["Suggest revision schedule", "Create weekly revision blocks from upcoming priorities and mock-test outcomes.", CalendarClock],
  ["Generate hints", "Offer progressive hints without spoiling the full solution.", Lightbulb],
  ["Analyze consistency", "Turn streaks, gaps, and revision habits into practical feedback.", Sparkles]
];

const AIMentor = () => (
  <div className="space-y-6">
    <div className="app-card bg-gradient-to-r from-forge/15 to-ember/15">
      <Bot className="text-forge" size={34} />
      <h1 className="mt-4 text-3xl font-bold">AI Mentor</h1>
      <p className="mt-3 max-w-3xl text-slate-300">This page is future-ready for AI-powered suggestions. The backend already captures the notes, mistakes, weak patterns, revision history, and mock-test signals an AI mentor would need.</p>
    </div>
    <div className="grid gap-4 md:grid-cols-2">{cards.map(([title, text, Icon]) => <div className="app-card" key={title}><Icon className="text-forge" /><h2 className="mt-3 text-xl font-semibold">{title}</h2><p className="mt-2 text-sm text-slate-400">{text}</p></div>)}</div>
  </div>
);

export default AIMentor;

