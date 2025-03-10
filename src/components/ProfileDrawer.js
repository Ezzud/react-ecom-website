import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ProfileDrawer.css';

const ProfileDrawer = ({ visible, toggleDrawer, isLoggedIn, handleLogout, handleLoginRedirect, handleSettingsRedirect, user }) => {
  const location = useLocation();
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        handleClose();
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
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsHiding(true);
    setTimeout(() => {
      setIsHiding(false);
      toggleDrawer();
    }, 300); // Match the duration of the slide-out animation
  }, [toggleDrawer]);

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

  if (!visible && !isHiding) {
    return null;
  }

  return (
    <div ref={drawerRef} className={`offcanvas profile-drawer ${isHiding ? 'hide' : ''}`}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Profile</h5>
      </div>
      <div className="offcanvas-body">
        <button className="btn btn-settings btn-block" onClick={handleSettingsRedirect}>Settings</button>
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