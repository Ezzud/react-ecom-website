import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountSettings = ({ isLoggedIn, user }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [isLoggedIn, navigate, user]);

  const handleReset = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', { firstName, lastName, email });
  };

  return (
    <div className="container mt-4">
      <h2>Account Settings</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="btn btn-secondary mr-2" onClick={handleReset}>Reset</button>
      <button className="btn btn-primary" onClick={handleSave}>Save</button>
    </div>
  );
};

export default AccountSettings;