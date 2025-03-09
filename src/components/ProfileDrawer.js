import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ProfileDrawer.css';

const ProfileDrawer = ({ visible, toggleDrawer, isLoggedIn, handleLogout, handleLoginRedirect, handleSettingsRedirect, user }) => {
  const location = useLocation();
  const drawerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        toggleDrawer();
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, toggleDrawer]);

  useEffect(() => {
    if (drawerRef.current) {
      if (visible) {
        drawerRef.current.classList.remove('hide');
        drawerRef.current.classList.add('show');
      } else {
        drawerRef.current.classList.remove('show');
        drawerRef.current.classList.add('hide');
      }
    }
  }, [visible]);

  if (location.pathname === '/login') {
    return null;
  }

  const handleAdminPanelRedirect = () => {
    navigate('/admin');
  };

  return (
    <div ref={drawerRef} className="offcanvas profile-drawer">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Profile</h5>
        <button type="button" className="close" onClick={toggleDrawer} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="offcanvas-body">
        <button className="btn btn-primary btn-block" onClick={handleSettingsRedirect}>Settings</button>
        {user && user.isAdmin === "true" && (
          <button className="btn btn-secondary btn-block mt-2" onClick={handleAdminPanelRedirect}>Admin Panel</button>
        )}
        {isLoggedIn ? (
          <button className="btn btn-danger btn-block mt-2" onClick={handleLogout}>Log Out</button>
        ) : (
          <button className="btn btn-success btn-block mt-2" onClick={handleLoginRedirect}>Log In</button>
        )}
      </div>
    </div>
  );
};

export default ProfileDrawer;