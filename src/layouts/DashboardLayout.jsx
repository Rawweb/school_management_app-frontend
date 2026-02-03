import { Outlet } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar';
import MobileBottomNav from '../dashboard/MobileBottomNav';
import DashboardHeader from '../dashboard/DashboardHeader';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-bg text-text flex">
      {/* sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* dashboard header */}
        <DashboardHeader />

        {/* main */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:p-6 pb-24 md:pb-6 overflow-x-hidden">
          <Outlet />
        </main>

        {/* mobile bottom nav */}
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default DashboardLayout;
