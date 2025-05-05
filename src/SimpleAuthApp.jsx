import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

/*************************
 *  Auth context (stub)   *
 *************************/
const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email, password) => {
    // ⚠️  STUB: Accept any email + password combination
    const fakeUser = { email, name: email.split("@")[0] };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  const register = (name, email, password) => {
    // ⚠️  STUB: Persist user locally only
    const fakeUser = { name, email };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/*****************
 *  UI helpers   *
 *****************/
const Field = ({ label, ...props }) => (
  <label className="block mb-4">
    <span className="text-sm text-gray-600 mb-1 block">{label}</span>
    <input
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      {...props}
    />
  </label>
);

const PrimaryButton = ({ children, ...props }) => (
  <button
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children }) => (
  <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg">{children}</div>
);

/*****************
 *    PAGES      *
 *****************/
function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user) navigate("/profile", { replace: true });
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form.email, form.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <Field
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Field
            label="Password"
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <PrimaryButton type="submit">Sign In</PrimaryButton>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account? {" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </Card>
    </div>
  );
}

function RegisterPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (user) navigate("/profile", { replace: true });
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form.name, form.email, form.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <Field
            label="Name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Field
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Field
            label="Password"
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <PrimaryButton type="submit">Sign Up</PrimaryButton>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account? {" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </Card>
    </div>
  );
}

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <h1 className="text-3xl font-bold text-center mb-6">
          Привет, {user.name}!
        </h1>
        <PrimaryButton
          onClick={() => {
            logout();
            navigate("/", { replace: true });
          }}
        >
          Logout
        </PrimaryButton>
      </Card>
    </div>
  );
}

/*****************
 *   ROUTING     *
 *****************/
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/*****************
 *     APP       *
 *****************/
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
