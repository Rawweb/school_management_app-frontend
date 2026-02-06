import { useEffect, useState } from 'react';
import ActionCard from '../components/ActionCard';
import ActivityList from '../components/ActivityList';
import PerformanceChart from '../components/PerformanceChart';
import StatCard from '../components/StatCard';
import WelcomeCard from '../components/WelcomeCard';
import { HiOutlineBookOpen, HiOutlineCheckCircle, HiOutlineClipboardList } from 'react-icons/hi';
import { MdOutlineQuiz } from 'react-icons/md';
import DashboardSkeleton from '../skeletons/DashboardSkeleton';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
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
          value="20 / 25"
          label="Tasks completed"
        />

        <StatCard
          icon={HiOutlineClipboardList}
          value="5"
          label="Pending tasks"
        />

        <StatCard
          icon={MdOutlineQuiz}
          value="3 / 5"
          label="Quizzes completed"
        />

        <StatCard
          icon={HiOutlineCheckCircle}
          value="2"
          label="Passed quizzes"
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
      />

      {/* Upcoming Quizzes */}
      <ActionCard
        title="Upcoming Quizzes"
        description="Check quizzes that are available or scheduled for you."
        buttonText="View quizzes"
        icon={<HiOutlineClipboardList className="h-20 w-20" />}
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
