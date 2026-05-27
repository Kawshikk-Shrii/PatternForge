import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("patternforge_user") || "null"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("patternforge_token");
    if (!token) return;
    api.get("/auth/me")
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem("patternforge_user", JSON.stringify(data));
      })
      .catch(() => logout());
  }, []);

  const persist = (data) => {
    localStorage.setItem("patternforge_token", data.token);
    localStorage.setItem("patternforge_user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", payload);
      persist(data);
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", payload);
      persist(data);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("patternforge_token");
    localStorage.removeItem("patternforge_user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, register, logout, isAuthenticated: Boolean(user) }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

