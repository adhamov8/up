// src/pages/PlansPage.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LessonProgress from "../components/LessonProgress";

export default function PlansPage() {
  const { user } = useAuth();

  // Заглушка: один план, использует user.progress
  const plan = {
    title: "React с нуля до профи",
    description: "20 уроков, включая JSX, хуки, оптимизацию производительности.",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">Планы обучения</h1>

        <div className="mb-6 rounded-lg border p-4">
          <h2 className="text-xl font-semibold">{plan.title}</h2>
          <p className="mb-4 text-gray-600">{plan.description}</p>
          {user?.progress && (
            <LessonProgress
              completed={user.progress.completed}
              total={user.progress.total}
            />
          )}
        </div>

        <Link to="/chat" className="text-blue-600 hover:underline">
          ← Назад в чат
        </Link>
      </div>
    </div>
  );
}
