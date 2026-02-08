const filters = [
  { key: 'all', label: 'All' },
  { key: 'pass', label: 'Passed' },
  { key: 'fail', label: 'Failed' },
];

const ResultFilters = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2">
      {filters.map(f => (
        <button
          key={f.key}
          onClick={() => setFilter(f.key)}
          className={`px-4 py-2 rounded-lg text-sm border ${
            filter === f.key
              ? 'bg-primary text-white border-primary'
              : 'bg-surface border-border text-text-muted hover:text-text'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default ResultFilters;
