import { Link, useParams } from "react-router-dom";
import mentors from "../data/mentors";

export default function MentorDetailPage() {
  const { id } = useParams();
  const mentor = mentors.find((m) => m.id === Number(id));

  if (!mentor) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <p className="mb-4 text-xl">Ментор не найден.</p>
        <Link to="/mentors" className="text-blue-600 hover:underline">
          ← Назад к списку менторов
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row">
          <img
            src={mentor.photo}
            alt={mentor.name}
            className="h-40 w-40 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{mentor.name}</h1>
            <p className="text-gray-600">{mentor.education}</p>
            <p className="text-gray-500">
              {mentor.age} лет · {mentor.gender === "male" ? "Мужчина" : "Женщина"}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {mentor.interests.map((it) => (
                <span
                  key={it}
                  className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-600"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        </div>

        <h2 className="mb-2 text-xl font-semibold">О менторе</h2>
        <p className="mb-6 text-gray-700">{mentor.bio}</p>

        <h2 className="mb-2 text-xl font-semibold">Контакты</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Email: {mentor.contacts.email}</li>
          <li>Telegram: {mentor.contacts.telegram}</li>
          {/* Добавьте иные контакты */}
        </ul>

        <Link
          to="/mentors"
          className="mt-8 inline-block text-blue-600 hover:underline"
        >
          ← Назад к списку менторов
        </Link>
      </div>
    </div>
  );
}