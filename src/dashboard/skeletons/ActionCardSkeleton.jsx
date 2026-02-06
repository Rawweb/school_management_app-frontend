import Skeleton from '../../components/ui/Skeleton';

const ActionCardSkeleton = () => {
  return (
    <div className="rounded-2xl bg-surface border border-border p-5">
      <Skeleton className="h-5 w-40 mb-2" />
      <Skeleton className="h-4 w-64 mb-4" />
      <Skeleton className="h-9 w-32 rounded-full" />
    </div>
  );
};

export default ActionCardSkeleton;
