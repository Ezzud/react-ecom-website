import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/NavigationBar.css';
import logo from '../assets/img/logo512.png'; // Adjust the path to your logo file

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
      <a href="/" className="navbar-brand" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" className="logo" />
      </a>
      <div className="flex justify-end items-center space-x-4">
        <ul className="navbar-nav flex items-center space-x-4">
          <li className="nav-item">
            <button className="nav-link text-white" onClick={() => setDrawerVisibility('basket', true)}>
              <i className="bi bi-basket basket-icon"></i>
            </button>
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