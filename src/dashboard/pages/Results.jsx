import { useEffect, useState } from 'react';
import ResultStats from '../components/results/ResultStats';
import ResultFilters from '../components/results/ResultFilters';
import ResultCard from '../components/results/ResultCard';
import ResultsSkeleton from '../skeletons/ResultsSkeleton';

const Results = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Dummy results data (until backend is ready)
  const [results] = useState([
    {
      id: 'res-1',
      courseCode: 'CSC 471',
      title: 'Artificial Intelligence',
      type: 'Exam',
      score: 78,
      total: 100,
      grade: 'C+',
      status: 'Pass',
      date: 'Jan 29, 2026',
    },
    {
      id: 'res-2',
      courseCode: 'CSC 472',
      title: 'Robotics',
      type: 'Quiz',
      score: 8,
      total: 10,
      grade: 'B',
      status: 'Pass',
      date: 'Feb 1, 2026',
    },
    {
      id: 'res-3',
      courseCode: 'CSC 473',
      title: 'Computer Graphics',
      type: 'Assignment',
      score: 42,
      total: 100,
      grade: 'F',
      status: 'Fail',
      date: 'Jan 24, 2026',
    },
    {
      id: 'res-4',
      courseCode: 'CSC 471',
      title: 'Artificial Intelligence',
      type: 'Quiz',
      score: 3,
      total: 10,
      grade: 'D',
      status: 'Fail',
      date: 'Jan 22, 2026',
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const filteredResults = results.filter(result => {
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

      {/* Stats */}
      <ResultStats results={results} />

      {/* Filters */}
      <ResultFilters filter={filter} setFilter={setFilter} />

      {/* Results list */}
      {filteredResults.length === 0 ? (
        <div className="rounded-2xl bg-surface border border-border p-6 text-sm text-text-muted">
          No results found for this filter.
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
