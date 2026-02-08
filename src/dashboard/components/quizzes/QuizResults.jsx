const QuizResults = ({ results }) => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Your Results</h2>

      {results.length === 0 ? (
        <div className="rounded-2xl bg-surface border border-border p-6 text-sm text-text-muted">
          No quiz results yet.
        </div>
      ) : (
        <div className="space-y-3">
          {results.map(result => (
            <div
              key={result._id}
              className="rounded-2xl bg-surface border border-border p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium">
                  {result.quizId?.title || 'Quiz'}
                </p>
                <p className="text-sm text-text-muted">
                  Score: {result.score}/{result.totalQuestions}
                </p>
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
          ))}
        </div>
      )}
    </section>
  );
};

export default QuizResults;
