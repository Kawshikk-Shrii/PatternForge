import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Register = ({ theme, setTheme }) => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", collegeCompany: "", preferredPlatforms: "LeetCode, Codeforces" });
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await register({ ...form, preferredPlatforms: form.preferredPlatforms.split(",").map((item) => item.trim()).filter(Boolean) });
      navigate("/app");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={theme === "light" ? "light-shell min-h-screen" : "min-h-screen bg-ink text-slate-100"}>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="mx-auto flex max-w-lg px-4 py-16">
        <form onSubmit={submit} className="app-card w-full space-y-4">
          <h1 className="text-3xl font-bold">Create your forge</h1>
          {error && <p className="rounded-lg bg-rose-500/15 p-3 text-sm text-rose-200">{error}</p>}
          <label className="space-y-1 text-sm">Name<input required className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label className="space-y-1 text-sm">Email<input required className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label className="space-y-1 text-sm">Password<input required type="password" minLength="6" className="field" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          <label className="space-y-1 text-sm">College / Company<input className="field" value={form.collegeCompany} onChange={(e) => setForm({ ...form, collegeCompany: e.target.value })} /></label>
          <label className="space-y-1 text-sm">Preferred platforms<input className="field" value={form.preferredPlatforms} onChange={(e) => setForm({ ...form, preferredPlatforms: e.target.value })} /></label>
          <button className="btn btn-primary w-full" disabled={loading}>{loading ? "Creating..." : "Register"}</button>
          <p className="text-sm text-slate-400">Already have an account? <Link className="text-forge" to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;

