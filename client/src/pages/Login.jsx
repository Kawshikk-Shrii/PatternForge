import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Login = ({ theme, setTheme }) => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "demo@patternforge.dev", password: "password123" });
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/app");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={theme === "light" ? "light-shell min-h-screen" : "min-h-screen bg-ink text-slate-100"}>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="mx-auto flex max-w-md px-4 py-16">
        <form onSubmit={submit} className="app-card w-full space-y-4">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          {error && <p className="rounded-lg bg-rose-500/15 p-3 text-sm text-rose-200">{error}</p>}
          <label className="space-y-1 text-sm">Email<input className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label className="space-y-1 text-sm">Password<input type="password" className="field" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          <button className="btn btn-primary w-full" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
          <p className="text-sm text-slate-400">New here? <Link className="text-forge" to="/register">Create an account</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;

