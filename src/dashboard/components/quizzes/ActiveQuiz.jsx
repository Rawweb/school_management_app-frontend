import QuizQuestion from './QuizQuestion';
import QuizPagination from './QuizPagination';

const ActiveQuiz = ({
  quiz,
  questions,
  answers,
  currentQuestionIndex,
  onSelectAnswer,
  onSubmit,
  submitting,
  inputLocked,
  timeLeftLabel,
  onChangeQuestion,
}) => {
  const formatDuration = minutes => `${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
  if (!quiz) return null;

  return (
    <section className="rounded-2xl bg-surface border border-border p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-text-muted">Now taking</p>
          <h2 className="text-xl font-semibold">{quiz.title}</h2>
          <p className="text-sm text-text-muted">
            {quiz.level} • {quiz.category} • {formatDuration(quiz.duration)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-bg border border-border px-4 py-2 text-sm">
            Time left: <span className="font-semibold">{timeLeftLabel}</span>
          </div>
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-hover transition-colors disabled:opacity-60"
            onClick={onSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="space-y-5">
          <QuizQuestion
            question={questions[currentQuestionIndex]}
            index={currentQuestionIndex}
            total={questions.length}
            selectedOption={
              answers[questions[currentQuestionIndex]._id]
            }
            onSelect={onSelectAnswer}
            disabled={inputLocked}
          />

          <QuizPagination
            questions={questions}
            answers={answers}
            currentIndex={currentQuestionIndex}
            onChange={onChangeQuestion}
            disabled={inputLocked}
          />
        </div>
      )}
    </section>
  );
};

export default ActiveQuiz;
