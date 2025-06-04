import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // adjust path as needed
import '../../Style/LogOutButton.css'; //✅ make sure this CSS file includes the styles you posted

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <button className="Btn" onClick={handleLogout}>
      <div className="sign">
        {/* Red Logout Icon */}
        <svg viewBox="0 0 512 512">
          <path d="M497 273L353 409c-15 15-41 4-41-17v-80H192c-13 0-24-11-24-24v-64c0-13 11-24 24-24h120v-80c0-21 26-32 41-17l144 136c9 9 9 25 0 34zM320 432v16c0 13-11 24-24 24H88c-13 0-24-11-24-24V64c0-13 11-24 24-24h208c13 0 24 11 24 24v16c0 8.8-7.2 16-16 16H104v320h200c8.8 0 16 7.2 16 16z" />
        </svg>
      </div>
      <div className="text">Logout</div>
    </button>
  );
};

export default LogoutButton;
