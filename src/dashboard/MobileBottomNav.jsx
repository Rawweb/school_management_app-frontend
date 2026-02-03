import { NavLink } from 'react-router-dom';
import {
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineHome,
} from 'react-icons/hi';

import {
  HiBookOpen,
  HiCheckCircle,
  HiClipboardList,
  HiHome,
} from 'react-icons/hi';

import { MdOutlineQuiz } from 'react-icons/md';
import { MdQuiz } from 'react-icons/md';

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

const MobileBottomNav = () => {
  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border md:hidden transition-transform duration-300 ease-out `}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ label, path, icon: Icon, activeIcon: ActiveIcon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `group flex flex-col items-center gap-1 text-xs transition-colors ${
                isActive ? 'text-primary' : ' hover:text-primary'
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
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
