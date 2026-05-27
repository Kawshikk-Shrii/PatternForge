const LoadingSpinner = ({ label = "Loading" }) => (
  <div className="flex items-center gap-3 text-sm text-slate-400">
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-forge border-t-transparent" />
    {label}
  </div>
);

export default LoadingSpinner;

