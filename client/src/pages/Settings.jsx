const Settings = () => (
  <div className="space-y-5">
    <div><p className="text-sm text-forge">Settings</p><h1 className="text-3xl font-bold">Workspace preferences</h1></div>
    <div className="app-card space-y-4">
      <h2 className="text-xl font-semibold">Extensibility notes</h2>
      <p className="text-slate-400">PatternForge is prepared for real coding-platform sync, richer notifications, and AI mentor integrations. API keys and sync jobs would belong here in a production deployment.</p>
      <label className="flex items-center gap-3 text-sm"><input type="checkbox" defaultChecked /> Prioritize low-confidence problems in revision planner</label>
      <label className="flex items-center gap-3 text-sm"><input type="checkbox" defaultChecked /> Include weak patterns in generated mock tests</label>
    </div>
  </div>
);

export default Settings;

