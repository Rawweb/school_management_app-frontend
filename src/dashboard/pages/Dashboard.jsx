import { useEffect, useState } from 'react';
import ActionCard from '../components/ActionCard';
import ActivityList from '../components/ActivityList';
import PerformanceChart from '../components/PerformanceChart';
import StatCard from '../components/StatCard';
import WelcomeCard from '../components/WelcomeCard';
import {
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
} from 'react-icons/hi';
import { MdOutlineQuiz } from 'react-icons/md';
import DashboardSkeleton from '../skeletons/DashboardSkeleton';
import api from '../../api/axios';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalQuizzes: 0,
    passedQuizzes: 0,
  });

  useEffect(() => {
    const fetchDasboardStats = async () => {
      try {
        setLoading(true);

        // fetch tasks
        const tasksRes = await api.get('/tasks');

        const totalTasks = tasksRes.data.length;
        const completedTasks = tasksRes.data.filter(
          task => task.completed
        ).length;

        const pendingTasks = totalTasks - completedTasks;

        // fecth quiz results
        const quizRes = await api.get('/quizzes/results/me');

        const totalQuizzes = quizRes.data.length;
        const passedQuizzes = quizRes.data.filter(
          q => q.status === 'Pass'
        ).length;

        // save stats
        setStats({
          totalTasks,
          completedTasks,
          pendingTasks,
          totalQuizzes,
          passedQuizzes,
        });
      } catch (error) {
        console.error('Dashboard stats error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDasboardStats();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/*  Welcome */}
      <section>
        <WelcomeCard />
      </section>

      {/* Stat cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={HiOutlineCheckCircle}
          value={`${stats.completedTasks} / ${stats.totalTasks}`}
          label="Tasks completed"
          to="/tasks"
        />

        <StatCard
          icon={HiOutlineClipboardList}
          value={stats.pendingTasks}
          label="Pending tasks"
          to="/tasks"
        />

        <StatCard
          icon={MdOutlineQuiz}
          value={`${stats.totalQuizzes}`}
          label="Quizzes completed"
          to="/quizzes"
        />

        <StatCard
          icon={HiOutlineCheckCircle}
          value={stats.passedQuizzes}
          label="Passed quizzes"
          to="/results"
        />
      </section>

      {/* Action card */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enrolled Courses */}
        <ActionCard
          title="Enrolled Courses"
          description="View and manage all the courses you are currently enrolled in."
          buttonText="View courses"
          icon={<HiOutlineBookOpen className="h-20 w-20" />}
          to="/courses"
        />

        {/* Upcoming Quizzes */}
        <ActionCard
          title="Upcoming Quizzes"
          description="Check quizzes that are available or scheduled for you."
          buttonText="View quizzes"
          icon={<HiOutlineClipboardList className="h-20 w-20" />}
          to="/quizzes"
        />
      </section>

      {/* SECTION 3: Main content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>

        {/* Activity */}
        <ActivityList />
      </section>
    </div>
  );
};

export default Dashboard;
