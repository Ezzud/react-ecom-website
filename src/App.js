import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './styles/App.css'; // Assuming you have the CSS in App.css
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import Login from './pages/Login'; // Import the Login component
import Home from './pages/Home'; // Import the Home component
import AccountSettings from './pages/AccountSettings'; // Import the AccountSettings component
import ProfileDrawer from './components/ProfileDrawer'; // Import the ProfileDrawer component
import BasketPreviewDrawer from './components/BasketPreviewDrawer'; // Import the BasketPreviewDrawer component
import Basket from './pages/Basket'; // Import the Basket component
import Dashboard from './pages/admin/Dashboard'; // Import the Dashboard component
import { verifySessionToken, logout } from './services/api';
import Register from './pages/Register';

const App = () => {
  const [profileDrawerVisible, setProfileDrawerVisible] = useState(false);
  const [basketDrawerVisible, setBasketDrawerVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [user, setUser] = useState(null); // State to store user information

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifySessionToken();
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      }
    };

    fetchUser();
  }, []);

  const toggleProfileDrawer = () => {
    setProfileDrawerVisible(!profileDrawerVisible);
  };

  const toggleBasketDrawer = (visible) => {
    setBasketDrawerVisible(visible !== undefined ? visible : !basketDrawerVisible);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleSettingsRedirect = () => {
    navigate('/account');
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className="App">
      <main>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#28a745' }}>
            <a className="navbar-brand" href="#" onClick={handleLogoClick}>Logo</a>
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => toggleBasketDrawer()}><i className="bi bi-basket basket-icon"></i></a>
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
          <Route path="/" element={<Home user={user} isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
          <Route path="/account" element={<AccountSettings isLoggedIn={isLoggedIn} user={user} />} />
          <Route path="/basket" element={<Basket user={user} />} /> {/* Add Basket route */}
          <Route path="/admin" element={<Dashboard user={user} />} /> {/* Add Dashboard route */}
          <Route path="/register" element={<Register />} /> {/* Add Register route */}
        </Routes>
      </main>

      <ProfileDrawer
        visible={profileDrawerVisible}
        toggleDrawer={toggleProfileDrawer}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        handleLoginRedirect={handleLoginRedirect}
        handleSettingsRedirect={handleSettingsRedirect}
        user={user} // Pass the user prop
      />

      <BasketPreviewDrawer
        visible={basketDrawerVisible}
        toggleDrawer={toggleBasketDrawer}
        isLoggedIn={isLoggedIn}
        user={user}
      />
    </div>
  );
};

export default App;