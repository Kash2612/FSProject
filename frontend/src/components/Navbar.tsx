import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { toast } from 'react-toastify';

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>
      <Link to='/'>
        <img src={logo} alt='Logo' width={160} height={32} loading='lazy' />
      </Link>

      <nav>
        <ul className='flex gap-x-6 text-richblack-100'>
          <li>
            <Link to='/'>Home</Link>
          </li>
        </ul>
      </nav>

      {/* Login - Signup - Logout - Dashboard */}
      <div className='flex items-center gap-x-4 text-richblack-100'>
        {!isLoggedIn && (
          <>
            <Link to='/login'>
              <button className='bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>
                Login
              </button>
            </Link>
            <Link to='/signup'>
              <button className='bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>
                Sign Up
              </button>
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to='/logout'>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  toast.success('Logged Out');
                }}
                className='bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'
              >
                Log Out
              </button>
            </Link>
            <Link to='/dashboard'>
              <button className='bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>
                Dashboard
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
