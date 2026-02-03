import { Outlet } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar';
import MobileBottomNav from '../dashboard/MobileBottomNav';
import DashboardHeader from '../dashboard/DashboardHeader';
import { useEffect, useState } from 'react';

const DashboardLayout = () => {
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 50) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-bg text-text flex">
      {/* sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* dashboard header */}
        <DashboardHeader />

        {/* main */}
        <main className="flex-1 overflow-y-auto px-3 py-4 md:p-6 pb-24 md:pb-6 overflow-x-hidden">
          <Outlet />
        </main>

        {/* mobile bottom nav */}
        <MobileBottomNav hidden={hideNav} />
      </div>
    </div>
  );
};

export default DashboardLayout;
