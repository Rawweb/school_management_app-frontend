const QuizList = ({
  quizzes,
  completedQuizIds,
  activeQuiz,
  onStart,
  submitting,
}) => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Available Quizzes</h2>

      {quizzes.length === 0 ? (
        <div className="rounded-2xl bg-surface border border-border p-6 text-sm text-text-muted">
          No quizzes found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map(quiz => {
            const completed = completedQuizIds.has(quiz._id);
            const isLocked = !!activeQuiz && activeQuiz._id !== quiz._id;

            return (
              <div
                key={quiz._id}
                className="rounded-2xl bg-surface border border-border p-5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <p className="text-xs text-text-muted">{quiz.category}</p>
                  <h3 className="font-semibold">{quiz.title}</h3>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-bg border border-border">
                      {quiz.level}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-bg border border-border">
                      {quiz.duration} mins
                    </span>
                  </div>
                </div>

                <button
                  className="mt-4 bg-primary text-white py-2 rounded-lg text-sm hover:bg-primary-hover transition-colors disabled:opacity-60"
                  onClick={() => onStart(quiz)}
                  disabled={completed || isLocked || submitting}
                >
                  {completed ? 'Completed' : 'Start Quiz'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default QuizList;
