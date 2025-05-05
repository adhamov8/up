import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MentorCard from "../components/MentorCard";
import mentorsData from "../data/mentors";

export default function MentorsPage() {
  const allInterests = useMemo(
    () => Array.from(new Set(mentorsData.flatMap((m) => m.interests))).sort(),
    [],
  );

  const [filters, setFilters] = useState({
    interests: [],
    gender: "all", // male, female, all
    minAge: 0,
    maxAge: 100,
  });

  const toggleInterest = (interest) => {
    setFilters((f) => {
      const exists = f.interests.includes(interest);
      return {
        ...f,
        interests: exists
          ? f.interests.filter((i) => i !== interest)
          : [...f.interests, interest],
      };
    });
  };

  const filteredMentors = mentorsData.filter((m) => {
    // interests
    if (filters.interests.length && !m.interests.some((i) => filters.interests.includes(i)))
      return false;
    // gender
    if (filters.gender !== "all" && m.gender !== filters.gender) return false;
    // age
    if (m.age < filters.minAge || m.age > filters.maxAge) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Менторы</h1>

        {/* Filters */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Фильтры</h2>
          {/* Interests */}
          <div className="mb-4">
            <h3 className="mb-2 font-medium">Профессиональные интересы</h3>
            <div className="flex flex-wrap gap-3">
              {allInterests.map((interest) => {
                const checked = filters.interests.includes(interest);
                return (
                  <label key={interest} className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleInterest(interest)}
                      className="h-4 w-4"
                    />
                    {interest}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Gender */}
          <div className="mb-4">
            <h3 className="mb-2 font-medium">Пол</h3>
            {[
              { value: "all", label: "Любой" },
              { value: "male", label: "Мужчина" },
              { value: "female", label: "Женщина" },
            ].map((g) => (
              <label key={g.value} className="mr-4 inline-flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="gender"
                  value={g.value}
                  checked={filters.gender === g.value}
                  onChange={() => setFilters((f) => ({ ...f, gender: g.value }))}
                />
                {g.label}
              </label>
            ))}
          </div>

          {/* Age */}
          <div className="mb-4 flex items-center gap-4">
            <h3 className="font-medium">Возраст</h3>
            <input
              type="number"
              className="w-20 rounded border px-2 py-1"
              value={filters.minAge}
              onChange={(e) => setFilters({ ...filters, minAge: Number(e.target.value) })}
              min={0}
              max={filters.maxAge}
            />
            <span>—</span>
            <input
              type="number"
              className="w-20 rounded border px-2 py-1"
              value={filters.maxAge}
              onChange={(e) => setFilters({ ...filters, maxAge: Number(e.target.value) })}
              min={filters.minAge}
              max={100}
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
          {!filteredMentors.length && <p>Нет менторов, удовлетворяющих фильтрам.</p>}
        </div>

        <Link to="/chat" className="mt-8 inline-block text-blue-600 hover:underline">
          ← Назад в чат
        </Link>
      </div>
    </div>
  );
}
