import Skeleton from '../../components/ui/Skeleton';

const CourseTabsSkeleton = () => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border bg-surface p-1">
          <Skeleton className="h-7 w-24 rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default CourseTabsSkeleton;
