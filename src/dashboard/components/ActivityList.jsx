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

        (Array.isArray(tasksRes.data) ? tasksRes.data : []).forEach(task => {
          if (!task?.title) return;

          activityItems.push({
            icon: HiOutlineClipboardList,
            title: 'Added task',
            description: task.title,
            createdAt: task.createdAt,
          });

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

        (Array.isArray(quizRes.data) ? quizRes.data : []).forEach(result => {
          const quizTitle =
            typeof result?.quizId === 'object'
              ? result.quizId?.title
              : result?.quizTitle;

          if (!quizTitle) return;

          activityItems.push({
            icon: HiOutlineClipboardList,
            title: result.status === 'Pass' ? 'Passed quiz' : 'Submitted quiz',
            description: quizTitle,
            createdAt: result.createdAt,
          });
        });

        // fetch registered courses
        const coursesRes = await api.get('/courses/registered');

        (Array.isArray(coursesRes.data) ? coursesRes.data : []).forEach(course => {
          if (!course?.code || !course?.title) return;

          activityItems.push({
            icon: HiOutlineBookOpen,
            title: 'Registered course',
            description: `${course.code} - ${course.title}`,
            createdAt: course.createdAt,
          });
        });

        activityItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

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
