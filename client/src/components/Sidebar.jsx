import { BarChart3, Bot, ClipboardList, Home, ListChecks, Settings, Target, TestTube2, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  ["/app", "Dashboard", Home],
  ["/app/problems", "Problems", ListChecks],
  ["/app/analytics", "Analytics", BarChart3],
  ["/app/revision", "Revision", Target],
  ["/app/tests", "Mock Tests", ClipboardList],
  ["/app/ai-mentor", "AI Mentor", Bot],
  ["/app/profile", "Profile", UserRound],
  ["/app/settings", "Settings", Settings]
];

const navClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
    isActive ? "bg-forge/15 text-forge" : "text-slate-400 hover:bg-white/[0.06] hover:text-white light-shell:hover:text-slate-900"
  }`;

const Sidebar = () => (
  <>
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-white/10 p-4 lg:block light-shell:border-slate-200">
      <nav className="space-y-1">{links.map(([to, label, Icon]) => <NavLink key={to} to={to} end={to === "/app"} className={navClass}><Icon size={18} />{label}</NavLink>)}</nav>
    </aside>
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-white/10 bg-ink/95 p-2 lg:hidden light-shell:border-slate-200 light-shell:bg-white">
      {links.slice(0, 5).map(([to, label, Icon]) => (
        <NavLink key={to} to={to} end={to === "/app"} className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-xs text-slate-400 aria-[current=page]:bg-forge/15 aria-[current=page]:text-forge">
          <Icon size={18} />
          <span className="truncate">{label.split(" ")[0]}</span>
        </NavLink>
      ))}
    </nav>
  </>
);

export default Sidebar;

