const ActionCard = ({ title, description, buttonText = 'View', icon }) => {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-primary/10 border border-primary/20 p-5">
      
      {/* Left */}
      <div className="space-y-2">
        <h3 className="font-semibold text-primary">
          {title}
        </h3>

        <p className="text-sm text-text-muted max-w-xs">
          {description}
        </p>

        <button className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-hover transition">
          {buttonText}
        </button>
      </div>

      {/* Right icon / illustration */}
      <div className="hidden sm:block text-primary/40">
        {icon}
      </div>
    </div>
  );
};

export default ActionCard;
