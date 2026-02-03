import { HiArrowRight } from 'react-icons/hi';

const StatCard = ({ icon: Icon, value, label, helper = 'View details' }) => {
  return (
    <div className="group rounded-2xl bg-surface border border-border p-4 hover:shadow-sm transition">
      {/* Top row */}
      <div className="flex items-center gap-3 space-y-2">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
          <Icon className="size-8" />
        </div>

        {/* Text */}
        <div>
          <h3 className="text-lg font-semibold leading-none mb-1">{value}</h3>
          <p className="text-sm text-text-muted">{label}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-1 text-xs text-text-muted group-hover:text-primary cursor-pointer">
        <span>{helper}</span>
        <span className="transition-transform group-hover:translate-x-1">
          <HiArrowRight className='size-4' />
        </span>
      </div>
    </div>
  );
};

export default StatCard;
