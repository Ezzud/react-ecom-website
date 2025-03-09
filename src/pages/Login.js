import React, { useEffect, useState } from 'react';
import { authenticateUser, isAuthenticated } from '../services/api';
import { cuteToast } from 'cute-alert';
import '../styles/Login.css'; // Assuming you have a CSS file for Login styles

const Login = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const sessionToken = getCookie('sessionToken');
      if (sessionToken) {
        const authenticated = await isAuthenticated();
        if (authenticated) {
          window.location.href = '/';
        } else {
          document.cookie = 'sessionToken=; Max-Age=0; path=/';
          console.error('Invalid or expired session token');
        }
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const sessionToken = await authenticateUser(email, password);
      if (sessionToken) {
        document.cookie = `sessionToken=${sessionToken}; path=/`;
        cuteToast({
          type: "success",
          title: "Success",
          description: "You have successfully logged in.",
          timer: 1000
        }).then(() => {
          window.location.href = '/';
        });
      } else {
        console.error('Incorrect credentials');
        cuteToast({
          type: "error",
          title: "Error",
          description: "Incorrect credentials. Please try again.",
          timer: 3000
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      cuteToast({
        type: "error",
        title: "Error",
        description: "An error occurred during login. Please try again later.",
        timer: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
        </button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

export default Login;