import { useLocation } from 'react-router-dom';
import { dashboardTitles } from '../components/utils/dashBoardTitles';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import UserDropdown from '../components/ui/UserDropdown';
import ThemeToggle from '../components/ui/ThemeToggle';

const DashboardHeader = () => {
  const { pathname } = useLocation();
  const title = dashboardTitles[pathname] || 'Dashboard';

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null)

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);


  return (
    <header className="h-18 border-b border-border bg-surface px-6 flex items-center justify-between">
      {/* LEFT: Title */}
      <div className="flex items-center  gap-4">
        <h1 className="text-lg font-semibold">{title}</h1>

        {/* search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 border border-border rounded-xl bg-bg w-[320px]">
          <HiOutlineSearch className="text-text-muted" />
          <input
            type="text"
            placeholder="Search here..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">
        <div ref={dropdownRef} className="relative">
          {/* User trigger */}
          <div
            onClick={() => setOpen(prev => !prev)}
            className="bg-bg border border-border px-3 py-2 md:py-1 rounded-2xl flex items-center gap-2 cursor-pointer"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="size-8 rounded-full"
            />

            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-sm font-medium">Darrel Stew</span>
              <span className="text-xs text-text-muted">@stew_darrel</span>
            </div>

            <MdKeyboardArrowDown
              className={`size-5 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* Dropdown (sibling, not child) */}
          {open && <UserDropdown />}
        </div>

        {/* theme toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default DashboardHeader;
