import Skeleton from '../../components/ui/Skeleton';
import CourseCardSkeleton from './CourseCardSkeleton';
import CourseTabsSkeleton from './CourseTabsSkeleton';

const CoursesSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-56" />
      </div>

      {/* Tabs */}
      <CourseTabsSkeleton />

      {/* Course cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default CoursesSkeleton;
