import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; // Assuming you have the CSS in Dashboard.css

const DashboardMenu = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/admin/${path}`);
  };

  return (
    <div className="dashboard-menu">
      <button className="btn btn-primary" onClick={() => handleNavigation('users')}><i className="bi bi-people"></i> Users</button>
      <button className="btn btn-primary" onClick={() => handleNavigation('items')}><i className="bi bi-box"></i> Items</button>
      <button className="btn btn-primary" onClick={() => handleNavigation('orders')}><i className="bi bi-receipt"></i> Orders</button>
      <button className="btn btn-primary" onClick={() => handleNavigation('prescriptions')}><i className="bi bi-file-earmark-medical"></i> Prescriptions</button>
    </div>
  );
};

export default DashboardMenu;