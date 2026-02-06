import Skeleton from '../../components/ui/Skeleton';

const TaskCardSkeleton = () => {
  return (
    <div className="rounded-2xl bg-surface border border-border p-4 flex justify-between gap-4">
      {/* Left */}
      <div className="flex gap-3 flex-1">
        {/* Checkbox */}
        <Skeleton className="h-4 w-4 rounded-sm mt-1" />

        {/* Text */}
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>

      {/* Delete */}
      <Skeleton className="h-3 w-10" />
    </div>
  );
};

export default TaskCardSkeleton;
