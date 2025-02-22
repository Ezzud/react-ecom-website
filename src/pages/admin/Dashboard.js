import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css'; // Assuming you have the CSS in Dashboard.css

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleNavigation = (path) => {
    navigate(`/panel/${path}`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-menu">
        <button className="btn btn-primary" onClick={() => handleNavigation('users')}><i className="bi bi-people"></i> Users</button>
        <button className="btn btn-primary" onClick={() => handleNavigation('items')}><i className="bi bi-box"></i> Items</button>
        <button className="btn btn-primary" onClick={() => handleNavigation('orders')}><i className="bi bi-receipt"></i> Orders</button>
        <button className="btn btn-primary" onClick={() => handleNavigation('settings')}><i className="bi bi-gear"></i> Settings</button>
        <button className="btn btn-primary" onClick={() => handleNavigation('prescriptions')}><i className="bi bi-file-earmark-medical"></i> Prescriptions</button>
      </div>
      <div className="dashboard-content">
        {/* Content will be added here later */}
      </div>
    </div>
  );
};

export default Dashboard;