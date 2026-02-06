import Skeleton from '../../components/ui/Skeleton';

const ActivitySkeleton = () => {
  return (
    <div className="rounded-2xl bg-surface border border-border p-6">
      <Skeleton className="h-4 w-32 mb-4" />

      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 mb-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitySkeleton;
