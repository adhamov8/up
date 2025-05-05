import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
    } catch (err) {
      alert("Ошибка входа: " + (err?.response?.data?.message || err.message));

    }
  };

  return (
    <div className="relative min-h-screen isolate overflow-hidden bg-gray-900">
      {/* Фон */}
      <img
        alt=""
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
  
      {/* Контейнер: две колонки */}
      <div className="relative z-10 flex min-h-screen">
        
        {/* Левая колонка с текстом */}
        <div className="w-1/2 flex items-center justify-center px-12">
          <h2 className="text-7xl font-bold text-violet-100 leading-snug text-center">
             <span className="text-violet-800">Upskill</span><br />
             <span className="mb-5 text-3xl text-left">Сервис для персонализации обучения</span>
          </h2>
        </div>
  
        {/* Правая колонка с формой */}
        <div className="w-1/2 flex items-center justify-center px-12">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-12">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-violet-50">
              Авторизация
            </h2>
  
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-violet-100">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-violet-100">
                    Пароль
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-indigo-300 hover:text-white"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
  
              <button
                type="submit"
                className="w-full rounded-md bg-violet-800 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Войти
              </button>
            </form>
  
            <p className="mt-10 text-center text-sm text-violet-200">
              Еще нет аккаунта?{" "}
              <Link to="/register" className="font-semibold text-indigo-300 hover:text-white">
                Зарегистрируйтесь
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
}
