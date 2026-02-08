const QuizPagination = ({
  questions,
  answers,
  currentIndex,
  onChange,
}) => {
  if (!questions?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((q, index) => {
        const answered = answers[q._id] !== undefined;
        const isActive = index === currentIndex;

        return (
          <button
            key={q._id}
            className={`h-9 w-9 rounded-lg border text-sm transition ${
              isActive
                ? 'border-primary bg-primary text-white'
                : answered
                ? 'border-primary/40 bg-primary/10 text-primary'
                : 'border-border bg-surface hover:bg-surface-hover'
            }`}
            onClick={() => onChange(index)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default QuizPagination;
