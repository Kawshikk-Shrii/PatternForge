import { LogOut, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ theme, setTheme }) => {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/80 backdrop-blur light-shell:border-slate-200 light-shell:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="rounded-lg bg-gradient-to-r from-forge to-ember px-2 py-1 text-ink">PF</span>
          PatternForge
        </Link>
        <div className="flex items-center gap-3">
          <button className="btn btn-secondary px-3" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {user ? (
            <>
              <Link to="/app/profile" className="hidden text-sm text-slate-300 md:block light-shell:text-slate-700">{user.name}</Link>
              <button className="btn btn-secondary px-3" onClick={logout} aria-label="Logout"><LogOut size={16} /></button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

