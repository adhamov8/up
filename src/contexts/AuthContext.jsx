import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// ─────── small helper ───────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

/** Добавляем токен в заголовок каждой заявки */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─────── универсальный парсер user-объекта ───────
const extractUser = (res) => res.data.user || res.data;

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // начальная загрузка

  // ─────── login ───────
  const login = useCallback(async ({ email, password }) => {
    try {
      const res = await api.post("auth/login", { email, password });
      localStorage.setItem("token", res.data.accessToken);

      const meRes = await api.get("user/me");
      const userData = extractUser(meRes);
      setUser(userData);

      navigate("/chat");
    } catch (err) {
      console.error("Login error:", err);
      alert("Ошибка входа: " + (err.response?.data?.message || err.message));
    }
  }, [navigate]);

  // ─────── register ───────
  const register = useCallback(async ({ email, password, firstName, lastName }) => {
    try {
      const res = await api.post("auth/register", {
        email,
        password,
        firstName,
        lastName,
      });
      localStorage.setItem("token", res.data.accessToken);

      const meRes = await api.get("user/me");
      const userData = extractUser(meRes);
      setUser(userData);

      navigate("/chat");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Ошибка регистрации: " + (err.response?.data?.message || err.message));
    }
  }, [navigate]);

  // ─────── logout ───────
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }, [navigate]);

  // ─────── profile update ───────
  const updateProfile = useCallback(async (updates) => {
    try {
      const res = await api.put("user/me", updates);
      const userData = extractUser(res);
      setUser(userData);
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Ошибка обновления профиля.");
    }
  }, []);

  // ─────── load user on mount ───────
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);

      try {
        const res = await api.get("user/me");
        const userData = extractUser(res);
        setUser(userData);
      } catch (err) {
        console.warn("Invalid or expired token:", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ─────── sync logout across tabs ───────
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "token" && !e.newValue) {
        setUser(null);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
