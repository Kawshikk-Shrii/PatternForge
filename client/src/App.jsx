import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./routes/ProtectedRoute";
import AIMentor from "./pages/AIMentor";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MockTests from "./pages/MockTests";
import ProblemEditor from "./pages/ProblemEditor";
import Problems from "./pages/Problems";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import RevisionPlanner from "./pages/RevisionPlanner";
import Settings from "./pages/Settings";
import TestAttempt from "./pages/TestAttempt";
import TestResults from "./pages/TestResults";

const AppLayout = ({ theme, setTheme }) => (
  <div className={theme === "light" ? "light-shell min-h-screen" : "min-h-screen bg-ink text-slate-100"}>
    <Navbar theme={theme} setTheme={setTheme} />
    <div className="mx-auto flex max-w-7xl">
      <Sidebar />
      <main className="min-w-0 flex-1 px-4 py-6 pb-24 lg:px-6 lg:pb-8">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="problems" element={<Problems />} />
          <Route path="problems/new" element={<ProblemEditor />} />
          <Route path="problems/:id" element={<ProblemEditor />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="revision" element={<RevisionPlanner />} />
          <Route path="tests" element={<MockTests />} />
          <Route path="tests/:id/attempt" element={<TestAttempt />} />
          <Route path="tests/:id/results" element={<TestResults />} />
          <Route path="ai-mentor" element={<AIMentor />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  </div>
);

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("patternforge_theme") || "dark");
  useEffect(() => localStorage.setItem("patternforge_theme", theme), [theme]);

  return (
    <Routes>
      <Route path="/" element={<Landing theme={theme} setTheme={setTheme} />} />
      <Route path="/login" element={<Login theme={theme} setTheme={setTheme} />} />
      <Route path="/register" element={<Register theme={theme} setTheme={setTheme} />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/app/*" element={<AppLayout theme={theme} setTheme={setTheme} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

