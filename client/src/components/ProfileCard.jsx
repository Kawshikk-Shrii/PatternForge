const ProfileCard = ({ profile }) => (
  <div className="app-card">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-400">{profile.platform}</p>
        <h3 className="text-xl font-semibold">{profile.username}</h3>
      </div>
      <span className="rounded-full bg-forge/15 px-3 py-1 text-sm text-forge">{profile.totalSolved || 0} solved</span>
    </div>
    <p className="mt-4 text-sm text-slate-400">Rating/Rank: {profile.rating || "Not synced"}</p>
    <p className="mt-1 text-xs text-slate-500">Last synced: {profile.lastSynced ? new Date(profile.lastSynced).toLocaleDateString() : "Never"}</p>
  </div>
);

export default ProfileCard;

