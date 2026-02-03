import ActivityItem from './ActivityItem';
import {
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineBookOpen,
} from 'react-icons/hi';

const ActivityList = () => {
  // DUMMY DATA (replace with backend later)
  const activities = [
    {
      icon: HiOutlineCheckCircle,
      title: 'Completed task',
      description: 'React Assignment',
    },
    {
      icon: HiOutlineClipboardList,
      title: 'Submitted quiz',
      description: 'CSC 401 – Mid Test',
    },
    {
      icon: HiOutlineBookOpen,
      title: 'Registered course',
      description: 'CSC 471',
    },
    {
      icon: HiOutlineCheckCircle,
      title: 'Passed quiz',
      description: 'Operating Systems',
    },
  ];

  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Recent Activity</h3>

      <div className="divide-y divide-border">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            icon={activity.icon}
            title={activity.title}
            description={activity.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
