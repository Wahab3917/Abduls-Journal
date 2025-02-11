import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logoutUser().then(() => {
      dispatch(logout());
    });
  }

  return <button className='inline-bock px-6 py-2 duration-200 hover:text-white' onClick={handleLogout}>
    Logout</button>;
}

export default LogoutBtn