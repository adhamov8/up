import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import InputField from "../components/InputField";
import LessonProgress from "../components/LessonProgress";

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();

  const progress = user?.progress || { completed: 0, total: 0 };

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    photo: user?.photo || "",
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-2xl font-semibold">Профиль </h1>
        <div className="mb-6 flex justify-center">
          <img
            src={form.photo || "https://via.placeholder.com/100x100?text=Avatar"}
            alt="avatar"
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>
        <InputField
          label="URL фото"
          value={form.photo}
          onChange={(e) => setForm({ ...form, photo: e.target.value })}
        />
        <InputField
          label="Имя"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <InputField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Progress section */}
        <div className="mb-6">
          <LessonProgress completed={progress.completed} total={progress.total} />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Сохранить
        </button>
        {saved && (
          <p className="mt-2 text-center text-sm text-green-600">Сохранено!</p>
        )}

        {/* Logout button */}
        <button
          type="button"
          onClick={logout}
          className="mt-4 w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
        >
          Выйти из аккаунта
        </button>

        <Link to="/chat" className="mt-6 block text-center text-blue-600 hover:underline">
          ← Назад в чат
        </Link>
      </form>
    </div>
  );
}