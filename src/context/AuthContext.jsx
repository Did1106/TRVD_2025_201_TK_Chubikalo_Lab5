import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    loading: true
  });

  useEffect(() => {
    const raw = localStorage.getItem("auth");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setAuth({ user: parsed.user || null, token: parsed.token || null, loading: false });
        return;
      } catch {}
    }
    setAuth((prev) => ({ ...prev, loading: false }));
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    const data = res.data;
    setAuth({ user: data.user, token: data.token, loading: false });
    localStorage.setItem("auth", JSON.stringify({ user: data.user, token: data.token }));
  };

  const register = async (name, email, password) => {
    const res = await api.post("/api/auth/register", { name, email, password });
    const data = res.data;
    setAuth({ user: data.user, token: data.token, loading: false });
    localStorage.setItem("auth", JSON.stringify({ user: data.user, token: data.token }));
  };

  const logout = () => {
    setAuth({ user: null, token: null, loading: false });
    localStorage.removeItem("auth");
  };

  const value = {
    user: auth.user,
    token: auth.token,
    loading: auth.loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
