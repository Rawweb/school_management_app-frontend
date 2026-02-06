import Skeleton from "../../components/ui/Skeleton";


const TaskFiltersSkeleton = () => {
  return (
    <div className="flex gap-2">
      <Skeleton className="h-9 w-24 rounded-lg" />
      <Skeleton className="h-9 w-24 rounded-lg" />
    </div>
  );
};

export default TaskFiltersSkeleton;
