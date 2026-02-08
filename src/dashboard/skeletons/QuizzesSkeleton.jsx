import Skeleton from '../../components/ui/Skeleton';

const QuizzesSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Quiz list */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-40" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-surface border border-border p-5"
            >
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-5 w-40 mb-3" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-36" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-surface border border-border p-4 flex items-center justify-between"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizzesSkeleton;
