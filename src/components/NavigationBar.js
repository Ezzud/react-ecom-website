import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/NavigationBar.css';

const NavigationBar = ({ setDrawerVisibility }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <nav className="navbar bg-green-600 p-4">
      <a className="navbar-brand text-white text-xl font-bold" href="#" onClick={handleLogoClick}>Logo</a>
      <div className="flex justify-end items-center space-x-4">
        <ul className="navbar-nav flex items-center space-x-4">
          <li className="nav-item">
            <a className="nav-link text-white" href="#" onClick={() => setDrawerVisibility('basket', true)}>
              <i className="bi bi-basket basket-icon"></i>
            </a>
          </li>
          <li className="nav-item">
            <div className="profile-pic" onClick={() => setDrawerVisibility('profile', true)}></div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;