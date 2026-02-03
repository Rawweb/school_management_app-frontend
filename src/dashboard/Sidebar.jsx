import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { LuPanelLeft, LuPanelRight } from 'react-icons/lu';
import {
  HiOutlineHome,
  HiHome,
  HiOutlineCheckCircle,
  HiCheckCircle,
  HiOutlineBookOpen,
  HiBookOpen,
  HiOutlineClipboardList,
  HiClipboardList,
  HiOutlineLogout,
  HiLogout,
} from 'react-icons/hi';

import { MdOutlineQuiz, MdQuiz } from 'react-icons/md';
import ConfirmModal from '../components/ui/confirmModal';

/* ---------------- NAV ITEMS ---------------- */
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
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <aside
      className={`hidden lg:flex min-h-screen border-r border-border bg-surface transition-all duration-300
      ${collapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="flex flex-col w-full p-4 ">
        {/* -------- Header -------- */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && <img src={logo} alt="Logo" className="size-7" />}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-bg"
          >
            {collapsed ? (
              <LuPanelRight className="size-5" />
            ) : (
              <LuPanelLeft className="size-5" />
            )}
          </button>
        </div>

        {/* -------- Navigation -------- */}
        <nav className="flex-1 space-y-1">
          {navItems.map(
            ({ label, path, icon: Icon, activeIcon: ActiveIcon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `group relative flex items-center ${
                    collapsed ? 'justify-center' : 'gap-3'
                  } px-3 py-3 rounded-xl transition-colors
                  ${isActive ? 'bg-muted text-primary' : 'hover:bg-muted'}`
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

                    {!collapsed && <span>{label}</span>}

                    {/* Tooltip */}
                    {collapsed && (
                      <span className="absolute left-10 z-50 bg-gray-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {label}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            )
          )}
        </nav>

        {/* -------- Logout -------- */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className={`group relative flex items-center ${
            collapsed ? 'justify-center' : 'gap-3'
          } px-3 py-3 rounded-xl text-red-500 hover:bg-muted`}
        >
          <HiOutlineLogout className="size-5 group-hover:hidden" />
          <HiLogout className="size-5 hidden group-hover:block" />

          {!collapsed && <span>Logout</span>}

          {collapsed && (
            <span className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
              Logout
            </span>
          )}
        </button>

        {/* -------- Modal -------- */}
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
