import WelcomeCardSkeleton from './WelcomeCardSkeleton';
import StatCardSkeleton from './StatCardSkeleton';
import ActionCardSkeleton from './ActionCardSkeleton';
import ChartSkeleton from './ChartSkeleton';
import ActivitySkeleton from './ActivitySkeleton';

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <section>
        <WelcomeCardSkeleton />
      </section>

      {/* Stat cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </section>

      {/* Action cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <ActionCardSkeleton key={i} />
        ))}
      </section>

      {/* Main content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>

        <ActivitySkeleton />
      </section>
    </div>
  );
};

export default DashboardSkeleton;
