import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './styles/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './pages/Login';
import Home from './pages/Home';
import AccountSettings from './pages/AccountSettings';
import ProfileDrawer from './components/ProfileDrawer';
import BasketPreviewDrawer from './components/BasketPreviewDrawer';
import UserManager from './pages/admin/UserManager';
import ItemManager from './pages/admin/ItemManager';
import OrderManager from './pages/admin/OrderManager';
import Basket from './pages/Basket';
import Dashboard from './pages/admin/Dashboard';
import { verifySessionToken, logout } from './services/api';
import Register from './pages/Register';

const App = () => {
  const [profileDrawerVisible, setProfileDrawerVisible] = useState(false);
  const [basketDrawerVisible, setBasketDrawerVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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

  const setDrawerVisibility = (drawerType, visible) => {
    if (drawerType === 'profile') {
      setProfileDrawerVisible(visible);
    } else if (drawerType === 'basket') {
      setBasketDrawerVisible(visible);
    }
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
          <nav className="navbar bg-green-600 p-4">
            <a className="navbar-brand text-white text-xl font-bold" href="#" onClick={handleLogoClick}>Logo</a>
            <div className="flex justify-end items-center space-x-4">
              <ul className="navbar-nav flex items-center space-x-4">
                <li className="nav-item">
                  <a className="nav-link text-white" href="#" onClick={() => setDrawerVisibility('basket', true)}><i className="bi bi-basket basket-icon"></i></a>
                </li>
                <li className="nav-item">
                  <div className="profile-pic" onClick={() => setDrawerVisibility('profile', true)}></div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home user={user} isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
          <Route path="/account" element={<AccountSettings isLoggedIn={isLoggedIn} user={user} />} />
          <Route path="/basket" element={<Basket user={user} />} />
          <Route path="/admin" element={<Dashboard user={user} />} />
          <Route path="/admin/users" element={<UserManager user={user} />} />
          <Route path="/admin/items" element={<ItemManager user={user} />} />
          <Route path="/admin/orders" element={<OrderManager user={user} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <ProfileDrawer
        visible={profileDrawerVisible}
        toggleDrawer={() => setDrawerVisibility('profile', false)}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        handleLoginRedirect={handleLoginRedirect}
        handleSettingsRedirect={handleSettingsRedirect}
        user={user}
      />

      <BasketPreviewDrawer
        visible={basketDrawerVisible}
        toggleDrawer={() => setDrawerVisibility('basket', false)}
        isLoggedIn={isLoggedIn}
        user={user}
      />
    </div>
  );
};

export default App;