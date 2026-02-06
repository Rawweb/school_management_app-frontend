import Skeleton from '../../components/ui/Skeleton';

const StatCardSkeleton = () => {
  return (
    <div className="rounded-2xl bg-surface border border-border p-4">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <Skeleton className="h-12 w-12 rounded-full" />

        {/* Text */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Footer */}
      <Skeleton className="mt-4 h-3 w-20" />
    </div>
  );
};

export default StatCardSkeleton;
