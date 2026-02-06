const TaskStats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const stats = [
    { label: "Total Tasks", value: total },
    { label: "Completed", value: completed },
    { label: "Pending", value: pending },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface border border-border rounded-xl p-5"
        >
          <p className="text-sm text-text-muted">
            {stat.label}
          </p>
          <h3 className="text-2xl font-semibold">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
