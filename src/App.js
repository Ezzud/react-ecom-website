import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import PrescriptionManager from './pages/admin/PrescriptionManager';
import OrderConfirmation from './pages/OrderConfirmation';
import Basket from './pages/Basket';
import Dashboard from './pages/admin/Dashboard';
import { verifySessionToken, logout } from './services/api';
import Register from './pages/Register';
import Footer from './components/Footer'; 
import NavigationBar from './components/NavigationBar';

const App = () => {
  const [profileDrawerVisible, setProfileDrawerVisible] = useState(false);
  const [basketDrawerVisible, setBasketDrawerVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

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

  return (
    <div className="App">
      <main>
        <NavigationBar setDrawerVisibility={setDrawerVisibility} /> {/* Use the NavigationBar component */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home user={user} isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
          <Route path="/account" element={<AccountSettings isLoggedIn={isLoggedIn} user={user} />} />
          <Route path="/basket" element={<Basket user={user} />} />
          <Route path="/admin" element={<Dashboard user={user} />} />
          <Route path="/admin/users" element={<UserManager user={user} />} />
          <Route path="/admin/items" element={<ItemManager user={user} />} />
          <Route path="/admin/orders" element={<OrderManager user={user} />} />
          <Route path="/admin/prescriptions" element={<PrescriptionManager user={user} />} />
          <Route path="/order-confirmation" element={<OrderConfirmation user={user} />} />
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
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default App;