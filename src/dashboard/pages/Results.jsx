import { useEffect, useState } from 'react';
import ResultStats from '../components/results/ResultStats';
import ResultFilters from '../components/results/ResultFilters';
import ResultCard from '../components/results/ResultCard';
import ResultsSkeleton from '../skeletons/ResultsSkeleton';
import api from '../../api/axios';

const Results = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/quizzes/results/me');
        if (!ignore) {
          setResults(res.data || []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || err.message || 'Server error');
        }
        console.error('Results fetch error', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchResults();

    return () => {
      ignore = true;
    };
  }, []);

  const gradeForPercent = percent => {
    if (percent >= 90) return 'A';
    if (percent >= 80) return 'B';
    if (percent >= 70) return 'C';
    if (percent >= 60) return 'D';
    return 'F';
  };

  const formatDate = value =>
    value
      ? new Date(value).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '--';

  const normalizedResults = results.map(result => {
    const total = result.totalQuestions ?? result.total ?? 0;
    const score = result.score ?? 0;
    const percent = total === 0 ? 0 : Math.round((score / total) * 100);

    return {
      id: result._id,
      courseCode: 'Quiz',
      title: result.quizId?.title || 'Quiz',
      type: 'Quiz',
      score,
      total,
      grade: gradeForPercent(percent),
      status: result.status,
      date: formatDate(result.createdAt),
    };
  });

  const filteredResults = normalizedResults.filter(result => {
    if (filter === 'pass') return result.status === 'Pass';
    if (filter === 'fail') return result.status === 'Fail';
    return true;
  });

  if (loading) {
    return <ResultsSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Results</h1>
        <p className="text-text-muted">
          Track your scores across quizzes, exams, and assignments.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl bg-surface border border-border p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Stats */}
      <ResultStats results={normalizedResults} />

      {/* Filters */}
      <ResultFilters filter={filter} setFilter={setFilter} />

      {/* Results list */}
      {filteredResults.length === 0 ? (
        <div className="rounded-2xl bg-surface border border-border p-6 text-sm text-text-muted">
          {results.length === 0
            ? 'No results yet.'
            : 'No results found for this filter.'}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredResults.map(result => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
