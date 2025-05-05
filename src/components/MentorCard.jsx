import { Link } from "react-router-dom";

export default function MentorCard({ mentor }) {
  const { id, photo, name, education, age, gender, interests } = mentor;
  return (
    <Link to={`/mentor/${id}`} className="block transition hover:-translate-y-1 hover:shadow-lg">
      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <img
          src={photo}
          alt={name}
          className="h-40 w-full object-cover object-center"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{education}</p>
          <p className="mt-1 text-sm text-gray-500">
            {age} лет · {gender === "male" ? "Мужчина" : "Женщина"}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {interests.map((it) => (
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
    </Link>
  );
}