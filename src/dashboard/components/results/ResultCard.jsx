const ResultCard = ({ result }) => {
  const percent = Math.round((result.score / result.total) * 100);

  return (
    <div className="rounded-2xl bg-surface border border-border p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-text-muted mb-1">
            {result.courseCode} • {result.type}
          </p>
          <h3 className="font-semibold">{result.title}</h3>
          <p className="text-sm text-text-muted">Date: {result.date}</p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full border ${
            result.status === 'Pass'
              ? 'text-green-600 border-green-600/30 bg-green-600/10'
              : 'text-red-500 border-red-500/30 bg-red-500/10'
          }`}
        >
          {result.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <p className="text-text-muted">
          Score: {result.score}/{result.total} ({percent}%)
        </p>
        <p className="font-medium">Grade: {result.grade}</p>
      </div>
    </div>
  );
};

export default ResultCard;
