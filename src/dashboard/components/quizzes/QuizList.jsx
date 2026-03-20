const getDurationParts = duration => {
  const [minutesPart, secondsPart = '00'] = Number(duration)
    .toFixed(2)
    .split('.');

  return {
    minutes: Number(minutesPart),
    seconds: Number(secondsPart),
  };
};

const QuizList = ({
  quizzes,
  completedQuizIds,
  activeQuiz,
  onStart,
  submitting,
  startingQuizId,
}) => {
  const formatDuration = duration => {
    const { minutes, seconds } = getDurationParts(duration);
    const minuteLabel = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;

    if (seconds === 0) return minuteLabel;

    return `${minuteLabel} ${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
  };

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
            const isStartingThisQuiz = startingQuizId === quiz._id;
            const isDisabled = completed || isLocked || submitting;

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
                      {formatDuration(quiz.duration)}
                    </span>
                  </div>
                </div>

                <button
                  className={`mt-4 py-2 rounded-lg text-sm transition-colors ${
                    isDisabled
                      ? 'bg-muted text-white/70 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-hover'
                  }`}
                  onClick={() => onStart(quiz)}
                  disabled={isDisabled}
                >
                  {completed
                    ? 'Completed'
                    : isStartingThisQuiz
                      ? 'Starting...'
                      : 'Start Quiz'}
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
