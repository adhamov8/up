import { Link } from "react-router-dom";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-4 text-2xl font-semibold">Настройки</h1>
        <p className="text-gray-600">Раздел в разработке 🤖</p>
        <Link to="/chat" className="mt-6 inline-block text-blue-600 hover:underline">
          ← Назад в чат
        </Link>
      </div>
    </div>
  );
}