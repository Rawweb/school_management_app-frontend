import Skeleton from '../../components/ui/Skeleton';

const AddTaskSkeleton = () => {
  return (
    <div className="rounded-2xl bg-surface border border-border p-4 flex gap-3">
      {/* Input */}
      <Skeleton className="h-10 flex-1 rounded-lg" />

      {/* Button */}
      <Skeleton className="h-10 w-20 rounded-lg" />
    </div>
  );
};

export default AddTaskSkeleton;
