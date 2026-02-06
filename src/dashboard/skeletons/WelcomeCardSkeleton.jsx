import Skeleton from '../../components/ui/Skeleton';

const WelcomeCardSkeleton = () => {
  return (
    <div className="rounded-3xl bg-surface border border-border p-6 md:p-8">
      <div className="flex items-center justify-between">
        {/* Text */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Illustration */}
        <Skeleton className="hidden md:block h-32 w-32 rounded-full" />
      </div>
    </div>
  );
};

export default WelcomeCardSkeleton;
