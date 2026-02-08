import { useEffect, useMemo, useRef, useState } from 'react';
import QuizzesSkeleton from '../skeletons/QuizzesSkeleton';
import ActiveQuiz from '../components/quizzes/ActiveQuiz';
import QuizList from '../components/quizzes/QuizList';
import QuizResults from '../components/quizzes/QuizResults';
import api from '../../api/axios';

const Quizzes = () => {
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [timeLeft, setTimeLeft] = useState(null);
  const deadlineRef = useRef(null);
  const timerRef = useRef(null);

  const completedQuizIds = useMemo(
    () => new Set(results.map(r => r.quizId?._id || r.quizId)),
    [results]
  );

  useEffect(() => {
    let ignore = false;

    const init = async () => {
      setLoading(true);
      setError('');
      try {
        const [quizRes, resultsRes] = await Promise.all([
          api.get('/quizzes'),
          api.get('/quizzes/results/me'),
        ]);

        if (ignore) return;

        const sorted = [...(quizRes.data || [])].sort(
          (a, b) => a.levelOrder - b.levelOrder
        );
        setQuizzes(sorted);
        setResults(resultsRes.data || []);
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message || err.message || 'Something went wrong'
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    init();
    return () => {
      ignore = true;
    };
  }, []);

  // Warn user before leaving while a quiz is active
  useEffect(() => {
    if (!activeQuiz) return;

    const handleBeforeUnload = e => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [activeQuiz]);

  const startTimer = durationMinutes => {
    const deadline = Date.now() + durationMinutes * 60 * 1000;
    deadlineRef.current = deadline;

    const tick = () => {
      const remaining = Math.max(0, deadline - Date.now());
      setTimeLeft(remaining);
      if (remaining === 0) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        handleSubmit(true);
      }
    };

    tick();
    timerRef.current = setInterval(tick, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    deadlineRef.current = null;
    setTimeLeft(null);
  };

  const handleStartQuiz = async quiz => {
    setError('');
    setSubmitting(true);

    try {
      const res = await api.post(`/quizzes/${quiz._id}/start`);
      const questionsFromApi = res.data || [];

      setActiveQuiz(quiz);
      setQuestions(questionsFromApi);
      setAnswers({});
      setCurrentQuestionIndex(0);
      startTimer(quiz.duration);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Unable to start quiz'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectAnswer = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = async (autoSubmit = false) => {
    if (!activeQuiz || submitting) return;

    setSubmitting(true);

    try {
      const answersPayload = Object.entries(answers)
        .filter(([, selectedOption]) => selectedOption !== undefined)
        .map(([questionId, selectedOption]) => ({
          questionId,
          selectedOption,
        }));

      const res = await api.post(`/quizzes/${activeQuiz._id}/submit`, {
        answers: answersPayload,
      });

      const resultsRes = await api.get('/quizzes/results/me');
      setResults(resultsRes.data || []);

      // Reset active state
      setActiveQuiz(null);
      setQuestions([]);
      setAnswers({});
      setCurrentQuestionIndex(0);
      stopTimer();
      setError(
        autoSubmit || res.data?.expired
          ? 'Time is up! Your quiz was auto-submitted.'
          : ''
      );
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Unable to submit quiz'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = ms => {
    if (ms == null) return '--:--';
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  if (loading) return <QuizzesSkeleton />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Quizzes</h1>
        <p className="text-text-muted">
          Start a quiz, track your results, and improve your performance.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl bg-surface border border-border p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Active Quiz */}
      {activeQuiz && (
        <ActiveQuiz
          quiz={activeQuiz}
          questions={questions}
          answers={answers}
          currentQuestionIndex={currentQuestionIndex}
          onSelectAnswer={handleSelectAnswer}
          onSubmit={() => handleSubmit(false)}
          submitting={submitting}
          timeLeftLabel={formatTime(timeLeft)}
          onChangeQuestion={setCurrentQuestionIndex}
        />
      )}

      {/* Quiz List */}
      {!activeQuiz && (
        <QuizList
          quizzes={quizzes}
          completedQuizIds={completedQuizIds}
          activeQuiz={activeQuiz}
          onStart={handleStartQuiz}
          submitting={submitting}
        />
      )}

      {/* Results */}
      {!activeQuiz && <QuizResults results={results} />}
    </div>
  );
};

export default Quizzes;
