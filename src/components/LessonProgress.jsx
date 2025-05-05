export default function LessonProgress({ completed, total }) {
    const boxes = Array.from({ length: total }, (_, i) => i < completed);
    return (
      <div>
        <div className="mb-1 flex justify-between text-sm">
          <span>Прогресс обучения</span>
          <span>
            {completed}/{total}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {boxes.map((done, idx) => (
            <div
              key={idx}
              className={`h-4 w-4 rounded-sm ${done ? "bg-green-500" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    );
  }