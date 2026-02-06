import Skeleton from '../../components/ui/Skeleton';

const ChartSkeleton = () => {
  return (
    <div className="rounded-2xl bg-surface border border-border p-6 h-80 flex flex-col">
      <Skeleton className="h-4 w-40 mb-4" />

      <div className="flex-1 flex items-end gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="w-8 rounded-lg"
            style={{ height: `${40 + i * 20}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChartSkeleton;
