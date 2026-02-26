const QuizQuestion = ({
  question,
  index,
  total,
  selectedOption,
  onSelect,
  disabled = false,
}) => {
  if (!question) return null;

  return (
    <div className="rounded-2xl bg-bg border border-border p-5">
      <p className="text-sm text-text-muted mb-2">
        Question {index + 1} of {total}
      </p>
      <h3 className="font-medium mb-4">{question.questionText}</h3>

      <div className="space-y-3">
        {question.options.map((option, optIndex) => (
          <label
            key={optIndex}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
              selectedOption === optIndex
                ? 'border-primary bg-primary/10'
                : 'border-border bg-surface hover:bg-surface-hover'
            } ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
          >
            <input
              type="radio"
              name={`question-${question._id}`}
              checked={selectedOption === optIndex}
              disabled={disabled}
              onChange={() => onSelect(question._id, optIndex)}
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
