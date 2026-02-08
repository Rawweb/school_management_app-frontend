import { useEffect, useState } from 'react';
import ActivityItem from './ActivityItem';
import {
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineBookOpen,
} from 'react-icons/hi';
import api from '../../api/axios';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const activityItems = [];

        // fetch tasks
        const tasksRes = await api.get('/tasks');

        tasksRes.data.forEach(task => {
          // Task added
          activityItems.push({
            icon: HiOutlineClipboardList,
            title: 'Added task',
            description: task.title,
            createdAt: task.createdAt,
          });

          // Task completed
          if (task.completed) {
            activityItems.push({
              icon: HiOutlineCheckCircle,
              title: 'Completed task',
              description: task.title,
              createdAt: task.updatedAt,
            });
          }
        });

        // fetch quiz results
        const quizRes = await api.get('/quizzes/results/me');

        quizRes.data.forEach(result => {
          activityItems.push({
            icon: HiOutlineClipboardList,
            title: result.status === 'Pass' ? 'Passed quiz' : 'Submitted quiz',
            description: result.quizId.title,
            createdAt: result.createdAt,
          });
        });

        // fetch registered courses
        const coursesRes = await api.get('/courses/registered');

        coursesRes.data.forEach(course => {
          activityItems.push({
            icon: HiOutlineBookOpen,
            title: 'Registered course',
            description: `${course.code} – ${course.title}`,
            createdAt: course.createdAt,
          });
        });

        // sort by most recent
        activityItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // limit to recent 5
        setActivities(activityItems.slice(0, 5));
      } catch (error) {
        console.error('Activity feed error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Recent Activity</h3>

      {activities.length === 0 && !loading ? (
        <div className="text-sm text-text-muted">No recent activity.</div>
      ) : (
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
      )}
    </div>
  );
};

export default ActivityList;
