const ResultStats = ({ results }) => {
  const totalResults = results.length;
  const passed = results.filter(r => r.status === 'Pass').length;
  const failed = totalResults - passed;

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const totalPossible = results.reduce((sum, r) => sum + r.total, 0);
  const averagePercent =
    totalPossible === 0 ? 0 : Math.round((totalScore / totalPossible) * 100);

  const stats = [
    { label: 'Total Results', value: totalResults },
    { label: 'Passed', value: passed },
    { label: 'Failed', value: failed },
    { label: 'Average Score', value: `${averagePercent}%` },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="rounded-2xl bg-surface border border-border p-5"
        >
          <p className="text-sm text-text-muted">{stat.label}</p>
          <h3 className="text-2xl font-semibold">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default ResultStats;
