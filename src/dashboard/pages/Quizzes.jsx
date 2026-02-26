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
  const [statusMessage, setStatusMessage] = useState('');

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [startingQuizId, setStartingQuizId] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [attemptStartedAt, setAttemptStartedAt] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [timeLeft, setTimeLeft] = useState(null);
  const deadlineRef = useRef(null);
  const timerRef = useRef(null);

  const completedQuizIds = useMemo(
    () => new Set(results.map(r => r.quizId?._id || r.quizId)),
    [results]
  );

  const getAnswersStorageKey = (quizId, startedAt) =>
    `quiz_answers:${quizId}:${startedAt}`;

  const clearSavedAnswers = quizId => {
    if (typeof window === 'undefined') return;
    const prefix = `quiz_answers:${quizId}:`;
    Object.keys(window.localStorage).forEach(key => {
      if (key.startsWith(prefix)) {
        window.localStorage.removeItem(key);
      }
    });
  };

  const restoreActiveQuiz = async (activeAttempt, allQuizzes) => {
    if (!activeAttempt?.quiz?._id) return;

    const quizFromList = allQuizzes.find(q => q._id === activeAttempt.quiz._id);
    const quiz = quizFromList || activeAttempt.quiz;

    try {
      const res = await api.post(`/quizzes/${quiz._id}/start`);
      const payload = res.data || {};
      const questionsFromApi = Array.isArray(payload)
        ? payload
        : payload.questions || [];
      const startedAt = Array.isArray(payload)
        ? activeAttempt.startedAt
        : payload.startedAt || activeAttempt.startedAt;
      const storageKey = getAnswersStorageKey(quiz._id, startedAt);
      const savedAnswersRaw =
        typeof window !== 'undefined'
          ? window.localStorage.getItem(storageKey)
          : null;
      let savedAnswers = {};
      if (savedAnswersRaw) {
        try {
          savedAnswers = JSON.parse(savedAnswersRaw);
        } catch {
          savedAnswers = {};
        }
      }

      setActiveQuiz(quiz);
      setQuestions(questionsFromApi);
      setAnswers(savedAnswers);
      setAttemptStartedAt(startedAt);
      setCurrentQuestionIndex(0);
      setIsTimeUp(false);
      startTimer(quiz.duration, startedAt);
      setStatusMessage('Resumed your in-progress quiz.');
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Unable to resume quiz'
      );
    }
  };

  useEffect(() => {
    let ignore = false;

    const init = async () => {
      setLoading(true);
      setError('');
      setStatusMessage('');
      try {
        const [quizRes, resultsRes, activeAttemptRes] = await Promise.all([
          api.get('/quizzes'),
          api.get('/quizzes/results/me'),
          api.get('/quizzes/attempts/active'),
        ]);

        if (ignore) return;

        const sorted = [...(quizRes.data || [])].sort(
          (a, b) => a.levelOrder - b.levelOrder
        );
        setQuizzes(sorted);
        setResults(resultsRes.data || []);
        await restoreActiveQuiz(activeAttemptRes.data, sorted);
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

  const startTimer = (durationMinutes, startedAt = null) => {
    const startTime = startedAt ? new Date(startedAt).getTime() : Date.now();
    const deadline = startTime + durationMinutes * 60 * 1000;
    deadlineRef.current = deadline;

    const tick = () => {
      const remaining = Math.max(0, deadline - Date.now());
      setTimeLeft(remaining);
      if (remaining === 0) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsTimeUp(true);
        setStatusMessage('Time is up, click the submit button to submit...');
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
    setStatusMessage('');
    setSubmitting(true);
    setStartingQuizId(quiz._id);
    setIsTimeUp(false);

    try {
      const res = await api.post(`/quizzes/${quiz._id}/start`);
      const payload = res.data || {};
      const questionsFromApi = Array.isArray(payload)
        ? payload
        : payload.questions || [];
      const startedAt = Array.isArray(payload) ? null : payload.startedAt;
      const resolvedStartedAt = startedAt || new Date().toISOString();
      clearSavedAnswers(quiz._id);

      setActiveQuiz(quiz);
      setQuestions(questionsFromApi);
      setAnswers({});
      setAttemptStartedAt(resolvedStartedAt);
      setCurrentQuestionIndex(0);
      startTimer(quiz.duration, resolvedStartedAt);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Unable to start quiz'
      );
    } finally {
      setSubmitting(false);
      setStartingQuizId(null);
    }
  };

  const handleSelectAnswer = (questionId, optionIndex) => {
    if (submitting || isTimeUp) return;

    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  useEffect(() => {
    if (!activeQuiz || !attemptStartedAt) return;
    if (typeof window === 'undefined') return;

    const storageKey = getAnswersStorageKey(activeQuiz._id, attemptStartedAt);
    window.localStorage.setItem(storageKey, JSON.stringify(answers));
  }, [answers, activeQuiz, attemptStartedAt]);

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
      clearSavedAnswers(activeQuiz._id);
      setAttemptStartedAt(null);
      setCurrentQuestionIndex(0);
      stopTimer();
      setIsTimeUp(false);
      setStatusMessage(
        autoSubmit || res.data?.expired ? 'Quiz submitted.' : ''
      );
      setError('');
    } catch (err) {
      if (autoSubmit) {
        setStatusMessage(
          'Auto-submit failed. Click Submit Quiz to finish.'
        );
      }
      setError(
        err.response?.data?.message || err.message || 'Unable to submit quiz'
      );
      setIsTimeUp(autoSubmit);
    } finally {
      setSubmitting(false);
      setStartingQuizId(null);
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

      {statusMessage && (
        <div className="rounded-2xl bg-surface border border-border p-4 text-sm text-amber-400">
          {statusMessage}
        </div>
      )}

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
          inputLocked={submitting || isTimeUp}
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
          startingQuizId={startingQuizId}
        />
      )}

      {/* Results */}
      {!activeQuiz && <QuizResults results={results} />}
    </div>
  );
};

export default Quizzes;
