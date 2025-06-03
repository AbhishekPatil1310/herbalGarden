import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // adjust path as needed

const LogoutButton = () => {
  const { LogOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    LogOut();               // clear auth state
    navigate('/');          // go to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
