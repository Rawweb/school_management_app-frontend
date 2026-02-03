const ActivityItem = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start gap-3 py-3">
      {/* Icon */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>

      {/* Text */}
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-text-muted">{description}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
