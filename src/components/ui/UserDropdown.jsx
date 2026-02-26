import { useState } from 'react';
import { HiLogout, HiOutlineLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './confirmModal';
import { toast } from 'sonner';

const UserDropdown = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const storedStudent = localStorage.getItem('student');
  const student = storedStudent ? JSON.parse(storedStudent) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');

    toast.success('Logged out successfully');

    // redirect to login
    navigate('/login');
  };

  return (
    <div className='absolute right-0 mt-3 w-56 rounded-md bg-surface border border-border shadow-lg overflow-hidden z-50'>
      {/* MOBILE ONLY: user info */}
      <div className='md:hidden px-4 py-3'>
        <p className='text-sm font-semibold'>Rawfile</p>
        <p className='text-xs text-text-muted'>
          chibuikemckc@gmail.com
        </p>
      </div>

      <div className=' text-white flex items-center text-sm font-semibold px-6 py-2'>
      {student.email}
      </div>

      {/* Divider (mobile only) */}
      <div className='md:hidden h-px bg-border' />

      {/* Logout (ALL screens) */}
      <button
        type='button'
        onClick={() => setShowLogoutModal(true)}
        className='w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-surface-hover transition-colors group'
      >
        <HiOutlineLogout className='size-5 group-hover:hidden' />
        <HiLogout className='size-5 hidden group-hover:block' />
        <span>Logout</span>
      </button>

      <ConfirmModal
        open={showLogoutModal}
        title='Log out'
        message='Are you sure you want to log out of your account?'
        confirmText='Log out'
        danger
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default UserDropdown;
