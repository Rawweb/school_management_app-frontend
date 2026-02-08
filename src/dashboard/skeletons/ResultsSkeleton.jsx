import Skeleton from '../../components/ui/Skeleton';

const ResultsSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-28 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-surface border border-border p-5"
          >
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-6 w-14" />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 rounded-lg" />
        ))}
      </div>

      {/* Results list */}
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-surface border border-border p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsSkeleton;
