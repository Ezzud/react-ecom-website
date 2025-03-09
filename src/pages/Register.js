import React, { useState } from 'react';
import { authenticateUser, registerUser } from '../services/api'; // Assuming you have a registerUser function in your API service
import '../styles/Register.css'; // Assuming you have a CSS file for Register styles

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser({ firstName, lastName, email, password });
      if (response.id) {
        const sessionToken = await authenticateUser(email, password);
        if (sessionToken) {
          document.cookie = `sessionToken=${sessionToken}; path=/`;
          window.location.href = '/';
        } else {
          window.location.href = '/login';
        }
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.error === "EmailAlreadyExists") {
        setError('An account with this email already exists.');
      } else {
        setError('An error occurred during registration. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group password-group">
          <label htmlFor="password">Password:</label>
          <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="form-control" value={password} onChange={handlePasswordChange} required />
          <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
          </span>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: `${passwordStrength}%` }} aria-valuenow={passwordStrength} aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Register'}
        </button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Register;