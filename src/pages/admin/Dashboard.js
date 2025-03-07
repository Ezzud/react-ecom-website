import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardMenu from '../../components/DashboardMenu';
import '../../styles/Dashboard.css'; // Assuming you have the CSS in Dashboard.css

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="dashboard-container">
      <DashboardMenu />
      <div className="dashboard-content">
        {/* Content will be added here later */}
      </div>
    </div>
  );
};

export default Dashboard;