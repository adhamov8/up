export default function ProgressBar({ completed, total }) {
    const percent = total ? Math.round((completed / total) * 100) : 0;
    return (
      <div className="w-full">
        <div className="mb-1 flex justify-between text-sm">
          <span>Прогресс обучения</span>
          <span>
            {completed}/{total}
          </span>
        </div>
        <div className="h-3 w-full rounded bg-gray-200">
          <div
            className="h-full rounded bg-green-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  }
  