import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineHome,
  HiOutlineLogout,
} from 'react-icons/hi';

import {
  HiBookOpen,
  HiCheckCircle,
  HiClipboardList,
  HiHome,
  HiLogout,
} from 'react-icons/hi';

import { MdOutlineQuiz } from 'react-icons/md';
import { MdQuiz } from 'react-icons/md';
import { useState } from 'react';
import ConfirmModal from '../components/ui/confirmModal';

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: HiOutlineHome,
    activeIcon: HiHome,
  },
  {
    label: 'Tasks',
    path: '/tasks',
    icon: HiOutlineCheckCircle,
    activeIcon: HiCheckCircle,
  },
  {
    label: 'Course',
    path: '/courses',
    icon: HiOutlineBookOpen,
    activeIcon: HiBookOpen,
  },
  {
    label: 'Quiz',
    path: '/quizzes',
    icon: MdOutlineQuiz,
    activeIcon: MdQuiz,
  },
  {
    label: 'Result',
    path: '/results',
    icon: HiOutlineClipboardList,
    activeIcon: HiClipboardList,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="hidden md:flex w-64 border-r border-border bg-surface">
      <div className="flex flex-col w-full p-6">
        {/* Logo */}
        <div className="flex items-center justify-center mx-auto gap-2 cursor-pointer mb-10 border w-fit p-4 border-border rounded-2xl">
          <img src={logo} alt="School Logo" className="size-14" />
        </div>

        {/* Navigation */}
        <nav className="space-y-1 flex-1">
          {navItems.map(
            ({ label, path, icon: Icon, activeIcon: ActiveIcon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 text-sm rounded-xl border transition-colors ${
                    isActive
                      ? 'bg-surface border-border text-primary'
                      : 'border-transparent hover:bg-surface hover:border-border hover:text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`size-5 ${
                        isActive ? 'hidden' : 'group-hover:hidden'
                      }`}
                    />
                    <ActiveIcon
                      className={`size-5 ${
                        isActive ? 'block' : 'hidden group-hover:block'
                      }`}
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            )
          )}
        </nav>

        {/* Logout */}
        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="group flex items-center gap-3 px-4 py-3 mt-6 text-sm rounded-xl border border-transparent hover:border-border hover:bg-surface transition-colors text-red-500"
        >
          <HiOutlineLogout className="size-5 group-hover:hidden" />
          <HiLogout className="size-5 hidden group-hover:block" />
          <span>Logout</span>
        </button>

        {/* modal */}
        <ConfirmModal
          open={showLogoutModal}
          title="Log out"
          message="Are you sure you want to log out of your account?"
          confirmText="Log out"
          danger
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
