import Skeleton from '../../components/ui/Skeleton';
import AddTaskSkeleton from './AddTasksSkeleton';
import StatCardSkeleton from './StatCardSkeleton';
import TaskCardSkeleton from './TaskCardSkeleton';
import TaskFiltersSkeleton from './TaskFiltersSkeleton';

const TasksSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Add task */}
      <AddTaskSkeleton />

      {/* Filters */}
      <TaskFiltersSkeleton />

      {/* Tasks grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default TasksSkeleton;
