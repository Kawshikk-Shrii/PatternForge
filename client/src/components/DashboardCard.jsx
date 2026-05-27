const DashboardCard = ({ title, value, hint, icon: Icon }) => (
  <div className="app-card">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        {hint && <p className="mt-2 text-sm text-slate-400">{hint}</p>}
      </div>
      {Icon && (
        <div className="rounded-lg bg-forge/15 p-3 text-forge">
          <Icon size={22} />
        </div>
      )}
    </div>
  </div>
);

export default DashboardCard;

