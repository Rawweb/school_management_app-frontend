import Skeleton from '../../components/ui/Skeleton';

const CourseCardSkeleton = () => {
  return (
    <div className="rounded-2xl bg-surface border border-border p-5 flex flex-col justify-between">
      {/* Content */}
      <div>
        {/* Course code */}
        <Skeleton className="h-3 w-20 mb-2" />

        {/* Title */}
        <Skeleton className="h-5 w-40 mb-3" />

        {/* Description */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Button */}
      <Skeleton className="h-9 w-full rounded-lg mt-4" />
    </div>
  );
};

export default CourseCardSkeleton;
