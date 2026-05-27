import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { PLATFORMS } from "../utils/constants";

const Profile = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState({ platform: "LeetCode", username: "", profileUrl: "", totalSolved: 0, rating: "" });
  const load = () => api.get("/profiles").then((res) => setProfiles(res.data));
  useEffect(() => { load(); }, []);

  const add = async (event) => {
    event.preventDefault();
    await api.post("/profiles", form);
    setForm({ platform: "LeetCode", username: "", profileUrl: "", totalSolved: 0, rating: "" });
    load();
  };

  return (
    <div className="space-y-6">
      <div><p className="text-sm text-forge">Profile</p><h1 className="text-3xl font-bold">{user?.name}</h1><p className="text-slate-400">{user?.email} • {user?.collegeCompany || "No organization added"}</p></div>
      <form onSubmit={add} className="app-card grid gap-4 md:grid-cols-5">
        <select className="field" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>{PLATFORMS.map((item) => <option key={item}>{item}</option>)}</select>
        <input required className="field" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input className="field" placeholder="Profile URL" value={form.profileUrl} onChange={(e) => setForm({ ...form, profileUrl: e.target.value })} />
        <input type="number" className="field" placeholder="Solved" value={form.totalSolved} onChange={(e) => setForm({ ...form, totalSolved: Number(e.target.value) })} />
        <button className="btn btn-primary">Add Profile</button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{profiles.map((profile) => <ProfileCard key={profile._id} profile={profile} />)}</div>
    </div>
  );
};

export default Profile;

