import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'; // Assuming you have the CSS in App.css
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import Login from './Login'; // Import the Login component
import Home from './Home'; // Import the Home component

const App = () => {
  const [profileDrawerVisible, setProfileDrawerVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const history = useNavigate();

  

  const toggleProfileDrawer = () => {
    setProfileDrawerVisible(!profileDrawerVisible);
  };



  const handleLoginRedirect = () => {
    history('/login');
  };

  return (
      <div className="App">
        <main>
          <div>
              <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#28a745' }}>
                <a className="navbar-brand" href="#">Logo</a>
                <div className="collapse navbar-collapse justify-content-end">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="#"><i className="bi bi-basket basket-icon"></i></a>
                     </li>
                    <li className="nav-item d-flex align-items-center">
                      <div className="profile-pic" onClick={toggleProfileDrawer}></div>
                    </li>
                  </ul>
                </div>
              </nav>
          </div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />}/>
            </Routes>
        </main>

        {/* Profile Drawer */}
        {profileDrawerVisible && (
          <div className="offcanvas show">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Profile</h5>
              <button type="button" className="close" onClick={toggleProfileDrawer} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="offcanvas-body">
              <button className="btn btn-primary btn-block">Settings</button>
              {isLoggedIn ? (
                <button className="btn btn-danger btn-block mt-2" onClick={() => setIsLoggedIn(false)}>Log Out</button>
              ) : (
                <button className="btn btn-success btn-block mt-2" onClick={() => handleLoginRedirect()}>Log In</button>
              )}
            </div>
          </div>
        )}
      </div>
  );
};

export default App;